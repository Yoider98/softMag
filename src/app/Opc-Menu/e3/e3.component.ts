import { Component, OnInit } from '@angular/core';
import { crono } from 'src/app/Modelo/cronograna';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-e3',
  templateUrl: './e3.component.html',
  styleUrls: ['./e3.component.css']
})
export class E3Component implements OnInit {
  showSubactividadForm: boolean = false;
  subactividad: any = {
    nombre: '',
    fechaInicio: '',
    fechaFinalP: '',
    fechaFinalR: ''
  };
    SumaPR=0;
    SumaPP=0;
    SumaD=0;
    PGP=0;
    PGR=0;
    data = new Date();
    actividades: crono[];
    actidad: crono;
    SendDataonChange(event: any) {
      this.data = event.target.value;
    }

  constructor() {
    this.actividades =[];
    this.actidad = new crono();
  }
  mostrarFormularioSubactividad(index: number) {
    this.showSubactividadForm = true;
    this.actidad = { ...this.actividades[index] };
  }
  agregarSubactividad() {
    // Convierte las fechas de string a objetos Date para facilitar la comparación
    const fechaInicioActividad = new Date(this.actidad.ini);
    const fechaFinalPlanActividad = new Date(this.actidad.FP);
    const fechaFinalRealActividad = new Date(this.actidad.FR);
    console.log("fechaInicioActividad",fechaInicioActividad);
    console.log("fechaFinalPlanActividad",fechaFinalPlanActividad);
    console.log("fechaFinalRealActividad",fechaFinalRealActividad);

    // Convierte las fechas de string a objetos Date para facilitar la comparación
    const fechaInicioSubactividad = new Date(this.subactividad.fechaInicio);
    const fechaFinalPlanSubactividad = new Date(this.subactividad.fechaFinalP);
    const fechaFinalRealSubactividad = new Date(this.subactividad.fechaFinalR);

    // Verifica si las fechas de la subactividad están dentro del rango de fechas de la actividad principal
    if (fechaInicioSubactividad >= fechaInicioActividad &&
        fechaFinalPlanSubactividad <= fechaFinalPlanActividad &&
        fechaFinalRealSubactividad <= fechaFinalRealActividad &&
        fechaInicioSubactividad <= fechaFinalPlanSubactividad &&
        fechaInicioSubactividad <= fechaFinalRealSubactividad) {

      // Agrega la subactividad solo si todas las fechas están dentro del rango
      this.actividades.push({
        actividad: this.actidad.actividad +" <-> "+ this.subactividad.nombre,
        ini: this.subactividad.fechaInicio,
        FP: this.subactividad.fechaFinalP,
        id: '',
        FR: this.subactividad.fechaFinalR,
        dias: 0,
        PAvanceP: 0,
        PAvanceR: 0,
        diasR: 0,
        PdiasR: 0,
        estado: '',
        subActividad: []
      });

    //   const nuevaSubactividad = this.actidad.subActividad[this.actidad.subActividad.length - 1];
    // this.calular_dia_subactividad(nuevaSubactividad);
    // this.calcular_Porcentaje_Real_subactividad(nuevaSubactividad);
    // this.calcular_Porcentaje_plan_subactividad(nuevaSubactividad);
    // this.Estado_subactividad(nuevaSubactividad);

    } else {
      // Si alguna fecha excede el rango, puedes mostrar un mensaje de error o simplemente no agregar la subactividad
      console.log('La subactividad está fuera del rango de fechas de la actividad principal.');
      // Opcionalmente, podrías mostrar un mensaje al usuario aquí.
    }

    // Limpia el formulario de subactividad y oculta el formulario
    this.subactividad = {
      nombre: '',
      fechaInicio: '',
      fechaFinalP: '',
      fechaFinalR: ''
    };
    this.showSubactividadForm = false;
  }


  ngOnInit(): void {}

  calular_dia_subactividad(subactividad: any) {
    const FI = new Date(subactividad.fechaInicio);
    const FR = new Date(subactividad.fechaFinalR);
    const timeDiff = Math.abs(FR.getTime() - FI.getTime());
    subactividad.dias = Math.floor((timeDiff / (1000 * 3600 * 24)));
  }

  calcular_Porcentaje_Real_subactividad(subactividad: any) {
    // Lógica para calcular el porcentaje de avance real de la subactividad
  }

  calcular_Porcentaje_plan_subactividad(subactividad: any) {
    // Lógica para calcular el porcentaje de avance del plan de la subactividad
  }

  Estado_subactividad(subactividad: any) {
    // Lógica para calcular el estado de la subactividad
  }

  editActividad(index: number) {
    this.actidad = { ...this.actividades[index] }; // Copiar la actividad seleccionada al formulario
    this.actividades.splice(index, 1); // Eliminar la actividad de la lista
  }

  deleteActividad(index: number) {
    this.actividades.splice(index, 1); // Eliminar la actividad de la lista
    this.updateSum(); // Actualizar las sumas después de eliminar
  }

  EnviarDatos(): any {
    this.calular_dia();
    this.calcular_Porcentaje_Real();
    this.calcular_Porcentaje_plan();
    this.Estado();
    this.dias_retraso();
    this.PAvanceGlobal();
    this.actividades.push({...this.actidad}); // Crear una copia del objeto actidad
    this.actidad = new crono(); // Crear un nuevo objeto actidad
    this.updateSum(); // Actualizar las sumas después de agregar
  }

