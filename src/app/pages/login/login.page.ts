import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccessProviders } from "../../providers/access-providers";
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
import { Storage } from "@ionic/storage";

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	email_address: string = '';
	password: string = '';

	constructor(
		private router: Router,
		private accessProv: AccessProviders,
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController,
		private alertCtrl: AlertController,
		private navCtrl: NavController,
		private storage: Storage
	) { }

	ngOnInit() {
	}

	openRegisterPage() {
		this.router.navigate(['/registration']);
	}

	async trySignIn() {
		if (this.email_address == '') {
			this.presentToast('email address is required');
		} else if (this.password == '') {
			this.presentToast('password is required');
		} else {

			const loading = await this.loadingCtrl.create({
				message: 'Please wait...'
			});
			loading.present();

			return new Promise(resolve => {
				let data = {
					menu: 'sign_in',
					email_address: this.email_address,
					password: this.password
				}

				this.accessProv.postData(data, 'server_site.php').subscribe((res: any) => {
					//console.log(res);
					if (res.error == false) {
						loading.dismiss();
						this.presentToast(res.msg);
						// this.router.navigate(['/home']);

						this.storage.set('SESSION', res.data_user);
						//console.log(this.storage.get('SESSION'));
						this.navCtrl.navigateRoot(['home']);
					} else {
						loading.dismiss();
						this.presentToast(res.msg);
					}
				}, (err) => {
					//console.log(err);
					loading.dismiss();
					this.presentAlert('Timeout');
				});
			});
		}
	}

	async presentToast(txt) {
		let toast = await this.toastCtrl.create({
			message: txt,
			duration: 1500,
			position: 'top'
		});

		toast.present();
	}

	async presentAlert(txt) {
		let alert = await this.alertCtrl.create();
		alert.header = txt;
		alert.buttons = [
			{
				text: 'Close',
				handler: () => {
					console.log('Cancel clicked');
				}
			},
			{
				text: 'Try Again',
				handler: () => {
					//console.log('Buy clicked');
					this.trySignIn();
				}
			}
		]
		alert.backdropDismiss = false;

		alert.present();
	}

}
