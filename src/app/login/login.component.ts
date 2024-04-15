import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private globalService: GlobalService) { }
  ngOnInit(): void {

  }

  login() {
    this.globalService.setLoggedIn(true);
    console.log('entro')

  }

}
