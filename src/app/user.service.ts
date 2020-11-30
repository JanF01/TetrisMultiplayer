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

  backToPanel: boolean = false;

  private nextLevel: Array<number> = [
    80,
    250,
    800,
    1900,
    3000,
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

  private rankup: Array<number> = [
    800,
    2300,
    4800,
    9000,
    15000,
    25000,
    30000,
    40000
  ]

  private ranks: Array<string> = [
    'em1',
    'em2',
    'em3',
    'dm1',
    'dm2',
    'dm3',
    'gd1',
    'gd2',
    'gd3',
  ]

  
  cookieObservable: Subject<any> = new Subject<any>();
  cookie = {
    keyOne: 'N',
    keyTwo: 'M',
    keyThree: 'B',
    background: 'Base',
    theme: 'White'
  }


  constructor(private cookies: CookieService, private http: HttpClient) { }


  checkIfLogged(){
    return (this.userDetails.level!=undefined);
  }

  alreadyChangedLvl:boolean = false;

  getUserLevel(expNow: number,levelUp: number,expGotten: number): number{
    if(!this.alreadyChangedLvl){
      this.alreadyChangedLvl=true;
    if((Number)(expNow)+(Number)(expGotten)>=(Number)(levelUp)){
      this.userDetails.level++;
      this.userDetails.experience=(Number)(expGotten)-((Number)(levelUp)-(Number)(expNow));
    }else{
      this.userDetails.experience=(Number)(this.userDetails.experience)+(Number)(expGotten);
    }
    this.details.next(this.userDetails);
    setTimeout(()=>{
      this.alreadyChangedLvl=false;
    },2000);
    return this.userDetails.level;
  }
  return this.userDetails.level;
  }


  alreadyChangedMoney:boolean = false;

  moneyChange(amount: number){

    if(!this.alreadyChangedMoney){
      this.alreadyChangedMoney=true;
      this.userDetails.money=(Number)(this.userDetails.money)+(Number)(amount);
      console.log(this.userDetails.money);
      setTimeout(()=>{
        this.alreadyChangedMoney=false;
      },2000);
    }

  }


  getUserExp(){
    return this.userDetails.experience;
  }

  getNextLevelExp(){
    return this.nextLevel[this.userDetails.level];
  }

  getExpPercentage(): number{
     return Math.round((((Number)(this.userDetails.experience)-(Number)(this.nextLevel[this.userDetails.level-1]))/(Number)(this.nextLevel[this.userDetails.level])-(Number)(this.nextLevel[this.userDetails.level-1]))*100);
  }

  getAbilities(){
    if(this.checkIfLogged()){
      this.userAbilities.next(this.abs);
    }
  }

  checkIfRankUp(pp: number){
    let index = this.ranks.indexOf(this.userDetails.rank);
    if(pp>=this.rankup[index]){
      this.userDetails.rank=this.ranks[index+1];
    }
    this.updateUser().subscribe();;
  }

  changeNickname(nickname){
    this.userDetails.nickname = nickname;
    console.log(nickname);
    this.updateUser().subscribe();
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
    this.getDetails();
  }

  checkIfHasMoney(target: number){
      return this.userDetails.money>=target;
  }


  buyAbility(ability: string, price: number): Observable<any>{
     const base = this.http.post(`api/buy_ability`,{
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


  useAbility(ability: string): Observable<any>{

    let ability_id = 0;

    switch(ability){
       case 'skip': ability_id=1;
       break;
       case 'save': ability_id=2;
       break;
       case 'destroy': ability_id=3;
       break;
    }

    const base = this.http.post(`api/use_ability`,{
      'ability': ability_id,
      'user_id': this.userDetails.id
    })

    const request = base.pipe(
      map((res)=>{
         this.abs[ability]--;
         this.userAbilities.next(this.abs);
      })
    )

    return request;


  }

  getUserAbilities(): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const base = this.http.get(`api/get_user_abilities?user_id=`+this.userDetails.id,{headers:headers});

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

  updateUser(): Observable<any>{
    const base = this.http.post(`api/update_user`,{
      'user_id': this.userDetails.id,
      'level': this.userDetails.level,
      'exp': this.userDetails.experience,
      'rank': this.userDetails.rank,
      'nickname': this.userDetails.nickname,
      'money': this.userDetails.money,
    })

    const request = base.pipe(
      map((res)=>{
        return res;
      })
    )

    return request;
  }

  alreadySent: boolean = false;

  saveGameIfBetter(score: number): Observable<any>{

    if(!this.alreadySent){

      this.alreadySent=true;
    const base = this.http.post(`api/save_best_games`,{
      'user_id': this.userDetails.id,
      'score': score,
    })

    const request = base.pipe(
      map((res: any)=>{
        setTimeout(()=>{
          this.alreadySent=false;
         },2000);

        if(res=="No improvement" || res=="Błąd"){
          this.updateUser().subscribe();
          return "NO PERFORMANCE IMPROVEMENT";
        }else{
          this.checkIfRankUp(res.new_pp);
          return res;
        }
      })
    )

    return request;

    }
  }



}
