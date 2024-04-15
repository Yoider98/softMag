import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router: Router) { }

  // Atributo que almacena los datos del chart
  public balanceTotal: Chart;

  ngOnInit(): void {
    // datos
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Ingresos',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          backgroundColor: 'rgb(0, 255, 0)',
          tension: 0.1
        },
        {
        label: 'Gastos',
        data: [100, 80, 50, 90, 70, 60, 50],
        fill: true,
        backgroundColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
    };
    // Creamos la gráfica
    this.balanceTotal = new Chart("chart", {
      type: 'bar', // tipo de la gráfica
      data: data // datos
    });
  }
  redirectToGastosCliente() {
    this.router.navigate(['/GastosCliente']);
  }
  redirectToManoObra() {
    this.router.navigate(['/ManoObra']);
  }
  redirectToCronograma() {
    this.router.navigate(['/Cronograma']);
  }
}
