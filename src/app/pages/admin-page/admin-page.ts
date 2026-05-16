import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FireService } from '../../services/fire/fire-service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { TotalOrderPipe } from '../../pipes/total-order/total-order-pipe';

@Component({
  selector: 'app-admin-page',
  imports: [RouterLink, AsyncPipe, TotalOrderPipe, CurrencyPipe],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage {

  private readonly _fireServie = inject(FireService);
  public readonly orders$ = this._fireServie.loadOrder();
}
