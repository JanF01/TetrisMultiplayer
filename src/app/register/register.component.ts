import { Component, OnInit } from '@angular/core';
import { faKey,faHatWizard } from '@fortawesome/free-solid-svg-icons'
import { VerificationService } from "../verification.service";
import { Router } from '@angular/router'
import { FormControl, Validators } from '@angular/forms';
import { GuardService } from '../guard.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  passRepeat: string
  alert: string = ""



  faKey = faKey
  faHatWizard = faHatWizard
  login: string = ''
  password: string = ''
  email: string = ''
  nickname: string = ''

  emailValidator = new FormControl('',[
    Validators.email
  ]);

  constructor(private verificationService: VerificationService,private router: Router, private guard: GuardService) { }

  ngOnInit(): void {
  }
  
  logValue(): boolean {

   
    if (this.login.length > 4) {
     return false
    }
    return true


  }


  register(): void {
    if(!this.logValue()){
    if(this.password.length<6){
      this.alert="Your password needs to be at least 6 characters long";
      return;
    }  
   if(this.password!=this.passRepeat){
    this.alert="Passwords do not match"
    return;
    }
    if(this.nickname.length<2){
      this.alert="Your nickname needs to be at least 2 characters long";
      return;
    }
    if(this.emailValidator.invalid && this.email.length>0){
      this.alert="The email is invalid - You can choose to not use an e-mail"
      return;
    }
    this.verificationService.register(this.login, this.password, this.email, this.nickname).subscribe((res)=>{
     if(res.token){
       setTimeout(()=>{
         this.guard.loggedIn();
         location.reload();
       },60);
     }else{
      this.alert=res;
     }
   },
   err=>{
         console.log(err)
   })
  }else{
     this.alert="To short login - minimum length of 5"
   }
  }
}
