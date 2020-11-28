import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AdministrationService } from 'src/app/administration.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @Input() level: number
  @Input() keyOne: string
  @Input() keyTwo: string
  @Input() keyThree: string
  @Input() theme: string

  abilities: Array<any> = [] as any;



  constructor(private admin: AdministrationService, private cookies: CookieService) { }

  ngOnInit(): void {
    this.admin.getAbilities().subscribe((res)=>{
          this.abilities = res;
    });



  }


}
