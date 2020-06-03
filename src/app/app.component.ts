import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private storage: Storage,
		private navCtrl: NavController,
		private statusBar: StatusBar
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});

		this.storage.get('SESSION').then((val) => {
			if (val == null) {
				// this.navCtrl.navigateRoot(['/login']);
				this.navCtrl.navigateRoot(['/registration']);
			}
			else {
				this.navCtrl.navigateRoot(['/home']);
			}
		});

	}
}
