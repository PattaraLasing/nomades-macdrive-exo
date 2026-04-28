import { Component, inject, signal } from '@angular/core';
import { OrderService } from '../../services/order-service/order-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-page',
  imports: [],
  templateUrl: './order-page.html',
  styleUrl: './order-page.css',
})
export class OrderPage {
  protected readonly categories = inject(OrderService).categories;
  protected readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    console.log(params);
  }
}
