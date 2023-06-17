import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  constructor(private http: HttpClient, private notifyService : NotificationService) { }

  ngOnInit(): void {
    
  }

  profileForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl()
  });

  firstNameVal = true;
  lastNameVal = true;
  emailVal = true;
  passwordVal = true;
  passwordCharVal = true;
  confirmPasswordVal = true;
  passwordMatchVal = true;

  onSubmit() {   
    let formVal = true;
    this.firstNameVal = true;
    this.lastNameVal = true;
    this.emailVal = true;
    this.passwordVal = true;
    this.confirmPasswordVal = true;
    
    if(this.profileForm.value.firstName == null){
      formVal = false;
      this.firstNameVal = false;
    }
    if(this.profileForm.value.lastName == null){
      formVal = false;
      this.lastNameVal = false;
    }
    if(this.profileForm.value.email == null){
      formVal = false;
      this.emailVal = false;
    }
    if(this.profileForm.value.password == null){
      formVal = false;
      this.passwordVal = false;
    }
    if(this.profileForm.value.confirmPassword == null){
      formVal = false;
      this.confirmPasswordVal = false;
    }
    if(formVal && this.passwordCharVal && this.passwordMatchVal){
      this.http.post<any>('https://localhost:7192/SPA', this.profileForm.value).subscribe(data => {
        this.notifyService.showSuccess("User registered sucessfully.", "Success")
      },
      error => {
        this.notifyService.showError(error.error.errorMessage, "Error");
      }
      );
    }
  }

  checkNull(e : any){
    if(e.target.id == 'firstName'){
      this.firstNameVal = true;
    }
    else if(e.target.id == 'lastName'){
      this.lastNameVal = true;
    }
    else if(e.target.id == 'email'){
      this.emailVal = true;
    }
    else if(e.target.id == 'password'){
      this.passwordVal = true;
      this.checkPasswordValidation(e.target.value);
    }
    else if(e.target.id == 'confirmPassword'){
      this.confirmPasswordVal = true;
      this.checkPasswordMatch(e.target.value);
    }
  }

  checkPasswordValidation(password: string){
    this.passwordCharVal = true;
    if(password.length < 8 || password.length > 16 || !(/(?:[^`!@#$%^&*\-_=+'\/.,]*[`!@#$%^&*\-_=+'\/.,]){2}/.test(password))){
      this.passwordCharVal = false;
    }
  }

  checkPasswordMatch(password: string){
    this.passwordMatchVal = true;
    if(this.profileForm.value.password != password){
      this.passwordMatchVal = false;
    }
  }
}
