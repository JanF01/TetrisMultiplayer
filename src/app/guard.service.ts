import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VerificationService } from './verification.service';

@Injectable()
export class GuardService {

  public logged: boolean = false;

  constructor(private http: HttpClient, private verify: VerificationService){

   }
   public loggedIn(): any{

    if(this.verify.isLoggedIn()){
      this.logged=true;
        return true;
    }

    this.logged=false;
    return false;
  }

  public logOut(): void{
    this.verify.logout();
    this.logged=false;
    location.reload();
  }

  public updateUserDetails(): void{
    this.verify.updateUserDetails().subscribe();
  }


}
