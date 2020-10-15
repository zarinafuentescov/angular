import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Comuna } from './../_model/comuna';

@Injectable({
  providedIn: 'root'
})
export class ComunaService {

     // Http Headers
     httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    comunaCambio = new Subject<Comuna[]>();
    mensajeCambio = new Subject<string>();

  url: string =  `${environment.HOST}/comunas`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Comuna[]>(this.url);
  }
}
