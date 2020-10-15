import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { EmpresaService } from './../../../../_service/empresa.service';
import { Empresa } from './../../../../_model/empresa';

import { ComunaService } from './../../../../_service/comuna.service';
import { Comuna } from './../../../../_model/comuna';

import { ActividadService } from './../../../../_service/actividad.service';
import { Actividad } from './../../../../_model/actividad';

@Component({
  selector: 'app-edicion-empresa',
  templateUrl: './edicion-empresa.component.html',
  styleUrls: ['./edicion-empresa.component.css']
})
export class EdicionEmpresaComponent implements OnInit {


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
    this.empresa = new Empresa();

    this.listarActividad();
    this.listarComuna();

    this.form = new FormGroup({
      'id': new FormControl(''),
      'razonSocial' : new FormControl(''),
      'rut' : new FormControl(''),
      'dv': new FormControl(''),
      'direccion':new FormControl(''),
      'comuna':new FormControl(''),
      'actividad':new FormControl(''),
      'fechaRegistro':new FormControl('')
    });

    this.route.params.subscribe((params: Params) =>{
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
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

  initForm(){
    if(this.edicion){
      this.empresaService.listarPorId(this.id).subscribe(data => {
        
        let id = data.idEmpresa;
        let razonSocial = data.razonSocial;
        let rut = data.rut;
        let dv = data.dv;
        let direccion = data.direccion;
        let comuna = data.comuna;
        let actividad = data.actividad;
        let fechaRegistro = data.fechaRegistro;
        
        this.form = new FormGroup({
          'id' : new FormControl(id),
          'razonSocial': new FormControl(razonSocial),
          'rut' : new FormControl(rut),
          'dv' : new FormControl(dv),
          'direccion': new FormControl(direccion),
          'comuna': new FormControl(comuna),
          'actividad': new FormControl(actividad),
          'fechaRegistro' : new FormControl(fechaRegistro)
        });

      });
    }
  }

  operar(){
    console.warn(this.form.value);
 /*   this.empresa.idEmpresa = this.form.value['id'];
    this.empresa.razonSocial = this.form.value['razon'];
    this.empresa.rut = this.form.value['rut'];
    this.empresa.dv = this.form.value['dv'];
    this.empresa.direccion = this.form.value['direccion'];
    this.empresa.comuna = this.form.value['comuna'];
    this.empresa.actividad = this.form.value['actividad'];
    this.empresa.fechaRegistro = this.form.value['fechaRegistro'];*/
    this.empresa = this.form.value;

 /*   if (this.empresa != null && this.empresa.idEmpresa > 0) {
    this.empresaService.modificar(this.empresa).pipe(switchMap(() => {
      return this.empresaService.listar();
    })).subscribe(data => {
      this.empresaService.empresaCambio.next(data);
      this.empresaService.mensajeCambio.next("Se ha modificado la empresa");
    });

  }*/

  this.empresaService.modificar(this.empresa).subscribe(data => {
    return this.empresaService.listar().subscribe( empresa =>{
      this.empresaService.empresaCambio.next(empresa);
      this.empresaService.mensajeCambio.next("Se ha modificado la empresa");
    });
  });
    this.router.navigate(['empresa']);
  }

}
