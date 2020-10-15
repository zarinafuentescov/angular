import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

import { Certificado } from './../_model/certificado';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

     // Http Headers
     httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    url: string =  `${environment.HOST}/certificados`;

  constructor(private http: HttpClient) { }

  certificadoCambio = new Subject<Certificado[]>();
  mensajeCambio = new Subject<string>();

  listar(){
    return this.http.get<Certificado[]>(this.url);
  }

  registrar(certificado: Certificado){
    return this.http.post(this.url, certificado);
  }


}
