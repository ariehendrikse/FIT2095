import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  n:string
  c:number

  fruits:{name:string,calories:number}[] = [];
  deleteUnhealthy():void {this.fruits=this.fruits.filter(fruit=>fruit.calories<=100);}
  addFruit() {this.fruits.push({name:this.n,calories:this.c});}
}