import { Component,OnInit  } from '@angular/core';
import { NasaService, Apod } from '../services/nasa.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css']
})

export class ApodComponent implements OnInit {
  apod: Apod;
  showForm: boolean = false;

constructor(private nasaService: NasaService) { }
ngOnInit() {
    this.getApod();
  }
getApod() {
    this.nasaService.getApod().subscribe((data: Apod) => {
      console.log('subscribe apod', data);
      this.apod = data;
    });
  }
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    date: new FormControl(''),
  });

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSubmit() {
    // Lógica para enviar el formulario
  }
  // Se crea clase para recibir datos del formulario
}

