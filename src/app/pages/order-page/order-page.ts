import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service/api-service';

@Component({
  selector: 'app-order-page',
  imports: [],
  templateUrl: './order-page.html',
  styleUrl: './order-page.css',
})
export class OrderPage implements OnInit {
  protected readonly categories = inject(ApiService).categories;
  
  
  
  //protected readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    //const params = this.route.snapshot.queryParams;
    console.log(this.categories);
  }
}
