import { RegisterUser } from './../RegisterUser';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterUser = {
    userName: '',
    password: '',
    password2: '',
  };

  public warning!: any;
  public success: boolean = false;
  public loading: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm): void {
    if (f.value.userName !== '' && f.value.password === f.value.password2) {
      this.loading = true;
      this.auth.register(this.registerUser).subscribe(
        (success) => {
          this.success = true;
          this.warning = null;
          this.loading = false;
        },
        (err) => {
          this.warning = err.error.message;
          this.success = false;
          this.loading = false;
        }
      );
    }
    if (f.value.password !== f.value.password2) {
      this.warning = 'Passwords do not match';
      this.success = false;
      this.loading = false;
    }
  }
}
