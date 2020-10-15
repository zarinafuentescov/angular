import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { EmpresaService } from './../../../_service/empresa.service';
import { Empresa } from './../../../_model/empresa';

import { ComunaService } from './../../../_service/comuna.service';
import { Comuna } from './../../../_model/comuna';

import { ActividadService } from './../../../_service/actividad.service';
import { Actividad } from './../../../_model/actividad';

@Component({
  selector: 'app-registrar-empresa',
  templateUrl: './registrar-empresa.component.html',
  styleUrls: ['./registrar-empresa.component.css']
})
export class RegistrarEmpresaComponent implements OnInit {

  id: number;
  empresa: Empresa;
  form: FormGroup;
  edicion: boolean = false;

  actividad : Actividad[];
  comuna : Comuna[];

  idComunaSeleccionado: number;
  idActividadSeleccionado: number;

  constructor( private empresaService: EmpresaService, 
    private comunaService: ComunaService, 
    private actividadService: ActividadService,
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {
    this.listarActividad();
    this.listarComuna();

    this.form = new FormGroup({
     // 'id': new FormControl(0),
      'razonSocial' : new FormControl(''),
      'rut' : new FormControl(''),
      'dv': new FormControl(''),
      'direccion':new FormControl(''),
      'comuna':new FormControl(''),
      'actividad':new FormControl(''),
      'fechaRegistro':new FormControl('')
    });
  }

  listarComuna(){
    this.comunaService.listar().subscribe(data => {
      this.comuna = data;
    });
  }

  listarActividad(){
    this.actividadService.listar().subscribe(data =>{
      this.actividad = data;
    });
  }

  submit(){
    console.warn(this.form.value);
      //this.empresa 
   // this.empresa.idEmpresa = this.form.value['id'];
  /*  this.empresa.razonSocial = this.form.value['razon'];
    this.empresa.rut = this.form.value['rut'];
    this.empresa.dv = this.form.value['dv'];
    this.empresa.direccion = this.form.value['direccion'];
    this.empresa.comuna = this.form.value['comuna'];
    this.empresa.actividad = this.form.value['actividad'];
    this.empresa.fechaRegistro = this.form.value['fechaRegistro'];
*/
    this.empresa = this.form.value;

    this.empresaService.registrar(this.empresa).subscribe(data =>{
      this.empresaService.listar().subscribe(empresa => {
        this.empresaService.empresaCambio.next(empresa);
        this.empresaService.mensajeCambio.next("Se ha registrado la empresa");
      });
    });

  }

  datos:string;

  formularioContacto = new FormGroup({
    nombre: new FormControl(''),
    mail: new FormControl(''),
    mensaje: new FormControl('')
  });

  submit2() {
    this.datos=`Nombre=${this.formularioContacto.value.nombre}
                Mail=${this.formularioContacto.value.mail}
                Mensaje=${this.formularioContacto.value.mensaje}
                `;
  }

}
