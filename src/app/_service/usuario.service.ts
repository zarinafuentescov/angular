import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../_model/usuario';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    // Http Headers
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

  url: string =  `${environment.HOST}/usuarios`;

  constructor(private http: HttpClient) { }

  usuariosCambio = new Subject<Usuario[]>();
  mensajeCambio = new Subject<string>();

  listar(){
    return this.http.get<Usuario[]>(this.url);
  }

  listarPorId(idUsuario: number){
    return this.http.get<Usuario>(`${this.url}/${idUsuario}`);
    
  }

  registrar(usuario: Usuario){
  return this.http.post(this.url, usuario);
  }

  modificar(usuario: Usuario){
    return this.http.put(this.url, usuario);
  }

  eliminar(usuario: Usuario){
    return this.http.delete(`${this.url}/${usuario.idUsuario}`);
  }


}
