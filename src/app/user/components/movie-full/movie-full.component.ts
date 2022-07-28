import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieListService } from '../../services/movie-list.service';

@Component({
  selector: 'app-movie-full',
  templateUrl: './movie-full.component.html',
  styleUrls: ['./movie-full.component.scss']
})
export class MovieFullComponent implements OnInit {
  //movie object, stores movie details
  movie:any={}
  //color array
  color:any=["red","blue","orange"]
  constructor(private activateRoute:ActivatedRoute,private movieListService:MovieListService) {
    //loading activateRoute and movie list services
   }

  ngOnInit(): void {
    //getting query params such as movie id
    this.activateRoute.queryParams.subscribe((params)=>{
      //getting movie id
      const id=params['id']
      //retriving movie details from id
      this.movieListService.movieList[0].movies.forEach((mo:any)=>{
        if(String(mo.id) === String(id)){
          this.movie=mo
        }
      })
    })
  }

}
