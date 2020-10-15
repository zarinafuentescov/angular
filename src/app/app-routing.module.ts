import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EmpresaComponent } from './components/pages/empresa/empresa.component';
import { CertificadoComponent } from './components/pages/certificado/certificado.component';
import { UsuariosComponent } from './components/pages/usuarios/usuarios.component';
import { RegionComponent } from './components/pages/region/region.component';
import { SucursalComponent } from './components/pages/sucursal/sucursal.component';
import { ComunasComponent } from './components/pages/comunas/comunas.component';
import { ActividadComponent } from './components/pages/actividad/actividad.component';
import { EdicionUsuarioComponent } from './components/pages/usuarios/edicion-usuario/edicion-usuario.component';
import { EdicionEmpresaComponent } from './components/pages/empresa/edicion-empresa/edicion-empresa.component';
import { RegistrarEmpresaComponent } from './components/pages/registrar-empresa/registrar-empresa.component';
import { RegistrarUsuarioComponent } from './components/pages/registrar-usuario/registrar-usuario.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path:'empresa', component: EmpresaComponent, children:[
    { path:'nuevo', component: EdicionEmpresaComponent },
    { path:'edicion/:id', component: EdicionEmpresaComponent }
  ] },
  { path:'certificado', component: CertificadoComponent },
  { path:'usuarios', component: UsuariosComponent, children:[
    { path: 'nuevo', component: EdicionUsuarioComponent },
    { path: 'edicion/:id', component: EdicionUsuarioComponent }
  ] },
  { path:'region', component: RegionComponent },
  { path:'sucursal', component: SucursalComponent },
  { path:'comunas', component: ComunasComponent },
  { path:'actividad', component: ActividadComponent },
  { path:'registroemp', component: RegistrarEmpresaComponent},
  { path:'registrousu', component: RegistrarUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
