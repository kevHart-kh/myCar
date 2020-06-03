import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { AlertController, NavController } from '@ionic/angular';
import { GlobalService } from "../../services/global.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {



  constructor(
    private storage: Storage,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private globVar: GlobalService
  ) {
    this.storage.get('SESSION').then((res) => {
      this.globVar.data_user = res;
    });
  }

  ngOnChanges() {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
  }

  logOut() {
    this.logOutAlert()
  }

  async logOutAlert() {
    let alert = await this.alertCtrl.create();
    alert.header = 'You Want to Log Out?';
    alert.buttons = [
      {
        text: 'NO',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          this.storage.remove('SESSION')
          this.navCtrl.navigateRoot(['/login']);
        }
      }
    ]
    alert.backdropDismiss = false;

    alert.present();
  }

}
