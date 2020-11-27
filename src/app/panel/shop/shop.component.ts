import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AdministrationService } from 'src/app/administration.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @Input() level: string

  abilities: Array<any>
  cookie = {
    keyOne: 'N',
    keyTwo: 'M',
    keyThree: 'B'
  }

  constructor(private admin: AdministrationService, private cookies: CookieService) { }

  ngOnInit(): void {
    this.admin.getAbilities().subscribe((res)=>{
          this.abilities = res;
    });

    if(this.cookies.check("skip")){
      this.cookie.keyOne = this.cookies.get("skip");
    }else{
      this.cookies.set("skip","N",365);
    }

    if(this.cookies.check("save")){
      this.cookie.keyThree = this.cookies.get("save");
    }else{
      this.cookies.set("save","M",365);
    }

    if(this.cookies.check("destroy")){
      this.cookie.keyThree = this.cookies.get("destroy");
    }else{
      this.cookies.set("destroy","B",365);
    }


  }

}
