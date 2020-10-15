import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CertificadoService } from './../../../_service/certificado.service';
import { Certificado } from './../../../_model/certificado';

import { Empresa } from './../../../_model/empresa';
import { EmpresaService } from './../../../_service/empresa.service';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {

  form: FormGroup;
  fechaEmision: Date = new Date();
  empresa: Empresa;
  certificado: Certificado;

  
  datos: string;
  rut: any;
  dv:any;
  razonSocial:any;
  ultimaCotizacion:string;

  constructor( private certificadoService: CertificadoService, private empresaService: EmpresaService) { }

  ngOnInit() {

    this.form = new FormGroup({
    
       rut : new FormControl(''),
       dv: new FormControl(''),
       ultimaCotizacion : new  FormControl('')
  
     });
  }

  consultar(){
    console.warn(this.form.value);

    let rut = this.form.value.rut;

    //console.log ("rut ", this.rut);

    this.empresaService.listarPorRut(rut).subscribe(data=>{
      this.empresa = data;
    });

    let certificado = new Certificado();
    certificado.id_empresa = this.empresa.idEmpresa;
    certificado.ultimaCotizacion =  this.form.value.ultimaCotizacion;
    certificado.fechaEmision =  this.fechaEmision;

    this.certificadoService.registrar(certificado).subscribe(data=>{
      this.certificadoService.listar().subscribe(certificado => {
        this.certificadoService.certificadoCambio.next(certificado);
        this.certificadoService.mensajeCambio.next('Se ha registrado el certificado');
    });
  }); 
    
    //console.warn(this.empresa);

    this.rut = `${this.empresa.rut}`;
    this.dv =   `${this.empresa.dv}`;
//                 id=${this.empresa.idEmpresa}
    this.razonSocial=`${this.empresa.razonSocial}`;
    this.ultimaCotizacion= `${this.form.value.ultimaCotizacion}`;



    
  

}
}
