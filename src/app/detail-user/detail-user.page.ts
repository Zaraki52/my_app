import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.page.html',
  styleUrls: ['./detail-user.page.scss'],
})
export class DetailUserPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  name : string = "";
  image : string = "";
  description : string = "";



ionViewWillEnter() {
  const backButton = document.querySelector('ion-back-button');
  backButton?.addEventListener('click', () => {
    location.reload();
  });
}

ionViewWillLeave() {
  const backButton = document.querySelector('ion-back-button');
  backButton?.removeEventListener('click', () => {
    location.reload();
  });
}
}