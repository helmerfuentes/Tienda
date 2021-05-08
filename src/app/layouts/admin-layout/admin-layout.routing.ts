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

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'ListarProducto',      component: ListarComponent },
    { path: 'RegistrarProducto/:id',      component: RegistrarComponent },
    { path: 'ListadoCompras',      component: ListadoCompraComponent },
    { path: 'RegistrarCompra',      component: RegistroCompraComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }
];
