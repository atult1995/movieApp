import { Injectable } from '@angular/core';
import { MovieListService } from './movie-list.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //these bool array is used for hadlling cheked in and unchekd in of date, genres and runTime filters

  //boolean array having length 4 and default value is false used for date filter
  dateFilterIn=Array.from({length:4},()=>false)
  constructor(private movieService:MovieListService) { }
  //boolean array having length equals to genres array and default value is false used for genres filter
  genresFilterIn=Array.from({length:this.movieService.movieList[0].genres.length},()=>false)
  //boolean array having length 1 and default value is false used for runTime filter
  runTimeIn=Array.from({length:1},()=>false)

}
