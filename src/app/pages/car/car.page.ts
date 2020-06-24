import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.page.html',
  styleUrls: ['./car.page.scss'],
})
export class CarPage implements OnInit {

	constructor(
		private router: Router,
		private accessProv: AccessProviders,
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController,
		private alertCtrl: AlertController,
		private navCtrl: NavController,
		//private storage: Storage,
		private globalVar: GlobalService
	) { 
		if (!globalVar.car) {
			this.tryGetCar();
		}
		else{
			// console.log(globalVar.car)
		}
	}

	ngOnInit() {
		
	}

	async tryGetCar() {
		const loading = await this.loadingCtrl.create({
			message: 'Please wait...'
		});
		loading.present();

		return new Promise(resolve => {
			let data = {
				menu: 'get_car',
				id: this.globalVar.data_user.id,
			}

			this.accessProv.postData(data, 'server_site.php').subscribe((res: any) => {
				// console.log(res);
				if (res.error == false) {
					loading.dismiss();
					this.globalVar.car = res.data;
					//this.presentToast(res.msg);

				} else {
					loading.dismiss();
					//this.presentToast(res.msg);
				}
			}, (err) => {
				//console.log(err);
				loading.dismiss();
				this.presentAlert('Timeout');
			});
		});
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
					this.router.navigate(['/menu/home'])
				}
			},
			{
				text: 'Try Again',
				handler: () => {
					//console.log('Buy clicked');
					this.tryGetCar();
				}
			}
		]
		alert.backdropDismiss = false;

		alert.present();
	}

	public showcar(event){
		console.log(event);
	}

}
