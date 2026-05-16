import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../../interfaces/interfaces';

@Pipe({
  name: 'totalItem',
})
export class TotalItemPipe implements PipeTransform {

  /**
   * Pipe pour afficher la quantité choisie sur chaque recette
   */
  transform(value: Recipe, order: Partial<{ recipes: { count: number; uuid: string }[] }>): number {
    const recipes = order?.recipes ?? [];
    const recipeInOrder = recipes.find((r) => r.uuid === value.uuid);
    return recipeInOrder ? recipeInOrder.count : 0;
  }
}
