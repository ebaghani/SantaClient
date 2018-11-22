import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from './services/user.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';


@Injectable()
export class NeedAuthenticationGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
    console.log('inside constructor for NeedAuthenticationGuard');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const redirectUrl = route['_routerState']['url'];

    if (this.userService.isLogged()) {
      console.log('reached inside userService.isLogged');
      return true;
    }

    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/login'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );

    return false;
  }
}
