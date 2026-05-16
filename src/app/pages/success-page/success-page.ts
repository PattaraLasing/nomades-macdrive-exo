import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import JSConfetti from 'js-confetti'

@Component({
  selector: 'app-success-page',
  imports: [],
  templateUrl: './success-page.html',
  styleUrl: './success-page.css',
})
export class SuccessPage implements OnInit {

  private readonly _route = inject(ActivatedRoute);
  
  public readonly orderId = signal<string | undefined>(undefined);

  ngOnInit(): void {
    const orderId = this._route.snapshot.queryParams['id'];
    this.orderId.set(orderId);
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();
  }

}
