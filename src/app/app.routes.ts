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
        path: 'checkout',
        loadComponent: () => import('./pages/checkout-page/checkout-page').then(c => c.CheckoutPage)
    },
    {
        path: 'succes',
        loadComponent: () => import('./pages/success-page/success-page').then(c => c.SuccessPage)
    },
    {
        path: 'admin',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/admin-page/admin-page')
                    .then(c => c.AdminPage),
            },
            {
                path: ':id',
                component: OrderDetail,
                resolve: {
                    orderDetail: orderDetailResolver
                }
            }
        ]
    },
    {
        path: '',
        redirectTo: 'order-page',
        pathMatch: 'full'
    },
];