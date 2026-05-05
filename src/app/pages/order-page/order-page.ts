import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service/api-service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../../interfaces/interfaces';

@Component({
  selector: 'app-order-page',
  imports: [],
  templateUrl: './order-page.html',
  styleUrl: './order-page.css',
})
export class OrderPage implements OnInit {
  
  protected readonly categories = inject(ApiService).categories;
  
  /**
   * TODO : mettre en place un formulaire réactif pour la prise de commande
   * - chaque recette choisie devra être ajouté à un FormArray pour regrouper 
   * les recettes entre elles
   * 
   * ajouter également les validateurs pour la commande :
   * - la commande doit compter au moins une recette
   * - le montant total minimum doit être à 5frs
   */

  /**
   * Formulaire de commande :
   */
  orderForm = new FormGroup({
    createDate: new FormControl(''),
    recipes: new FormArray([new FormControl()], Validators.minLength(1)),
    totalAmount: new FormControl(0, Validators.min(5)),
  });
  
  //protected readonly route = inject(ActivatedRoute);
  ngOnInit(): void {
    //const params = this.route.snapshot.queryParams;
    console.log(this.categories);
  }

  /**
   * TODO: implement addRecipe function
   * ajouter le choix de l'utilisateur dans le formulaire
   * connecter la méthode sur l'élément html de chaque recette avec
   * un évènement type click
   */
  addRecipe(recipe: Recipe) {
    this.orderForm.setValue({
      createDate: '',
      recipes: [recipe],
      totalAmount: 0
    });
  }

  /**
   * TODO: mettre en place une forction pour identifier
   * la catégorie sélectionnée par l'utilisateur
   * connecter la méthode sur l'élément html de chaque catégorie avec
   * un évènement type click
   * @param $event 
   * @param category 
   */
  selectCategory($event: any, category: any) {
    console.log($event);
    console.log(category);
  }

  /**
   * TODO : créer un pipe pour filtrer les recettes affichées
   * en fonction de la catégorie sélectionnée par l'utilisateur
   * et appliquer le pipe sur la boucle for de html
   * 
   */

  /**
   * TODO PIPES
   * - créer un pipe pour afficher la quantité choisi sur chaque recette
   * - créer un pipe pour afficher le prix total de la commande sur le bouton 'order'
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
