import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChildComponent } from './child/child.component';
import { LoginComponent } from './login/login.component';
import {NeedAuthenticationGuard} from './NeedAuthenticationGuard';

const routes: Routes = [
  {path: 'child',
   component: ChildComponent, 
  canActivate: [NeedAuthenticationGuard] // <---- connected Route with guard
  },
  {path: 'login', component: LoginComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes);
