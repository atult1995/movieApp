import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {
//pagination pipe
//takes two parameter (movie array and currentPageNumber)
//return 12 records based on current page number
  transform(movie:any[],currentPageNumber:number): any {
    var resultArr:any=[]
    //if there is no data in movie array
    if(movie.length===0){
      return null
    }
    //pushing 12 records based on current page number
    for(var i=currentPageNumber*12;i<currentPageNumber*12+12 && i<movie.length;i++){
      resultArr.push(movie[i])
    }
    //returning 12 records
    return resultArr;
  }

}
