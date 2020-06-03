import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, AlertController } from "@ionic/angular";
import { Router } from '@angular/router';

import { AccessProviders } from "../../providers/access-providers";

@Component({
	selector: 'app-registration',
	templateUrl: './registration.page.html',
	styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

	name: string = '';
	birth_date: string = '2000-02-20T15:03:46.789';
	gender: string = '';
	email_address: string = '';
	username: string = '';
	password: string = '';
	confirm_password: string = '';

	disabledButton: boolean;

	constructor(
		private rouer: Router,
		private toastCtrl: ToastController,
		private loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		private accessProv: AccessProviders
	) { }

	ngOnInit() {
	}

	ionViewDidEnter() {
		this.disabledButton = false;
	}

	async trySignUp() {
		if (this.name == '') {
			this.presentToast('name is required');
		} else if (this.birth_date == '') {
			this.presentToast('birth date is required');
		} else if (this.gender == '') {
			this.presentToast('gender is required');
		} else if (this.email_address == '') {
			this.presentToast('email address is required');
		} else if (this.username == '') {
			this.presentToast('username is required');
		} else if (this.password == '') {
			this.presentToast('password is required');
		} else if (this.confirm_password != this.password) {
			this.presentToast('password didn`t match');
		} else {
			this.disabledButton = true;

			const loading = await this.loadingCtrl.create({
				message: 'Please wait...'
			});
			loading.present();

			return new Promise(resolve => {
				let data = {
					menu: 'sign_up',
					name: this.name,
					birth_date: this.birth_date,
					gender: this.gender,
					email_address: this.email_address,
					username: this.username,
					password: this.password
				}


				this.accessProv.postData(data, 'server_site.php').subscribe((res: any) => {
					console.log(res);
				}, (err) => {
					console.log(err);
				});
			});

			// setTimeout(() => {
			// 	loading.dismiss();
			// }, 59000);


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

}
