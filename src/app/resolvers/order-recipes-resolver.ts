import { ResolveFn } from '@angular/router';
import { OrderService } from '../services/order-service/order-service';
import { inject } from '@angular/core';

export const orderDetailResolver: ResolveFn<{
  orderId: string,
  recipes: {
    title: string
    description: string
    price: number
  }[]
}> = (route, state) => {
  const service = inject(OrderService);
  return service.getOrderById(route.params['id']);
};
