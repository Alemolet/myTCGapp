import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  @Input() data: string[];

  private email: string = '';
  private password: string = '';
  private nickname: string = '';

  constructor() {}

  ngOnInit() {
   this.email = this.data[0];
   this.password = this.data[1];
   this.nickname = this.data[2];
  }

}
