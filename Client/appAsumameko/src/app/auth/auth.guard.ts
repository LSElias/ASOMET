import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import {
  NotificacionService,
  TipoMessage,
} from '../shared/notification.service';

export class UserGuard {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  noti: NotificacionService = inject(NotificacionService);

  auth: boolean = false;
  user: any;

  constructor() {
    this.authService.decodeToken.subscribe((user: any) => {
      this.user = user;
    });

    this.authService.isAuthenticated.subscribe((auth) => {
      this.auth = auth;
    });
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.checkUserLogin(route);
  }

  public checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    if (this.auth) {
      const userRole = this.user._rol.idRol;
      if (
        route.data['rol'] &&
        route.data['rol'].length &&
        !route.data['rol'].includes(userRole)
      ) {
        this.noti.mensajeRedirect(
          'Usuario',
          `Usuario sin permisos para acceder`,
          TipoMessage.warning,
          'noredireccion'
        );
        this.router.navigate(['**']);
        return false;
      }
      return true;
    } else {
      if(!this.authService.isLogin){
        this.router.navigate(['**']);
      }
      return false;
    }
  }
}

export const AuthGuard: CanActivateFn = (route, state) => {
  let userGuard = new UserGuard();
  return userGuard.checkUserLogin(route);
};
