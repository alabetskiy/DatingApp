import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegiser = new EventEmitter();
  model: any = {};
  registerForm: FormGroup; //Reactive Forms

  constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder) { }

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
