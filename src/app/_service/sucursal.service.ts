import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Sucursal } from './../_model/sucursal';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  url: string =  `${environment.HOST}/sucursales`;

  constructor(private http: HttpClient) { }

  sucursalCambio = new Subject<Sucursal[]>();
  mensajeCambio = new Subject<string>();

  listar(){
    return this.http.get<Sucursal[]>(this.url);
  }

  

}
