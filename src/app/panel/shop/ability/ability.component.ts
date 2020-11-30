import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.scss']
})
export class AbilityComponent implements OnInit {

  @Input() title: string
  @Input() key: string
  @Input() image: string
  @Input() theme: string
  @Input() price: number
  @Input() unlock: number
  @Input() level: number

  alert: string = '';


  constructor(private user: UserService) { }

  ngOnInit(): void {
  }


  buyAbility(){
    if(this.user.checkIfHasMoney(this.price)){
      console.log("s");
         this.user.buyAbility(this.title, this.price).subscribe((res)=>{
            this.alert = (res=="Sukces") ? "The ability has been bough" : "The buying process malfunctioned";
         })
    }else{
      this.alert = "Not enough $$$";
      console.log("s");
    }
  }

}
