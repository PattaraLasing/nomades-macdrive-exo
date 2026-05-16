import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderDataInterface } from '../../interfaces/interfaces';

@Component({
  selector: 'app-order-detail',
  imports: [RouterLink],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail implements OnInit {

  protected readonly route = inject(ActivatedRoute);
  protected readonly orderId = signal<string | undefined>(undefined);
  protected readonly orderDetail = signal<OrderDataInterface | undefined>(undefined);

  ngOnInit(): void {
    const orderDetail = this.route.snapshot.data['orderDetail'];
    this.orderDetail.set(orderDetail);
  }
}
