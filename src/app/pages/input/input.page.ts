import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { GlobalService } from "../../services/global.service";

@Component({
	selector: 'app-input',
	templateUrl: './input.page.html',
	styleUrls: ['./input.page.scss'],
})
export class InputPage implements OnInit {

	constructor(
		private router: Router,
		private toastCtrl: ToastController,
		private loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		private accessProv: AccessProviders,
		private globvar:GlobalService
	) { }

	name: string = '';
	lisance_plate: string = '';
	year: number = null;
	disabledButton: boolean;

	ngOnInit() {
	}

	async addCar() {
		if (this.name == '') {
			this.presentToast('name is required');
		} else if (this.lisance_plate == '') {
			this.presentToast('lisance plate is required');
		} else if (!this.year) {
			this.presentToast('year is required');
		} else {
			this.disabledButton = true;
			const loading = await this.loadingCtrl.create({
				message: 'Please wait...'
			});
			loading.present();

			return new Promise(resolve => {
				let data = {
					menu: 'add_car',
					id: this.globvar.data_user.id,
					name: this.name,
					lisance_plate: this.lisance_plate,
					year: this.year
				}

				this.accessProv.postData(data, 'server_site.php').subscribe((res: any) => {
					//console.log(res);
					if (res.error == false) {
						loading.dismiss();
						this.disabledButton = false;
						this.presentToast(res.msg);
					} else {
						loading.dismiss();
						this.disabledButton = false;
						this.presentToast(res.msg);
					}
				}, (err) => {
					// console.log(err);
					loading.dismiss();
					this.disabledButton = false;
					this.presentAlert('Timeout');
				});
			});
		}
	}

	private __resetInput(){
		this.name = '';
		this.lisance_plate = '';
		this.year = null;
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
					this.addCar();
				}
			}
		]
		alert.backdropDismiss = false;

		alert.present();
	}

	////////////////////////////////




}
