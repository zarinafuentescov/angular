import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { TipoUsuario } from './../_model/tipoUsuario';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

  url: string =  `${environment.HOST}/tipos`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<TipoUsuario[]>(this.url);
  }

}
