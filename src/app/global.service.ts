import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) { }

  setLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
    this.router.navigate(['/Inicio']);
  }

  getLoggedIn() {
    console.log("busca", this.isLoggedIn$ )
    return this.isLoggedInSubject.value;

  }
  logout() {
    this.setLoggedIn(false);
  }
}
