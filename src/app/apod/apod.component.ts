import { Component,OnInit  } from '@angular/core';
import { NasaService, Apod } from '../services/nasa.service';

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css']
})
export class ApodComponent implements OnInit {
  apod: Apod;
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
}
