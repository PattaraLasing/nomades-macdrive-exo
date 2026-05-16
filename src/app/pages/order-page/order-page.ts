import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api-service/api-service';
import { FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FireService } from '../../services/fire/fire-service';
import { minPriceValidator } from '../../validators/min-price.validator';
import { TotalItemPipe } from "../../pipes/total-item/total-item-pipe";
import { OrderDataInterface, Recipe } from '../../interfaces/interfaces';
import { TotalOrderPipe } from '../../pipes/total-order/total-order-pipe';
import { OrderService } from '../../services/order/order-service';

@Component({
  selector: 'app-order-page',
  imports: [TotalItemPipe, TotalOrderPipe],
  templateUrl: './order-page.html',
  styleUrl: './order-page.css',
})
export class OrderPage {

  private readonly _orderService = inject(OrderService);

  //protected readonly route = inject(ActivatedRoute);
  protected readonly orderForm = this._orderService.orderForm;

  /**
   * Identifier la catégorie sélectionnée par l'utilisateur
   */
  protected readonly categories = inject(ApiService).categories;
  protected readonly selectedCategoryUuid = signal<string | null>(null);
  protected readonly categorieDisplayed = computed(() => {
    const selectedCategoryUuid = this.selectedCategoryUuid();
    if (selectedCategoryUuid) {
      return this.categories().filter(category => category.uuid === selectedCategoryUuid);
    }
    return this.categories();
  });

  async addRecipe(recipeUuid: string) {
    const recipes = this.categories().flatMap(c => c.recipes);
    await this._orderService.addRecipe(recipes, recipeUuid);
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
