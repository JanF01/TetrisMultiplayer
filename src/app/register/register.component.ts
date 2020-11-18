import { Component, OnInit } from '@angular/core';
import { faKey,faHatWizard } from '@fortawesome/free-solid-svg-icons'
import { VerificationService } from "../verification.service";
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
  login: string = ''
  password: string = ''
  email: string = ''

  constructor(private verificationService: VerificationService,private router: Router) { }

  ngOnInit(): void {
  }
  
  logValue(): boolean {

   
    if (this.login.length > 4) {
     return false
    }
    return true


  }
  register() {
    if(!this.logValue()){
   if(this.password==this.passRepeat){
        this.verificationService.register(this.login, this.password).subscribe((res)=>{

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
