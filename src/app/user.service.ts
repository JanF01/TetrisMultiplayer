import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GuardService } from './guard.service';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public details: Subject<any> = new Subject<any>();
  private userDetails: User 
  public userAbilities: Subject<Object> = new Subject<Object>();
  private abs: any;

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

  
  cookieObservable: Subject<any> = new Subject<any>();
  cookie = {
    keyOne: 'N',
    keyTwo: 'M',
    keyThree: 'B',
    background: 'Base',
    theme: 'White'
  }

  private baseUrl: string =  'http://localhost/tetris/api'

  constructor(private cookies: CookieService, private http: HttpClient) { }


  checkIfLogged(){
    return (this.userDetails.level!=undefined);
  }


  getExpPercentage(): number{
     return Math.round((this.userDetails.experience/this.nextLevel[this.userDetails.level])*100);
  }

  getDetails(){
    if(this.checkIfLogged()){
      this.details.next(this.userDetails);
    }
  }

  refreshCookies(){
    if(this.cookies.check("skip")){
      this.cookie.keyOne = this.cookies.get("skip");
    }else{
      this.cookies.set("skip","N",365);
      this.cookie.keyOne = this.cookies.get("skip");
    }

    if(this.cookies.check("save")){
      this.cookie.keyTwo = this.cookies.get("save");
    }else{
      this.cookies.set("save","M",365);
      this.cookie.keyTwo = this.cookies.get("save");
    }

    if(this.cookies.check("destroy")){
      this.cookie.keyThree = this.cookies.get("destroy");
    }else{
      this.cookies.set("destroy","B",365);
      this.cookie.keyThree = this.cookies.get("destroy");
    }

    if(this.cookies.check("background")){
      this.cookie.background = this.cookies.get("background");
    }else{
      this.cookies.set("background","Base",365);
      this.cookie.background = this.cookies.get("background");
    }

    if(this.cookies.check("theme")){
      this.cookie.theme = this.cookies.get("theme");
    }else{
      this.cookies.set("theme","White",365);
      this.cookie.theme = this.cookies.get("theme");
    }

    this.cookieObservable.next(this.cookie);
  }

  saveDetails(userDetails: User){
    this.userDetails = userDetails;
  }

  checkIfHasMoney(target: number){
      return this.userDetails.money>=target;
  }


  buyAbility(ability: string, price: number): Observable<any>{
     const base = this.http.post(`${this.baseUrl}/buy_ability`,{
       'ability': ability,
       'user_id': this.userDetails.id
     })

     const request = base.pipe(
       map((res)=>{
         if(res=="Dodano"){
          switch(ability){
            case "SKIP":
              this.abs.skip++;
            break;
            case "SAVE AND SKIP":
              this.abs.save++;
            break;
            case "DESTROY":
              this.abs.destroy++;
            break;
        }
        this.userDetails.money-=price;
           this.userAbilities.next(this.abs);
           this.details.next(this.userDetails);
           return "Sukces";
         }
         else{
           return "Błąd";
         }
       })
     )

     return request;
  }

  getUserAbilities(): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const base = this.http.get(`${this.baseUrl}/get_user_abilities?user_id=`+this.userDetails.id,{headers:headers});

    const request = base.pipe(
      map((res: any)=>{
        if(res!="Błąd"){
          this.abs =  {
            skip:0,
            save: 0,
            destroy:0,
        };

        for(let i=0;i<res.length;i++){
          switch(res[i].ability){
              case "SKIP":
                this.abs.skip=parseInt(res[i].amount);
              break;
              case "SAVE AND SKIP":
                this.abs.save=parseInt(res[i].amount);
              break;
              case "DESTROY":
                this.abs.destroy=parseInt(res[i].amount);
              break;
          }
        }


          this.userAbilities.next(this.abs);

          return "Sukces";
        }
        else{
          return "Błąd";
        }
      })
    )

    return request;
  }



}
