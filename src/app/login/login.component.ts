import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faKey,faHatWizard } from '@fortawesome/free-solid-svg-icons';
import { VerificationService } from '../verification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faKey = faKey
  faHatWizard = faHatWizard
  alert: string = ''
  login: string = ''
  password: string = ''

  
  constructor(private verificationService: VerificationService, private router: Router) { }

  ngOnInit(): void {
  }
  
  checkLogin() {
    this.verificationService.login(this.login,this.password).subscribe((res)=>{
        if(res.token){
        this.router.navigateByUrl("/panel");
        }
    },
    err=>{
      this.alert = err.error.text
    })

  }

}
