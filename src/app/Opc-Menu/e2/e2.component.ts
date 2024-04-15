import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { cotizare } from 'src/app/Modelo/cotizacion-e2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-e2',
  templateUrl: './e2.component.html',
  styleUrls: ['./e2.component.css']
})
export class E2Component implements OnInit {

  total=0
  cotizar: cotizare[];
  cotiza: cotizare;



constructor(private cdr: ChangeDetectorRef) {
this.cotizar = [];
this.cotiza = new cotizare();


}


ngOnInit(): void {
}
CrearPDF(){
// Extraemos el
const DATA = document.getElementById('pdfTable');
const doc = new jsPDF('p', 'pt', 'a4');
const options = {
  background: 'white',
  scale: 3
};
html2canvas(DATA, options).then((canvas) => {

  const img = canvas.toDataURL('image/PNG');

  // Add image Canvas to PDF
  const bufferX = 15;
  const bufferY = 15;
  const imgProps = (doc as any).getImageProperties(img);
  const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
  return doc;
}).then((docResult) => {
  docResult.save(`Cotizacion_gastos_cliente_${new Date().toISOString()}.pdf`);
});

}
eliminarItem(index: number): void {
  this.total -= this.cotizar[index].valorT; // Restar el valor total del elemento que se va a eliminar
  this.cotizar.splice(index, 1); // Eliminar el elemento del array
}

editarItem(index: number): void {
  this.cotiza = { ...this.cotizar[index] };
  this.cotizar.splice(index, 1); // Eliminar el elemento del array
  this.total -= this.cotiza.valorT; // Restar el valor total del elemento que se va a editar
}


EnviarDatos(): void {
  const nuevaCotizacion: cotizare = { ...this.cotiza };
  nuevaCotizacion.valorT = nuevaCotizacion.valor * nuevaCotizacion.cantidad;
  this.cotizar.push(nuevaCotizacion);
  this.total += nuevaCotizacion.valorT;
  this.cotiza = new cotizare(); // Crear un nuevo objeto cotiza para limpiar el formulario
}

}
