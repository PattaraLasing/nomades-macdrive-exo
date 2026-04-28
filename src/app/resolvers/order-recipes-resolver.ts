import { ResolveFn } from '@angular/router';

export const orderRecipesResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
