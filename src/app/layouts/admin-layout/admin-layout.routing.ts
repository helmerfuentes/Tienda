import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { ListarComponent } from 'app/pages/producto/listar/listar.component';
import { RegistrarComponent } from 'app/pages/producto/registrar/registrar.component';
import { ListadoCompraComponent } from '../../pages/Compras/listado-compra/listado-compra.component';
import { RegistroCompraComponent } from '../../pages/Compras/registro-compra/registro-compra.component';
import { ListarVentaComponent } from '../../pages/Ventas/listar-venta/listar-venta.component';
import { ListarUsuarioComponent } from '../../pages/Usuario/listar-usuario/listar-usuario.component';
import { RegistrarUsuarioComponent } from '../../pages/Usuario/registrar-usuario/registrar-usuario.component';
import { RegistroVentaComponent } from '../../pages/Ventas/registro-venta/registro-venta.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent},

  { path: 'Productos', component: ListarComponent, },
  { path: 'RegistrarProducto/:id', component: RegistrarComponent,
  canActivate:[NgxPermissionsGuard],
    data:{
      permissions: {
        only: ['LIDER'],
        redirectTo: '/dashboard'

      }
    }
  },
  { path: 'Compras', component: ListadoCompraComponent,
  canActivate:[NgxPermissionsGuard],
  data:{
    permissions: {
      only: ['LIDER'],
      redirectTo: '/dashboard'

    }
  } },
  { path: 'Ventas', component: ListarVentaComponent,
  canActivate:[NgxPermissionsGuard],
  data:{
    permissions: {
      only: ['VENTAS'],
      redirectTo: '/dashboard'

    }
  } },
  { path: 'RegistrarCompra', component: RegistroCompraComponent,
  canActivate:[NgxPermissionsGuard],
  data:{
    permissions: {
      only: ['LIDER'],
      redirectTo: '/dashboard'

    }
  }},
  { path: 'RegistrarVenta', component: RegistroVentaComponent,
  canActivate:[NgxPermissionsGuard],
  data:{
    permissions: {
      only: ['VENTAS'],
      redirectTo: '/dashboard'

    }
  } },
  { path: 'Usuarios', component: ListarUsuarioComponent,
  canActivate:[NgxPermissionsGuard],
  data:{
    permissions: {
      only: ['LIDER'],
      redirectTo: '/dashboard'

    }
  } },
  { path: 'RegistrarUsuarios/:id', component: RegistrarUsuarioComponent,
  canActivate:[NgxPermissionsGuard],
  data:{
    permissions: {
      only: ['LIDER'],
      redirectTo: '/dashboard'

    }
  } },
];
