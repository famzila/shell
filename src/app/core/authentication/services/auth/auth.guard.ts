import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

export function AuthGuard(): CanActivateFn {
    return () => {
      const authService = inject(AuthService);
      const route = inject(ActivatedRouteSnapshot);
      const state = inject(RouterStateSnapshot);
  
      authService
        .isAccessAllowed(route, state)
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          console.log('error: ', error);
          return false;
        });
      return false;
    };
  }
  