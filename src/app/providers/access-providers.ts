import { Injectable } from "@angular/core";
import { HttpClientModule, HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()

export class AccessProviders {
	server: string = 'http://localhost/server-ionic/api/';

	constructor(
		public http: HttpClient
	) { }

	postData(data, file_name) {
		let headers = new HttpHeaders({
			'content-type': 'application/json; charset-UTF -8'
		});
		let option = {
			headers: headers
		}

		return this.http.post(this.server + file_name, JSON.stringify(data), option).timeout(5000).map(res => res);
	}

}