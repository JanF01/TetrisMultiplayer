import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faKey,faHatWizard } from '@fortawesome/free-solid-svg-icons';
import { DataPayload, VerificationService } from '../verification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faKey = faKey
  faHatWizard = faHatWizard
  alert: string = ''

  credentials: DataPayload = {
    id: 0,
    login: '',
    email: '',
    password: ''
  }

  constructor(private verificationService: VerificationService, private router: Router) { }

  ngOnInit(): void {
  }
  
  checkLogin() {
    this.verificationService.login(this.credentials).subscribe((res)=>{
        if(res.token){
        this.router.navigateByUrl("/(main:dashboard)")
        }else{
          console.log("error")
        }
      
    },
    err=>{
      this.alert = err.error.text
    })

  }

}
