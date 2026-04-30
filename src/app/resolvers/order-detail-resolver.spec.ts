import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';


import { orderDetailResolver } from './order-detail-resolver';

describe('orderDetailResolver', () => {
  const executeResolver: ResolveFn<{
    orderId: string;
    recipes: {
      title: string;
      description: string;
      price: number;
    }[];
  }> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => orderDetailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
