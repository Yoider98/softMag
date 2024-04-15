import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { cotizare } from 'src/app/Modelo/cotizacion-e1';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-e1',
  templateUrl: './e1.component.html',
  styleUrls: ['./e1.component.css']
})
export class E1Component implements OnInit {

        total=0
        cotizar: cotizare[];
        cotiza: cotizare;
        opciones: { grupo: string, opciones: string[] }[] = [

          {
            "grupo": "PRELIMINARES",
            "opciones": [

              "Localización y replanteo",
            "Descapote y limpieza",
            "Descapote y nivelación",
            "Excavación manual",
            "Excavación mecánica",
            "Excavación para redes",
            "Excavación tanques y fosos",
            "Excavación vigas de cimentación",
            "Relleno material seleccionado",
            "Relleno material seleccionado natural",
            "Retiro material sobrante manual",
            "Retiro material sobrante mecánico",
            "Descapote y limpieza",
            "Descapote y nivelación"
            ]
          },
          {
            "grupo": "EXCAVACIONES Y CIMENTACIONES",
            "opciones": [

              "Excavación cimientos",
            "Excavación de zapatas",
            "Zapata aislada",
            "Zapata corrida",
            "Zapatas en concreto 3000 PSI",
            "Zapatas en concreto 3500 PSI",
            "Cimiento de concreto 2500 PSI",
            "Cimiento de concreto 3000 PSI",
            "Columna circular en concreto 3000 PSI",
            "Columna circular en concreto 3500 PSI",
            "Columnas en concreto 3000 PSI",
            "Columnas en concreto 3500 PSI",
            "Cimentación muro contención 3000 PSI",
            "Cimentación muro contención 3500 PSI",
            "Muro de contención bloque"

            ]
          },
          {
            "grupo": "RELLENOS",
            "opciones": [

              "Relleno material seleccionado",
            "Relleno material seleccionado natural"
            ]
          },
          {
            "grupo": "ESTRUCTURA",
            "opciones": [

              "Acero de refuerzo",
              "Estructura metálica para techo",
              "Vigas en concreto",
              "Vigas madera sapán techo",
              "Vigas de amarre en concreto",
              "Vigas de amarre 3000 PSI",
              "Vigas de amarre 3500 PSI",
              "Losa aligerada",
              "Losa metaldeck 2\"",
              "Losa metaldeck 3\"",
              "Poyos cocina",
              "Poyos ducha",
              "Viga canal en concreto"
            ]
          },
          {
            "grupo": "MAMPOSTERIA",
            "opciones": [

              "Enchape azulejo",
              "Enchape cerámica",
              "Enchape en piedra laja",
              "Enchape porcelana",
              "Mampostería en concreto",
              "Levante bloque arcilla 12",
              "Levante bloque arcilla 15",
              "Levante bloque arcilla 20",
              "Levante bloque arcilla 9",
              "Levante bloque de cemento",
              "Levante calado",
              "Levante doble ladrillo",
              "Levante doble ladrillo tolette",
              "Levante sencillo ladrillo",
              "Levante sencillo ladrillo tolette",
              "Sobrenivel ladrillo doble",
              "Sobrenivel ladrillo sencillo",
              "Solados en concreto"
            ]
          },
          {
            "grupo": "PAÑETE",
            "opciones": [

              "Pañete cielo raso",
            "Pañete exterior allanado",
            "Pañete exterior impermeabilizado",
            "Pañete exterior rayado",
            "Pañete interior allanado",
            "Pañete interior impermeabilizado",
            "Pañete pulido con cal",
            "Pañete sobrenivel"
            ]
          },
          {
            "grupo": "ENCHAPE",
            "opciones": [

              "Enchape azulejo",
              "Enchape cerámica",
              "Enchape en piedra laja",
              "Enchape porcelana"
            ]
          },
          {
            "grupo": "CUBIERTAS Y CIELORRASO",
            "opciones": [

              "Cubierta lámina ondulada/madera",
              "Cubierta teja española/madera",
              "Cubierta tipo sandwich metecno",
              "Cielorraso acrílico",
              "Cielorraso aluminio",
              "Cielorraso drywall",
              "Cielorraso drywall antihumedad",
              "Cielorraso en lámina policarbonato",
              "Cielorraso en tablillas PVC",
              "Cielorraso fibra de vidrio",
              "Cielorraso icopor",
              "Cielorraso madera"
            ]
          },
          {
            "grupo": "REDES HIDROSANITARIAS",
            "opciones": [

              "Redes agua potable",
            "Redes aguas negras",
            "Redes de aguas lluvias",
            "Redes de ventilación"
            ]
          },
          {
            "grupo": "REDES ELÉCTRICAS",
            "opciones": [

              "Instalación provisional de agua",
            "Instalación provisional de energía",
            "Instalación red eléctrica"
            ]
          },
          {
            "grupo": "PISO",
            "opciones": [

              "Piso adoquín peatonal",
              "Piso cerámica",
              "Piso de granito",
              "Piso en concreto",
              "Piso granito fundido pulido",
              "Piso granito fundido sin pulir",
              "Piso mosaico de cemento",
              "Piso porcelanato",
              "Piso tableta arcilla exterior",
              "Piso tablón exterior",
              "Placa de contrapiso"
            ]
          },
          {
            "grupo": "CARPINTERÍA EN MADERA",
            "opciones": [

              "Cielorraso madera",
            "Poyos cocina",
            "Poyos ducha",
            "Puertas",
            "Mesón de granito para cocina",
            "Mesón de mármol para baños",
            "Mesón en concreto",
            "Mueble de cocina en melamina",
            "Zócalo baldosín",
            "Zócalo cerámica",
            "Zócalo granito color fun/pul",
            "Zócalo granito fun/pul"
            ]
          },
          {
            "grupo": "CARPINTERÍA METÁLICA",
            "opciones": [

              "Cielorraso aluminio",
            "Cielorraso en lámina policarbonato",
            "Estructura metálica para techo",
            "Puertas metálicas o de madera",
            "Ventanas metálicas o de madera"
            ]
          },
          {
            "grupo": "IMPERMEABILIZACIONES",
            "opciones": [

              "Impermeabilización caliente 2 capas",
            "Impermeabilización caliente 3 capas",
            "Impermeabilización con Ecoplug 5000",
            "Impermeabilización manto",
            "Repelente humedad"
            ]
          }

        ]
        ;
        opcionesFiltradas: string[] = [];



  constructor(private cdr: ChangeDetectorRef) {
      this.cotizar = [];
      this.cotiza = new cotizare();
      // this.opciones = require('../../../assets/data.json');

   }


   ngOnInit(): void {
    this.opcionesFiltradas = this.opciones.flatMap(opcion => opcion.opciones);
    this.cotiza.tipo = this.opcionesFiltradas[0]; // Seleccionar la primera opción
  }
  onTipoChange(): void {
    const grupo = this.opciones.find(opcion => opcion.grupo === this.cotiza.tipo);
    this.opcionesFiltradas = grupo ? grupo.opciones : [];

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
  CrearPDF(): void {
    const DATA = document.getElementById('pdfTable');
    const doc = new jspdf('p', 'pt', 'a4');
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
      docResult.save(`Cotizacion_mano_de_obra_${new Date().toISOString()}.pdf`);
    });
  }



  EnviarDatos(): void {
    const nuevaCotizacion: cotizare = { ...this.cotiza };
    nuevaCotizacion.valorT = nuevaCotizacion.valor * nuevaCotizacion.cantidad;
    this.cotizar.push(nuevaCotizacion);
    this.total += nuevaCotizacion.valorT;
    this.cotiza = new cotizare();
    this.cdr.detectChanges();
  }
}
