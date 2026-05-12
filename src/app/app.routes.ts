import { Routes } from '@angular/router';
import { OrderDetail } from './pages/order-detail/order-detail';
import { OrderPage } from './pages/order-page/order-page';
import { orderDetailResolver } from './resolvers/order-detail-resolver';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: 'order-page',
        component: OrderPage
    },
    {
        path: 'order-detail-page',
        children: [
            {
                path: ':id',
                component: OrderDetail,
                resolve: {
                    orderDetail: orderDetailResolver
                }
            },
            {
                path: '',
                redirectTo: '/order-page',
                pathMatch: 'full',
            }
        ]
    },
    {
        path: 'admin',
        loadComponent: () => import('./pages/admin-page/admin-page')
            .then(c => c.AdminPage),
        canActivate: [authGuard]
        // component: AdminPage
    },
    {
        path: '',
        redirectTo: 'order-page',
        pathMatch: 'full'
    },
];