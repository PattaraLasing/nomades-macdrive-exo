import { Component, computed, inject } from '@angular/core';
import { OrderService } from '../../services/order/order-service';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api-service/api-service';
import { Category } from '../../interfaces/interfaces';
import { CurrencyPipe } from '@angular/common';
import { TotalOrderPipe } from '../../pipes/total-order/total-order-pipe';

@Component({
  selector: 'app-checkout-page',
  imports: [TotalOrderPipe, CurrencyPipe, RouterLink],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
})
export class CheckoutPage {

  //uuid spécifique à la catégorie dessert provenant de l'api
  private readonly DESSERT_UUID: string = '6ad53b55-60c7-5cb9-b546-32df543a4f5d';

  private readonly _router = inject(Router);
  private readonly _orderService = inject(OrderService);
  private readonly _apiService = inject(ApiService);

  public readonly orderForm = this._orderService.orderForm;
  public readonly category = computed<Category | undefined>(() => {
    const categories = this._apiService.categories();
    return categories.find(category => category.uuid === this.DESSERT_UUID);
  });

  async handleAddRecipe(recipeId: string) {
    await this._orderService.addRecipe(this.category()!.recipes, recipeId);
  }

  async handleSubmitOrder() {
    const orderId = await this._orderService.submitOrder();
    await this._router.navigateByUrl(`/succes?id=${orderId}`)
  }
}
