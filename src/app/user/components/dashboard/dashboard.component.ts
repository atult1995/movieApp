import { Component, OnInit } from '@angular/core';
import { FilterPipe } from '../../pipes/filter.pipe';
import { MovieListService } from '../../services/movie-list.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
//searchBy array contains array of objects having date, genres and runTime object 
searchBy:any=[{filterName:"date",date:[]},{filterName:"genres",genres:[]},{filterName:"runTime",runTime:[]}]
//searchText used for storing title keywords
searchText:string=""
// current page number, initially 0
currentPageNumber:number=0
//page array, stores number of pages
pages:any=[]
//date ranges
dateFilters:any=[{first:"1980",second:"1990"},{first:"1990",second:"2000"},{first:"2000",second:"2010"},{first:"2010",second:"2022"},]
//color array
color:any=["red","blue","orange"]
//store checkedin filters indexes
filterCheckedIn:any=[[],[],[]]
constructor(public movieListService:MovieListService,public userService:UserService) {
  //loading services
 }

  ngOnInit(): void {
    //storing user filter
    //checking if already user has set date filter and retriving previous result
    if(sessionStorage.getItem('searchByDate')!==null){
      var obj=sessionStorage.getItem("searchByDate")
      var parseObj=JSON.parse(obj)
      this.searchBy[0].date=parseObj.date
    }
    //checking if already user has set genres filter and retriving previous result
    if(sessionStorage.getItem('searchByGenres')!==null){
      var obj=sessionStorage.getItem("searchByGenres")
      var parseObj=JSON.parse(obj)
      this.searchBy[1].genres=parseObj.genres
    }

    //cheking if already use has set ruTime filter and retriving previous result
    if(sessionStorage.getItem('searchByTime')!==null){
      var obj=sessionStorage.getItem("searchByTime")
      var parseObj=JSON.parse(obj)
      this.searchBy[2].runTime=parseObj.runTime
    }
    //cheking if already user has searched using search bar and retriving previous result
    if(sessionStorage.getItem("searchText")!==null){
      this.searchText=sessionStorage.getItem("searchText")
    }
    //setting the filter checkbox that user has already set
    if(sessionStorage.getItem("filterCheckedIn")!==null){
      var filterCheckedIn=JSON.parse(sessionStorage.getItem("filterCheckedIn"))
      this.filterCheckedIn=filterCheckedIn

      //setting date filter
      if(this.filterCheckedIn[0].length!==0){
        this.filterCheckedIn[0].forEach((f:any)=>{
          this.userService.dateFilterIn[f]=true
        })
      }
      //setting genres filter
      if(this.filterCheckedIn[1].length!==0){
        this.filterCheckedIn[1].forEach((f:any)=>{
          this.userService.genresFilterIn[f]=true
        })
      }
      //setting runTime filter
      if(this.filterCheckedIn[2].length!==0){
          this.userService.runTimeIn[0]=true
      }
    }
    this.onCalculateNumberPages()
  }

  //calculate number of pages based on filter is set or not set
  //in one page 12 records will be displayed
  onCalculateNumberPages(){
    //initializing pages  with empty array
    this.pages=[]
    //initialise filter pipe
    var filter=new FilterPipe()
    //filter pipes takes 3 parameter (movie array, searchBy filter and searchText filter) and return filtered records
    var result=filter.transform(this.movieListService.movieList[0].movies,this.searchBy,this.searchText)
    //counting number of pages by dividing by 12
    var numberOfPages=Math.ceil(result.length/12)
    //adding page to pages array
    for(var i=0;i<numberOfPages;i++){
      this.pages.push(i)
    }
    //after calculating pages,each time we set currentPageNumber=0
    this.currentPageNumber=0
  }

  //get page number and display 12 records beased on the page number
  //takes page number as input
  onClickPageNumber(i:number){
    //setting currentPageNumber to  clicked page number
    this.currentPageNumber=i
  }

  //title based search
  onSearchTitle(){
    sessionStorage.setItem("searchText",this.searchText)
    //calculating pages after search
    this.onCalculateNumberPages()
  }

  //on select date filter
  //it takes two parameter(date ranges (first and second), index)
  //it search between the date range from first to second and both are including
  onSelectDateFilter(value:any,i:any){
    //setting searchText to empty, after selecting date filter, user can again search using title
    this.searchText=""
    //when user has checkedin date filter
    if(this.userService.dateFilterIn[i]==true){
     //pushing date ranges (first and second date) to searchBy array
     this.searchBy[0].date.push(value)
     //pushing index to filterCheckedIn array
     this.filterCheckedIn[0].push(i)
    }else{
      //if user has unchckedin genres filter
      //popping date from searchBy array
      this.searchBy[0].date=this.searchBy[0].date.filter((f:any)=>{
        return value.first!==f.first && value.second!==f.second
      })
      //popping index from filterCheckedIn array
      this.filterCheckedIn[0]=this.filterCheckedIn[0].filter((f:any)=>{
        return f!==i
      })
    }
    //storing date filter to sessionStorage for future use
    sessionStorage.setItem("searchByDate",JSON.stringify(this.searchBy[0]))
    //storing filterCheckedIn to sessionStorage for future use
    sessionStorage.setItem("filterCheckedIn",JSON.stringify(this.filterCheckedIn))
    //after checkedin or uncheckedin date filter, calculating number of pages
    this.onCalculateNumberPages()
  }

  //on select genres filter, it takes two parameter(genres name, index)
  //it search based on genres
  onSelectGenresFilter(value:any,i:any){
     //setting searchText to empty, after selecting genres filter, user can again search using title
    this.searchText=""
    //when user has checkedin the genresfilter
    if(this.userService.genresFilterIn[i]===true){
      //pushing genres name to searchBy array
      this.searchBy[1].genres.push(value)
      //pushing index to filterCheckedIn array
      this.filterCheckedIn[1].push(i)
    }else{
      //when user has unchecked the genres filter
      //popping out genres name from searchBy array
      this.searchBy[1].genres=this.searchBy[1].genres.filter((f:any)=>{
        return value!==f
      })
      //popping out the index from filterCheckedIn array
      this.filterCheckedIn[1]=this.filterCheckedIn[1].filter((f:any)=>{
        return f!==i
      })
    }
    //storing genresFilter to sessionStorage for future use
    sessionStorage.setItem("searchByGenres",JSON.stringify(this.searchBy[1]))
    //storing filterCheckedIn to sessionStorage for future use
    sessionStorage.setItem("filterCheckedIn",JSON.stringify(this.filterCheckedIn))
     //after checking or unchecking genres filter, calculating number of pages
    this.onCalculateNumberPages()
  }
  //on select runTime filter
  //it takes one parameter, i.e runTime
  onSelectTimeFilter(value:any){
    //setting searchText to empty, after selecting genres filter, user can again search using title
    this.searchText=""
    //when user has checkedin the runtime filter
    if(this.userService.runTimeIn[0]===true){
      //pushing runtime filter value to searchBy array
      this.searchBy[2].runTime.push(value)
      //pushing index to filterCheckedIn array
      this.filterCheckedIn[2].push(0)
    }else{
      //popping out the runTime value from searchBy array
      this.searchBy[2].runTime.pop()
      //popping out the index from filterCheckedIn array
      this.filterCheckedIn[2].pop()
    }
    //storing runTime filter to sessionStorage for future use
    sessionStorage.setItem("searchByTime",JSON.stringify(this.searchBy[2]))
     //storing filterCheckedIn to sessionStorage for future use
    sessionStorage.setItem("filterCheckedIn",JSON.stringify(this.filterCheckedIn))
    //after checking or unchecking runTime filter, calculating number of pages
    this.onCalculateNumberPages()
  }

  //reset all filter
  resetFilter(){
    this.searchBy=[{filterName:"date",date:[]},{filterName:"genres",genres:[]},{filterName:"runTime",runTime:[]}]
    this.filterCheckedIn=[[],[],[]]
    this.searchText=""
    this.userService.dateFilterIn=Array.from({length:4},()=>false)
    this.userService.genresFilterIn=Array.from({length:this.movieListService.movieList[0].genres.length},()=>false)
    this.userService.runTimeIn=Array.from({length:1},()=>false)
    sessionStorage.clear()
    //after reseting all filters, calculating number of pages
    this.onCalculateNumberPages()
  }
}
