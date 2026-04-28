import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  imports: [],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail implements OnInit {
  protected readonly route = inject(ActivatedRoute);
  protected readonly orderId = signal<string|undefined>(undefined);
  protected readonly orderDetail = signal<{
  orderId: string,
  recipes: {
    title: string
    description: string
    price: number
  }[]
}| undefined>(undefined);
  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    // this.orderId.set(id);
    const orderDetail = this.route.snapshot.data['orderDetail'];
    this.orderDetail.set(orderDetail);
  }
}
