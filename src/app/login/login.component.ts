import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {Login} from '../models/Login';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginToAuthenticate:Login = new Login();
  public login:Login;


  constructor(private _loginService: LoginService, private user: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmitLoginClicked(login): void {
    this._loginService.authenticateLogin(login)
    .subscribe(
      // data => { 
      //   console.log(data);
      //   this.login= data; 
      //           this.loginToAuthenticate = new Login();
      //         },
      // error => console.log(error)
      r => {
        if (r.token) {
          this.user.setToken(r.token);
          this.router.navigateByUrl('/child');
        }
      },
      r => {
        alert("Invalid Username and Password! Please try logging in again.");
      }
    );
  }

  isValidLoginCredentials(id, child): boolean {
    if ( child.email == "santa@np.com"){
      return true;
    }
    return false;
  }

}

