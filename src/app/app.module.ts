import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { InicioComponent } from './Opc-Menu/inicio/inicio.component';
import { E1Component } from './Opc-Menu/e1/e1.component';
import { E2Component } from './Opc-Menu/e2/e2.component';
import { E3Component } from './Opc-Menu/e3/e3.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    E1Component,
    E2Component,
    E3Component,
    FooterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
