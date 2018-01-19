import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegiser = new EventEmitter();
  registerForm: FormGroup; //Reactive Forms

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    console.log(this.registerForm);
    this.registerForm = new FormGroup({ //Reactive Forms. Do not forget to inject to app.modules.ts ReactiveFormsModule
      username: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]), //maxLength and minLength must be written ONLY in lowercase in html
      confirmPassword: new FormControl("", Validators.required)
    }, this.passwordMatchValidator)

    
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true }
  }

  register() {
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertify.success('Registration successful');
    // }, error => {
    //   console.log(error);

    //   this.alertify.error(error);
    // });

    console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegiser.emit(false);
  }
}
