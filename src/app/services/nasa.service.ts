import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

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
@Injectable({
  providedIn: 'root'
})
export class NasaService {
  private configUrl: string;
  constructor(private http: HttpClient) { }
  getApod(): Observable<Apod> { 
    this.configUrl = `${environment.nasaUrl}/planetary/apod?api_key=${environment.nasaKey}`;
    const apod = this.http.get<Apod>(this.configUrl);
    return apod;
  }
}
