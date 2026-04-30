import { ResolveFn } from '@angular/router';
import { ApiService } from '../services/api-service/api-service';
import { inject } from '@angular/core';

export const orderDetailResolver: ResolveFn<{
  orderId: string,
  recipes: {
    title: string
    description: string
    price: number
  }[]
}> = (route, state) => {
  const service = inject(ApiService);
  return service.getOrderById(route.params['id']);
};
