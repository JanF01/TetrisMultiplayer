import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GuardService {

  baseurl: string = 'http://localhost'

  constructor(private http: HttpClient){

   }
   public verifyUser(): Observable<any>{
       return this.http.get(this.baseurl+"/getDetails.php");
   }
}
