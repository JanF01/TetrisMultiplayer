import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from './models/User';
import { UserService } from './user.service';

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


export interface TokenPayload{
  id: number
  login: string
  email: string
  nickname: string
  rank: string
  level: number
  experience: string
  money: number
  exp: number;
  iat: number;
}

@Injectable()
export class VerificationService {

  private token: string;
  baseUrl: string = 'http://localhost:8080/tetris/api';
  public userDetails: User = {} as any;


  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  private saveToken(token: string): void{
      window.localStorage.setItem("userToken", token);
  }

  private getToken(): string{
      this.token = localStorage.getItem("userToken");
      return this.token;
  }


  public getUserDetails(): TokenPayload{
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);

      let user = JSON.parse(payload);

      this.userDetails = new User(user.login,user.nickname,user.rank,user.level,user.experience,user.money);
      this.userService.saveDetails(this.userDetails);

      return user;
    }
    else{
      return null;
    }
  }


  public register(login: string, pass: string, email: string, nickname: string): Observable<any>{
    const base = this.http.post(`${this.baseUrl}/register`,{
      username: login,
      pass: pass,
      email: email,
      nickname: nickname
    })
    
    const request = base.pipe(
      map((data: any) =>{
        if(data.token){
          this.saveToken(data.token)
        }
        return data;
      })
    )

    return request;

  }

  public login(login: string, pass: string ): Observable<any>{
    const base = this.http.post(`${this.baseUrl}/login`,{
      username: login,
      pass: pass
    })

    const request = base.pipe(
      map((data: any) => {
         if(data.token){
          this.saveToken(data.token)
        }
        return data;
      }
    ));

    return request
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if(user) {
      return user.exp > Date.now() / 1000;
    }
    else{
      return false;
    }
  }

  public logout(): void{
    this.token = "";
    localStorage.removeItem("userToken");
      this.router.navigateByUrl("/");
  }
}
