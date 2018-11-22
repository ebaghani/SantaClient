import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';
import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
export class NeedAuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
    console.log('inside constructor for NeedAuthGuard');
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
