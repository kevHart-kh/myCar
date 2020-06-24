import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable({
	providedIn: 'root'
})
export class GlobalService {

	public url_landing = ['/intro'];
	public url_Home = ['/menu/home'];

	public data_user: any;
	public car: any;

	constructor(
		private storage: Storage
	) { }

}
