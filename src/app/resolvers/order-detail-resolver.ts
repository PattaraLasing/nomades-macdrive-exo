import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { OrderDataInterface } from '../interfaces/interfaces';
import { FireService } from '../services/fire/fire-service';

export const orderDetailResolver: ResolveFn<OrderDataInterface> = (route, state) => {
  const fireService = inject(FireService);
  const id = route.params['id'];
  return fireService.getOrderById(id);
};
