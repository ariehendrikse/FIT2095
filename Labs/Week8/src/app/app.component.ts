import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data = [];
  make:string;
  model:string;
  bType:string;
  year:number;
  address:string;
  state:string;
  postcode:string='';
  states:string[]=['VIC','NSW','QLD','TAS','WA','ACT','NT','SA'];
  bTypes:string[]=['Bus', 'Coupe', 'Hatch', 'Sedan', 'SUV', 'Van', 'Ute'];
  bTypeView:string;
  shown =[]
  newItem() {
        this.data.push({uid:uuidv4(),
        make:this.make,
        model:this.model,
        bType:this.bType,
        year:this.year,
        address:this.address,
        state:this.state,
        postcode:this.postcode});
      
    }
  deleteOld(){
    console.log(this.data);
    this.data=this.data.filter(item=>item.year>2000)
  }
  numOld(){
    return this.data.filter(item=>item.year<2000).length;
  }
  delete(u:string){
    this.data=this.data.filter(item=>item.uid!=u)
  }
  filterView(){
    return this.bTypeView=='All'? this.data: this.data.filter(item=>item.bType==this.bTypeView);
  }

}