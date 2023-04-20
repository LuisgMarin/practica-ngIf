import { Component, NgModule, OnInit } from '@angular/core';
import { NasaService, Apod } from '../services/nasa.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css']
})

export class ApodComponent {
  apod: Apod;
  // banderas para mostrar u ocultar la info de los buttoms
  showForm: boolean = false;
  showName: boolean = false;
  showEmail: boolean = false;
  showMessageAlet: boolean = false;
  showDate: boolean = false;
  showImage: boolean = false;
  // almacenar fecha ingresada
  nombre: string = "";
  fecha: string = "";
  email: string = "";

  constructor(private nasaService: NasaService) {
  }

  //utiliza el servicio para obtener información de la API de la NASA y asignarla a la propiedad "apod"

  getApod(fecha: string) {
    this.nasaService.getApod(fecha).subscribe((data: Apod) => {
      this.apod = data;
    });
  }
  // Datos del Form
  profileForm = new FormGroup({
    nombre: new FormControl(''),
    fecha: new FormControl(''),
    email: new FormControl('')

  });


  // metodo para mostrar u ocultarlelementos
  toggleForm() {
    this.showForm = !this.showForm;
  }

  toggleName() {
    this.showName = !this.showName;
  }

  toggleEmail() {
    this.showEmail = !this.showEmail;
  }
  toggleDate() {
    this.showDate = !this.showDate;
  }

  onSubmit(): boolean {
    // extraer la fecha actual en formato valido
    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1;
    const dia = fechaActual.getDate();
    const fechaActualString = `${anio}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;

    this.showImage = false;
    // regex para evaluar
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    // fecha ingresada
    const fechaEvaluar = this.profileForm.controls['fecha'].value;
    let fechaValida = false;
    const correoValido = this.validarCorreo();

    //Validar que la fecha no sea nula

    if (fechaEvaluar != null) {
      fechaValida = regex.test(fechaEvaluar); // Validar si la fecha cumple con el formato esperado

      // si es valida se hace la consulta al nasaService
      if (correoValido == true) {

        if (fechaValida == true) {
          this.getApod(fechaEvaluar);
          this.showImage = !this.showImage;
        } else {
          alert("La fecha " + fechaEvaluar + " no es valida");
          this.getApod(fechaActualString); // de lo contrario se manda la fecha de hoy

        }
      } else {
        this.showMessageAlet = !this.showMessageAlet
      }
    }
    return fechaValida;
  }
  validarCorreo(): boolean {
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailEvaluar = this.profileForm.controls['email'].value;
    let emailValido = false;

    //Validar que la email no sea nulo

    if (emailEvaluar != null) {
      emailValido = regexEmail.test(emailEvaluar); // Validar que el email cumpla con el formato esperado

    }
  return emailValido;

  }
}

