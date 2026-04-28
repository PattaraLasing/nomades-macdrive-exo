import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Category, Database } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  public readonly categories = signal<Category[]>([]);

  private readonly _http = inject(HttpClient);
  private readonly url: string = './resto-data.json';

  constructor() {
    setTimeout(() => {
      this.getRecipes();
    }, 2000);
  }

  async getRecipes(): Promise<Category[]> {
    const request = this._http.get<Database>(this.url);
    const json: Database = await firstValueFrom(request);
    const result = json.data;
    return result;
  }

  async sendOrder(order: any) {
    console.log('Order send to database...', order);
  }

  async getOrderById(id: string) {
    const DATABASE: {
      orderId: string;
      recipes: {
        title: string;
        description: string;
        price: number;
      }[];
    }[] = [
        {
          orderId: '001',
          recipes: [
            {
              title: 'pizza',
              description: 'demo',
              price: 10,
            }
          ]
        },
        {
          orderId: '002',
          recipes: [
            {
              title: 'pasta',
              description: 'demo',
              price: 20,
            }
          ]
        }
      ];
    const order = DATABASE.find(o => o.orderId === id);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }
}
