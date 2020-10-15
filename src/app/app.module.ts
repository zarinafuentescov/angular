import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule} from './components/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpresaComponent } from './components/pages/empresa/empresa.component';
import { CertificadoComponent } from './components/pages/certificado/certificado.component';
import { UsuariosComponent} from './components/pages/usuarios/usuarios.component';
import { RootNavComponent } from './root-nav/root-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { RegionService } from './_service/region.service';
import { EmpresaService } from './_service/empresa.service';
import { SucursalService } from './_service/sucursal.service';
import { UsuarioService } from './_service/usuario.service';
import { ComunaService } from './_service/comuna.service' 
import { ActividadService } from './_service/actividad.service';

import { RegionComponent } from './components/pages/region/region.component';
import { SucursalComponent } from './components/pages/sucursal/sucursal.component';
import { ComunasComponent } from './components/pages/comunas/comunas.component';
import { ActividadComponent } from './components/pages/actividad/actividad.component';
import { TipoUsuarioService } from './_service/tipo-usuario.service';
import { EdicionUsuarioComponent } from './components/pages/usuarios/edicion-usuario/edicion-usuario.component';
import { EdicionEmpresaComponent } from './components/pages/empresa/edicion-empresa/edicion-empresa.component';
import { RegistrarEmpresaComponent } from './components/pages/registrar-empresa/registrar-empresa.component';
import { RegistrarUsuarioComponent } from './components/pages/registrar-usuario/registrar-usuario.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
   SidenavComponent,
    EmpresaComponent,
    CertificadoComponent,
    UsuariosComponent,
    RootNavComponent,
    RegionComponent,
    SucursalComponent,
    ComunasComponent,
    ActividadComponent,
    EdicionUsuarioComponent,
    EdicionEmpresaComponent,
    RegistrarEmpresaComponent,
    RegistrarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [EmpresaService, RegionService, SucursalService, UsuarioService, ActividadService, ComunaService, TipoUsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
