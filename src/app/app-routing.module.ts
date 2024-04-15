import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Opc-Menu/inicio/inicio.component';
import { E1Component } from './Opc-Menu/e1/e1.component';
import { E2Component } from './Opc-Menu/e2/e2.component';
import { E3Component } from './Opc-Menu/e3/e3.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: "",pathMatch:"full", redirectTo:"Login"},
  {path:'Login',component:LoginComponent},
  {path:'Inicio',component:InicioComponent},
  {path:'GastosCliente',component:E2Component},
  {path:'ManoObra',component:E1Component},
  {path:'Cronograma',component:E3Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
