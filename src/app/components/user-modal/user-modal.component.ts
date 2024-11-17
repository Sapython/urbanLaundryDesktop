import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  service1: number = 0;
  service2: number = 0;
  service3: number = 0;
  service4: number = 0;

  constructor() {}

  ngOnInit(): void {}
  add(service: number) {
    if (service === 1) {
      this.service1++;
    }
    if (service === 2) {
      this.service2++;
    }
    if (service === 3) {
      this.service3++;
    }
    if (service === 4) {
      this.service4++;
    }
  }
  remove(service: number) {
    if (service === 1 && this.service1 > 0) {
      this.service1--;
    }
    if (service === 2 && this.service2 > 0) {
      this.service2--;
    }
    if (service === 3 && this.service3 > 0) {
      this.service3--;
    }
    if (service === 4 && this.service4 > 0) {
      this.service4--;
    }
  }
}
