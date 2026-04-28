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
}
