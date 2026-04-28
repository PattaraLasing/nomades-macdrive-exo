import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { orderRecipesResolver } from './order-recipes-resolver';

describe('orderRecipesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => orderRecipesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
