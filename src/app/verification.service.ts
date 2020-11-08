import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

export interface UserDetails {

  id: number
  login: string
  email: string
  nickname: string
  rank: string
  level: number
  experience: string
  money: number

}

export interface DataPayload{
  id: number
  login: string
  email: string
  password: string
}

@Injectable()
export class VerificationService {


  baseurl: string = 'http://localhost'

  constructor(private http: HttpClient, private router: Router) { }


  public register(user: DataPayload): Observable<any>{
    const base = this.http.post(this.baseurl+"/tetris/register.php",user)
    
    const request = base.pipe(
      map((data:string) =>{
        if(data){
          const res = JSON.parse(data);
          if(res=="User taken"){
            return "User has been taken"
          }
          else if(res=="Password too weak"){
            return "Password is too weak"
          }
          else{
            return res;
          }
        }
      })
    )

    return request;

  }

  public login(user: DataPayload): Observable<any>{
    const base = this.http.post(this.baseurl+"/tetris/login.php",user)

    const request = base.pipe(
      map((data:string) =>{
        if(data){
          const res = JSON.parse(data);
          if(res=="No user"){
           return "No user with this login"
          }
          else if(res=="Wrong password"){
           return "Wrong password"
          }
          else{
          return res;
          }
        }
      })
    )

    return request
  }

  public logout(): void{
      this.http.get(this.baseurl+"/logout.php");
      this.router.navigateByUrl("/");
  }
}
