import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/order-page', pathMatch: 'full'},
    { 
        path: 'order-page', 
        loadComponent() { 
            return import('./pages/order-page/order-page').then(m => m.OrderPage);
        }
    }
];