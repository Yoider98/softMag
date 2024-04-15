import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
  }
  logout() {
    this.globalService.logout();
  }

}
