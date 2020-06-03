import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public url_landing = ['/login'];
  public url_Home = ['/menu/home'];

  public data_user: any;


  constructor(
    private storage: Storage
  ) { }

}
