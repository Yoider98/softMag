import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalService } from './global.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Diseño de Software del Magdalena';
  menuDesplegado: boolean = false;
  isLoggedIn: boolean = false;
  private isLoggedInSubscription: Subscription;;

  constructor(private router: Router, private globalService: GlobalService) {}

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();

  }

  ngOnInit(): void {
    if (!this.globalService.getLoggedIn()) {
      // Navega a la página de inicio de sesión
      this.router.navigate(['/Login']);
    }
    this.isLoggedInSubscription = this.globalService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  toggleMenu() {
    this.menuDesplegado = !this.menuDesplegado;
    console.log(" menuDesplegado",this.menuDesplegado)
  }
}
