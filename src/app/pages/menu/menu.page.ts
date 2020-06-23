import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.page.html',
	styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

	pages = [
		{
			title: 'home',
			icon: 'car-sport-sharp',
			url: '/menu/home'
		}, {
			title: 'input',
			icon: 'car-sport-sharp',
			url: '/menu/input'
		},
	];

	pagesAccount = [
		{
			title: 'Profile',
			icon: 'person-circle-sharp',
			url: '/menu/profile'
		}
	];

	constructor() { }

	ngOnInit() {
	}

}
