import { Injectable } from '@angular/core';
import { GuardService } from './guard.service';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userDetails: User 

  private nextLevel: Array<number> = [
    180,
    490,
    1020,
    3011,
    3998,
    6000,
    7920,
    10500,
    14200,
    19040,
    29312,
    34000,
    41030,
    49000,
    59000,
    68000,
    98300,
    115000,
    178000,
    267000,
    398000,
    645000,
    1000000,
    1324000,
    1760000,
    2673400,
    3102000,
    3980000,
    4570000,
    5673400,
    7560000
  ]

  constructor() { }


  checkIfLogged(){
    return (this.userDetails.level!=undefined);
  }


  getExpPercentage(): number{
     return Math.round((this.userDetails.experience/this.nextLevel[this.userDetails.level])*100);
  }

  getDetails(){
    if(this.checkIfLogged()){
      return this.userDetails;
    }
  }

  saveDetails(userDetails: User){
    this.userDetails = userDetails;
  }
}
