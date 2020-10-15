import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Empresa } from './../_model/empresa';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

    // Http Headers
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

  empresaCambio = new Subject<Empresa[]>();
  mensajeCambio = new Subject<string>();

  url: string =  `${environment.HOST}/empresas`;
  //url: 'http://localhost:8080/empresas';
  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Empresa[]>(this.url);
  }

  listarPorId(idEmpresa: number){
    return this.http.get<Empresa>(`${this.url}/${idEmpresa}`);
  }

  listarPorRut(rut:number){
    return this.http.get<Empresa>(`${this.url}/rut/${rut}`);
  }

  registrar(empresa : Empresa){
    return this.http.post(this.url, empresa);
  }

  modificar(empresa : Empresa){
    return this.http.put(this.url, empresa);
  }
  
  eliminar(empresa : Empresa){
    return this.http.delete(`${this.url}/${empresa.idEmpresa}`);
  }

}
