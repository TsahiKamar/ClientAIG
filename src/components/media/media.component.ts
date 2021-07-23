import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { matFormFieldAnimations } from '@angular/material';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import {map} from 'rxjs/internal/operators/map';
import { Media } from 'src/models/media.model';
import { MediaService } from 'src/services/media.service';
import { ShareService } from 'src/services/share.service';
import { CardComponent } from '../card/card.component';
import { ListComponent } from '../list/list.component';


const Series = "series"
const Games = "game"
const Movies = "movie"

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})

export class MediaComponent implements OnInit {
 
  activeNavId:string = "movie";//Default

  isItemDetails:boolean = true;

 
  data:Media[]=[]; //All Data
  mediaArray: Media[] = [] ;
  movies:Media[]=[];
  games:Media[]=[];
  series:Media[]=[];
  
  checked: boolean;

  title:string = null;
  search:string = null;
  searchText:string = null;
  subscription :Subscription;
  listDisplay:Boolean = null;
  objectTypeDisplay:string = null;
  imgNotFound:boolean = null;


  constructor(private shareService : ShareService,private mediaService: MediaService) { 
     this.data = this.mediaService.geAllData();  
     this.mediaArray = this.mediaService.getDataByType(this.activeNavId);
     
     this.listDisplay = true;//Default
     this.objectTypeDisplay = "List";//Default
  }
  
  ngOnInit(): void {
 
    this.subscription = this.shareService.getMessage().subscribe(message => {  
      console.log('List component message.text:' + JSON.stringify(message.text));
      let obj = JSON.parse(message.text);
      this.title = obj.title;
    });

   this.movies = this.data.filter(x => x.Type == Movies);

   this.games = this.data.filter(x => x.Type == Games);

   this.series = this.data.filter(x => x.Type == Series);

 
  }

  // ngAfterContentChecked(){
  //   this.mediaArray.forEach(item => {
  //     item.imgNotFound = null;
  //     console.log(' ctor item.imgNotFound ' + item.imgNotFound);
  //     this.checkImage(item.Poster);
  //     if (this.imgNotFound == true){
  //       item.imgNotFound = Boolean(true);
  //     }
  //     else
  //     {
  //       item.imgNotFound = Boolean(false);
  //     }     
  //   }); 
  //   console.log('mediacomponent this.mediaArray => ' + JSON.stringify(this.mediaArray));
  
  
  // }

  checkImage(URL) {
    var tester=new Image();
    tester.onload=this.imageFound;
    tester.onerror=this.imageNotFound;
    tester.src=URL;
    console.log('Image :' + URL);
  }

imageFound() {
    //console.log('Image found and loaded !' + URL);
    this.imgNotFound = false;

  }

imageNotFound() {
    //console.log('Image not found !' + URL);
    this.imgNotFound = true;
}


  
  toggelClick(event){
    this.listDisplay = !this.listDisplay;
    if (this.objectTypeDisplay == "List") {
      this.objectTypeDisplay = "Grid";
    }
    else
    {
      this.objectTypeDisplay = "List";
    }

    console.log('toggle clicked !' + event.target.checked );

  }

  getValue(event){
    this.search = event.target.value;
  }
  
  onSubmit(){
    try {
      var response =  this.mediaService.search(this.mediaArray,this.search);
      let jsonResponse = JSON.stringify(response);
      alert('Search Response: ' + jsonResponse);

    }
    catch(error) {
      console.error('onSubmit error ', error);
    }
  }
  
  clear() {
    this.searchText = ''; 
  }
  
  titleUpdate(event){
    try 
    {
      alert('titleUpdate .. ');

      //Call Server service ..  
      this.mediaService.update(event.target.value);
    }
    catch(error) {
      console.error('titleUpdate error ', error);
    }
  }

  dataRefresh(activeNavId){
  try
  {
    console.log('Referesh ' + activeNavId + ' ..');
    this.mediaArray = this.mediaService.getDataByType(activeNavId);
  }
  catch(error) {
    console.error('dataRefresh error ', error);
  }
  }

  selectedNavItem(event){
  try{

    switch (event.target.id) {
      case Movies:
        this.activeNavId = event.target.id;       
        this.mediaArray = this.mediaService.getDataByType(this.activeNavId);
        console.log('selectedNavItem response mediaArray :' + JSON.stringify(this.mediaArray)) ;
        break;
      case Games:
        this.activeNavId = event.target.id;       
        this.mediaArray = this.mediaService.getDataByType(this.activeNavId);
        console.log('selectedNavItem response mediaArray :' + JSON.stringify(this.mediaArray)) ;

        break;
      case Series:
        this.activeNavId = event.target.id;       
        this.mediaArray = this.mediaService.getDataByType(this.activeNavId);
        console.log('selectedNavItem response mediaArray :' + JSON.stringify(this.mediaArray)) ;

        break;

      default:
        break;
    }
    }
    catch(error) {
      console.error('selectedNavItem error ', error);
    }

  }
  
}

