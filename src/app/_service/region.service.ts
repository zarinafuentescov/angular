import { Injectable } from '@angular/core';
import { Region } from './../_model/region';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegionService {

   // Http Headers
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  regionCambio = new Subject<Region[]>();
  mensajeCambio = new Subject<string>();

  url: string =  `${environment.HOST}/regiones`;
    
    //url: string =  'http://scratchya.com.ar/vue/datos.php';
 

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Region[]>(this.url);
 
  }

  listar2(){
    return this.http.get<Region[]>('http://localhost:8080/regiones');
  }
}
