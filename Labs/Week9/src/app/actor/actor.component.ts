import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];
  section = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  mYear: number = 0;
  mTitle: string = "";
  movieId: string = "";
  yearBefore:number = 0;
  constructor(private dbService: DatabaseService) {}
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.mTitle="";
    this.mYear = 0;
    this.actorId = "";
    this.movieId="";
  }
  //Create a new Movie, POST request
  onSaveMovie() {
    let obj = { title: this.mTitle, year: this.mYear };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  //Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }
  onDeleteMovieBefore() {
    this.dbService.deleteMoviesBefore(this.yearBefore).subscribe(result => {
      this.onGetMovies();
    });
  }

  onAddActorToMovie(){
    this.dbService.addActorToMovie({id:this.movieId},{id:this.actorId}).subscribe(result => {
      this.onGetMovies();
      this.onGetActors();
    });
  }

}