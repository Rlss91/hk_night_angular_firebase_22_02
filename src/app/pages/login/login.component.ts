import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import FirebaseAuthData from 'src/app/model/FirebaseAuthData.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private auth: AuthService, private router: Router) {
    this.email = '';
    this.password = '';
  }

  ngOnInit(): void {}

  handleLogin(): void {
    this.auth
      .login(this.email, this.password)
      .subscribe((data: FirebaseAuthData) => {
        console.log(data);
        if (data.idToken) {
          this.router.navigate(['dashboard']);
        }
      });
  }
}
