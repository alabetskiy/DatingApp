import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../_models/User';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegiser = new EventEmitter();
  user: User;
  registerForm: FormGroup; //Reactive Forms


  constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder, private router:Router) { }

  ngOnInit() {
    this.createRegisterForm();

    //ALTERNATIVE WAY TO VALIDATE A FORM. 
    // this.registerForm = new FormGroup({ //Reactive Forms. Do not forget to inject to app.modules.ts ReactiveFormsModule
    //   username: new FormControl("", Validators.required),
    //   password: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]), //maxLength and minLength must be written ONLY in lowercase in html
    //   confirmPassword: new FormControl("", Validators.required)
    // }, this.passwordMatchValidator)
  }

  //Using FormBuilder is preferably. Shorter syntax. 
  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: ['male'], //because it is a radio button I need to supply some default values...    
        username: ['', Validators.required],
        knownAs: ['', Validators.required],
        dateOfBirth: [null, Validators.required], //because it's date field initiall value will be null
        city: ['', Validators.required],
        country: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.passwordMatchValidator });

  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true }
  }

  register() {
    if (this.registerForm.valid) {
      console.log(this.registerForm);
        this.user = Object.assign({}, this.registerForm.value);
        this.authService.register(this.user).subscribe(()=>{
          this.alertify.success('Registration successful');
        }, error => {
          this.alertify.error(error);
        }, () => {
          this.authService.login(this.user).subscribe(()=> {
            this.router.navigate(['/members']);
          });
        });
    }
  }
    // this.authService.register(this.user).subscribe(() => {
    //   this.alertify.success('Registration successful');
    // }, error => {
    //   console.log(error);

    //   this.alertify.error(error);
    // });

   cancel() {
    this.cancelRegiser.emit(false);
  }
}
