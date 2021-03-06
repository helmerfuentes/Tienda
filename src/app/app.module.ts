import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ComponentModule } from './components/component.module';
import { ListarComponent } from './pages/producto/listar/listar.component';
import { RegistrarComponent } from './pages/producto/registrar/registrar.component';
import { RegistrarUsuarioComponent } from './pages/Usuario/registrar-usuario/registrar-usuario.component';
import { ListarUsuarioComponent } from './pages/Usuario/listar-usuario/listar-usuario.component';
import { RegistroVentaComponent } from './pages/Ventas/registro-venta/registro-venta.component';
import { RegistroCompraComponent } from './pages/Compras/registro-compra/registro-compra.component';
import { ListadoCompraComponent } from './pages/Compras/listado-compra/listado-compra.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPermissionsModule } from "ngx-permissions";
import { ListarVentaComponent } from './pages/Ventas/listar-venta/listar-venta.component';
import { LoginComponent } from './pages/login/login.component';
import { InterceptorService } from "./Service/Interceptor/interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ListarComponent,
    RegistrarComponent,
    RegistrarUsuarioComponent,
    ListarUsuarioComponent,
    RegistroVentaComponent,
    RegistroCompraComponent,
    ListadoCompraComponent,
    ListarVentaComponent,
    LoginComponent,
  ],
  imports: [
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    ComponentModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot()


  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
