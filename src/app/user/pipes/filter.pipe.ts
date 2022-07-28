import { Pipe, PipeTransform } from '@angular/core';
//impure pipes
@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {
  //filter pipe
  //takes three parameter (movie array, searchBy i.e filter, searchText i.e movie title keyword)
  //return filtered records

  //remove duplicate method
  //takes 3 parameter
  //return unique records
  removeDuplicate(a:any,b:any,c:any){
    return c.indexOf(a)===b
  }

  transform(movie:any[],searchBy:any,searchText:string,sortOrder:boolean): any {
    var resultArray:any=[]
    var temp:any=[]
    //if user has neither set serachText nor searchBy
    if(searchText == "" && searchBy[0].date.length===0 && searchBy[1].genres.length===0 && searchBy[2].runTime.length===0){
      resultArray=movie
      //return resultArray
    }
    //if user has only using search bar i.e set searchText(trying to search by title) and no filter is set i.e no searchBy is set
    else if(searchText !=="" && searchBy[0].date.length===0 && searchBy[1].genres.length===0 && searchBy[2].runTime.length===0){
      resultArray=[]
        movie.forEach((mo)=>{
          if(mo.title.toLowerCase().includes(searchText.toLowerCase())){
            resultArray.push(mo)
          }
        })
    }
   //user has set searchBy i.e may be eith date or genres or runTime is set or all filter is set
    else if(searchBy[0].date.length>0 || searchBy[1].genres.length>0 || searchBy[2].runTime.length>0){
      resultArray=[]
      //filreing based on date filter
      searchBy[0].date.forEach((d:any)=>{
        movie.forEach((mo)=>{
          if(Number(mo.year) <=Number(d.second) && Number(mo.year)>=Number(d.first)){
            resultArray.push(mo)
          }
        })
      })
      //filtering based on genres filter
      searchBy[1].genres.forEach((g:any)=>{
        movie.forEach((mo)=>{
          mo.genres.forEach((gen:any)=>{
            if(g === gen){
              resultArray.push(mo)
            }
          })
        })
      })
      //filtering based on runTime filter
      searchBy[2].runTime.forEach((r:any)=>{
        movie.forEach((mo)=>{
          if(Number(mo.runtime) === Number(r)){
            resultArray.push(mo)
          }
        })
      })
      //after filtering based on date, genres and runtime, if user wants to search based on title
      if(searchText!=""){
        resultArray.forEach((mo:any)=>{
          if(mo.title.toLowerCase().includes(searchText.toLowerCase())){
            temp.push(mo)
          }
        })
        resultArray=[]
        resultArray=temp
      }
    }
    //may pe possible that we get duplicate records, filtering duplicate records
    resultArray=resultArray.filter((this.removeDuplicate))

    //sorting data w.r.t year
    if(sortOrder == true){
      //asceding order by year
      resultArray.sort((a:any,b:any) => Number(a.year)-Number(b.year))
    }else{
      //desceding order by year
      resultArray.sort((a:any,b:any) => Number(b.year)-Number(a.year))
    }
    //return searched data
    return resultArray;
  }

}
