import { Component, OnInit } from '@angular/core';
import { faKey,faHatWizard } from '@fortawesome/free-solid-svg-icons'
import { VerificationService, DataPayload } from "../verification.service";
import { Router } from '@angular/router'
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

  credentials: DataPayload = {

   id:0,
   login: '',
   email: '',
   password: ''

  }

  constructor(private verificationService: VerificationService,private router: Router) { }

  ngOnInit(): void {
  }
  
  logValue(): boolean {

   
    if (this.credentials.login.length > 4) {
     return false
    }
    return true


  }
  register() {
    if(!this.logValue()){
   if(this.credentials.password==this.passRepeat){
        this.verificationService.register(this.credentials).subscribe(()=>{
           this.router.navigateByUrl("/panel");
        },
        err=>{
              console.log(err)
        })
    }else{
      this.alert="Password aren't the same"
    }
  }else{
     this.alert="To short login - minimum length of 5"
   }
  }
}
