import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Los datos que se esperan recibir
export interface Apod {
  copyright: string;
  date: string;
  explanation: string;
  media_type: string;
  service_version: string;
  title: string;
  hdurl: string;
  url: string;
}

// Injectar en caulquier otro componente
@Injectable({
  providedIn: 'root'
})

export class NasaService {
  private configUrl: string;
  fecha:string="";

  constructor(private http: HttpClient) { }


//getApod que toma una fecha como argumento y devuelve un Observable de tipo Apod.
  getApod(fecha: string): Observable<Apod> {
    this.configUrl = `${environment.nasaUrl}/planetary/apod?api_key=${environment.nasaKey}&date=${fecha}`;
    const apod = this.http.get<Apod>(this.configUrl);
    return apod;
  }
}
