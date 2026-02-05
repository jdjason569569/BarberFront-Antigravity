import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Supabase } from '../services/supabase';

export const authGuard: CanActivateFn = (route, state) => {
  const supabase = inject(Supabase);
  const router = inject(Router);

  if (supabase.user) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
