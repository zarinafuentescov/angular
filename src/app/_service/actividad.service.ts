import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Actividad } from './../_model/actividad';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  url: string =  `${environment.HOST}/actividades`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Actividad[]>(this.url);
  }
}
