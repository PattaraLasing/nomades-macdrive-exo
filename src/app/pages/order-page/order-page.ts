import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api-service/api-service';
import { FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FireService, OrderDataInterface } from '../../services/fire/fire-service';
import { minPriceValidator } from '../../validators/min-price.validator';
import { TotalItemPipe } from "../../pipes/total-item/total-item-pipe";
import { Recipe } from '../../interfaces/interfaces';
import { TotalOrderPipe } from '../../pipes/total-order/total-order-pipe';

@Component({
  selector: 'app-order-page',
  imports: [TotalItemPipe, TotalOrderPipe],
  templateUrl: './order-page.html',
  styleUrl: './order-page.css',
})
export class OrderPage implements OnInit {

  private readonly _fireService = inject(FireService);

  protected readonly categories = inject(ApiService).categories;
  protected readonly route = inject(ActivatedRoute);

  /**
   * Identifier la catégorie sélectionnée par l'utilisateur
   */
  protected readonly selectedCategoryUuid = signal<string | null>(null);
  protected readonly categorieDisplayed = computed(() => {
    const selectedCategoryUuid = this.selectedCategoryUuid();
    if (selectedCategoryUuid) {
      return this.categories().filter(category => category.uuid === selectedCategoryUuid);
    }
    return this.categories();
  });


  /**
   * Formulaire réactif pour la prise de commande
   * - chaque recette choisie devra être ajouté à un FormArray pour regrouper 
   * les recettes entre elles
   * 
   * Ajouter les validateurs pour la commande :
   * - la commande doit compter au moins une recette
   * - le montant total minimum doit être à 10frs
   */
  protected readonly orderForm = new FormGroup({
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

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
  }

  /**
   * Ajouter le choix de l'utilisateur dans le formulaire
   * - connecter la méthode sur l'élément html de chaque recette avec un évènement type click
   */
  async addRecipe(recipeUuid: string): Promise<void> {
    const recipe: Recipe | undefined = this.categories().flatMap(category => category.recipes).find(r => r.uuid === recipeUuid);
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
   * Enregistrer la commande et l'envoyer à Firebase
   */
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


  /**
   * TODO PIPES
   * - créer un pipe pour formater le prix de chaque recette (diviser le prix par 100)
   * - utiliser les pipes créer ainsi que le 'currencyPipe' de Angular pour 
   * mettre en forme l'affichage des prix dans le html
   */

  /**
   * TODO : afficher une notification lorsque l'utilisateur ajoute un choix de recette
   */

  /**
   * TODO : afficher une confirmation avec le prix total avant la validation et l'envois de la commande
   */

  /**
   * TODO : afficher un message avec le Toast si le formulaire de commande
   * n'est pas valide (utiliser les validators angular)
   */

  /**
   * TODO : créer une directive angular pour la détection des touchevents
   * - implémenter les évènements touchmove, touchstart, et touchend
   * pour identifier les shortpress et longpress events de l'utilisateur.
   * s'aider de l'utilitaire @HostListener() de angular
   * - la directive doit être capable d'émettre un évènement shortpress et longpress
   */

  /**
   * TODO : ajouter la gestion du click avec la souris sur la directive et retirer
   * les events click de html du component au profit de la directive
   * - implémenter l'event longpress pour retirer une recette du formulaire
   */

  /**
   * TODO : déployer le projet sur firebase hosting ou github page
   * (et j'aurai un projet de plus sur mon portfolio :D )
   */


  //------------------- BONUS ------------------

  /**
   * TODO : 
   * - implémenter le système de paiement avec une api comme Stripe
   * - implémenter un service avec firebase pour la sauvegard de la 
   * commande dans une base de données hébergé dans le cloud
   * - mettre en place un service de détection des divers périphériques 
   * (paiement, impression ou scan qr code --> donc à voir spec du device)
   * - mettre ce projet sur mon github en open source et présenter le
   * à la prochaine occasion :D 
   */

  //-------------------- documentation ------------------
  /**
   * TODO : générer la documentation avec compodoc
  */
}
