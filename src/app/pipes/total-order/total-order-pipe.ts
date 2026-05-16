import { Pipe, PipeTransform } from '@angular/core';
import { OrderDataInterface } from '../../services/fire/fire-service';

@Pipe({
  name: 'totalOrder',
})
export class TotalOrderPipe implements PipeTransform {

  //Pipe pour afficher le prix total de la commande sur le bouton 'order'
  transform(order: Partial<OrderDataInterface>): number {
    const recipes = order.recipes || [];
    return recipes.reduce((p, o) => {
      return p + (o.count * o.price);
    }, 0) / 100; //formater le prix à afficher
  }

  /**
   * Donc ce pipe fait deux choses : afficher le prix total et formater le prix
   * 
   * Si on veux être plus pointilleux, on fera deux pipes pour 
   * ces deux actions distinctes
   */
}