  Estado(){
    let porce = this.actidad.PAvanceR;
    if(porce == 100){
      this.actidad.estado = "Finalizado";
    } else if(porce < 100 && porce >= 10){
      this.actidad.estado = "En Proceso";
    } else if(porce == 0){
      this.actidad.estado = "No iniciado";
    }
  }

  PAvanceGlobal(){
    var suma1 = (this.actidad.dias * this.actidad.PAvanceP);
    var suma2 = (this.actidad.dias * this.actidad.PAvanceR);
    this.SumaPP = this.SumaPP + suma1;
    this.SumaPR = this.SumaPR + suma2;
    this.SumaD = this.SumaD + this.actidad.dias;
    this.PGP = parseFloat((this.SumaPP / this.SumaD).toFixed(2));
    this.PGR = parseFloat((this.SumaPR / this.SumaD).toFixed(2));
  }

  calular_dia(){
    const FI = new Date(this.actidad.ini);
    const FR = new Date(this.actidad.FR);
    const timeDiff = Math.abs(FR.getTime() - FI.getTime());
    this.actidad.dias = Math.floor((timeDiff / (1000 * 3600 * 24)));
  }

  calcular_Porcentaje_Real(){
    let dtH = new Date();
    const FI = new Date(this.actidad.ini);
    const FR = new Date(this.actidad.FR);
    const PAPA = Math.abs(dtH.getTime() - FI.getTime());
    const PAPA1 = Math.floor(PAPA / (1000 * 3600 * 24));
    const timeDiff = Math.abs(FR.getTime() - FI.getTime());
    let Duracion_Real = Math.floor((timeDiff / (1000 * 3600 * 24)));
    if(PAPA1 > Duracion_Real){
      this.actidad.PAvanceR = 100;
    } else if(PAPA1 < Duracion_Real && PAPA1 >= 1){
      const cal1 = ((PAPA1 - Duracion_Real) / PAPA1) * 100;
      this.actidad.PAvanceR = 100 + Number(cal1.toFixed(2));
    } else if(PAPA1 <= 0){
      this.actidad.PAvanceR = 0;
    }
  }

  calcular_Porcentaje_plan(){
    let dt = new Date();
    const FI = new Date(this.actidad.ini);
    const FP = new Date(this.actidad.FP);
    const PAP = Math.abs(dt.getTime() - FI.getTime());
    const PAP1 = Math.floor(PAP / (1000 * 3600 * 24));
    const timeDiff = Math.abs(FP.getTime() - FI.getTime());
    let Duracion_Plan = Math.floor((timeDiff / (1000 * 3600 * 24))) + 1;
    if(PAP1 > Duracion_Plan){
      this.actidad.PAvanceP = 100;
    } else if(PAP1 < Duracion_Plan && PAP1 >= 1){
      const cal1 = ((PAP1 - Duracion_Plan) / PAP1) * 100;
      this.actidad.PAvanceP = 100 + Number(cal1.toFixed(2));
    } else if(PAP1 <= 0){
      this.actidad.PAvanceP = 0;
    }
  }

  dias_retraso() {
    const FI = new Date(this.actidad.ini);
    const FP = new Date(this.actidad.FP);
    const FR = new Date(this.actidad.FR);

    const timeDiff_FP_FI = Math.abs(FP.getTime() - FI.getTime());
    const days_FP_FI = Math.ceil(timeDiff_FP_FI / (1000 * 3600 * 24));

    const timeDiff_FR_FI = Math.abs(FR.getTime() - FI.getTime());
    const days_FR_FI = Math.ceil(timeDiff_FR_FI / (1000 * 3600 * 24));

    const Prom = Math.abs((FR.getTime() - FP.getTime()) / (days_FR_FI + 1));

    const PAP = Math.abs(FP.getTime() - FI.getTime());
    const PAP1 = Math.floor(PAP / (1000 * 3600 * 24));

    const i = ((this.actidad.dias)-PAP1 ); // Asegurarse de que this.actidad.dias sea un número válido
    if(i <= 0){
      this.actidad.diasR = 0;
    }else{
      this.actidad.diasR = i;
    }
    console.log(Prom);
    this.actidad.PdiasR = Number(Prom.toFixed(2))*100;
  }


  CrearPDF(){
    const DATA = document.getElementById('pdf');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 4
    };
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`Cronograma_${new Date().toISOString()}.pdf`);
    });
  }

  name = 'ExcelSheet.xlsx';

  exportToExcel(): void {
    let element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');
    XLSX.writeFile(book, this.name);
  }

  // Método para actualizar las sumas
  updateSum() {
    this.SumaPP = 0;
    this.SumaPR = 0;
    this.SumaD = 0;
    for (let i = 0; i < this.actividades.length; i++) {
      const actividad = this.actividades[i];
      this.SumaPP += actividad.dias * actividad.PAvanceP;
      this.SumaPR += actividad.dias * actividad.PAvanceR;
      this.SumaD += actividad.dias;
    }
    this.PGP = parseFloat((this.SumaPP / this.SumaD).toFixed(2));
    this.PGR = parseFloat((this.SumaPR / this.SumaD).toFixed(2));
  }
}
