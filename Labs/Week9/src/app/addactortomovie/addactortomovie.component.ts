import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-addactortomovie',
  templateUrl: './addactortomovie.component.html',
  styleUrls: ['./addactortomovie.component.css']
})
export class AddactortomovieComponent implements OnInit {

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

  onAddActorToMovie(){
    this.dbService.addActorToMovie({id:this.movieId},{id:this.actorId}).subscribe(result => {
      this.router.navigate(["/listmovies"]);
    });
  }

}
