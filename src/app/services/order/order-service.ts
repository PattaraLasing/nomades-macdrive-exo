import { inject, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray, AbstractControl, Validators } from '@angular/forms';
import { minPriceValidator } from '../../validators/min-price.validator';
import { FireService } from '../fire/fire-service';
import { OrderDataInterface, Recipe } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private readonly _fireService = inject(FireService);

  /**
   * Formulaire réactif pour la prise de commande
   * - chaque recette choisie devra être ajouté à un FormArray pour regrouper 
   * les recettes entre elles
   * 
   * Ajouter les validateurs pour la commande :
   * - la commande doit compter au moins une recette
   * - le montant total minimum doit être à 10frs
   */
  public readonly orderForm = new FormGroup({
    createAt: new FormControl(''),
    recipes: new FormArray<AbstractControl<{
      uuid: string;
      title: string;
      price: number;
      count: number;
    }>>([], Validators.compose([
      Validators.required,
      Validators.minLength(1),
      minPriceValidator(10), // custom validator to check if total price is at least 10
    ])),
  });

  /**
     * Ajouter le choix de l'utilisateur dans le formulaire
     * */
  async addRecipe(recipes: Recipe[], recipeUuid: string) {
    const recipe = recipes.find(r => r.uuid === recipeUuid);
    if (!recipe) {
      throw new Error(`Recipe with uuid ${recipeUuid} not found`);
    }

    const recipesFormArray = this.orderForm.get('recipes') as FormArray;
    // have existing recipe in form array, increase count
    const existingRecipeIndex: number = recipesFormArray.controls.findIndex(control => control.value.uuid === recipeUuid);
    if (existingRecipeIndex !== -1) {
      const existingRecipeControl = recipesFormArray.at(existingRecipeIndex) as FormGroup;
      existingRecipeControl.patchValue({
        count: existingRecipeControl.value.count + 1,
      });
    }
    // no existing recipe in form array, add new recipe
    else {
      // add new recipe to form array
      recipesFormArray.push(new FormGroup({
        uuid: new FormControl(recipe.uuid),
        title: new FormControl(recipe.title),
        price: new FormControl(recipe.price),
        count: new FormControl(1),
      }));
    }
  }

  /**
   * * Enregistrer la commande et l'envoyer à Firebase
   * */
  async submitOrder(): Promise<void> {
    this.orderForm.patchValue({
      createAt: new Date().toISOString(),
    });

    if (!this.orderForm.valid) {
      throw new Error('Invalide order value');
    }

    const result = await this._fireService.saveOrder(
      this.orderForm.value as OrderDataInterface
    );

    alert(`Order submitted! Order number is: ${result.id}.`);
    this.orderForm.reset();
    (this.orderForm.get('recipes') as FormArray).clear();
  }

}
