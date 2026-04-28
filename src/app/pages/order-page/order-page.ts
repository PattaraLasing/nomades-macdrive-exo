import { Component, inject, signal } from '@angular/core';
import { OrderService } from '../../services/order-service/order-service';

@Component({
  selector: 'app-order-page',
  imports: [],
  templateUrl: './order-page.html',
  styleUrl: './order-page.css',
})
export class OrderPage {
  protected readonly categories = inject(OrderService).categories;
}
