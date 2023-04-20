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
  showForm: boolean = false;
  showImage: boolean = false;
  fecha: string = "";

  constructor(private nasaService: NasaService) { }

  getApod(fecha:string) {
    this.nasaService.getApod(fecha).subscribe((data: Apod) => {
      console.log('subscribe apod', data, this.fecha);
      this.apod = data;
    });
  }
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    fecha: new FormControl(''),

  });

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSubmit(): boolean {
    this.showImage = false;
    console.log('entro al submit');
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    const fechaEvaluar = this.profileForm.controls['fecha'].value;
    let fechaValida = false;
    if (fechaEvaluar != null) {
      fechaValida = regex.test(fechaEvaluar); // Validar si la fecha cumple con el formato esperado
      if (fechaValida == true) {
        this.getApod(fechaEvaluar);        
        this.showImage = !this.showImage;
      }
    }
    return fechaValida;
  }
}

