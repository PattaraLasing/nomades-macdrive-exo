import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isAdmin = Boolean(localStorage.getItem('isAdmin'));
  if (!isAdmin) {
    throw new Error('only available for Admin User');
  }
  return isAdmin;
};
