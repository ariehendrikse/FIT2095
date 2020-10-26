import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-addmovietoactor',
  templateUrl: './addmovietoactor.component.html',
  styleUrls: ['./addmovietoactor.component.css']
})
export class AddmovietoactorComponent implements OnInit {

  moviesDB: any[] =[];
  actorsDB: any[] =[];
  movieId: string='';
  actorId: string='';


  constructor(private dbService: DatabaseService,private router: Router) { }

  ngOnInit(): void {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  onAddMovieToActor(){
    this.dbService.addMovieToActor({id:this.movieId},{id:this.actorId}).subscribe(result => {
      this.router.navigate(["/listactors"]);
    });
  }

}
