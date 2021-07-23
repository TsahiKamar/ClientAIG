
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/internal/operators/map';
import { Media } from 'src/models/media.model';
import * as data from '../files/Response.json'; 
//import { createElementCssSelector } from '@angular/compiler';



@Injectable({
    providedIn: 'root',
  })
  export class MediaService {  
    imgNotFound:boolean = null;

    mediaArray: Media[] = data["results"];

    constructor(private http: HttpClient){

    }

    public geAllData(): Media[] {
       return this.mediaArray;
    }

    public getDataByType(type:string): Media[] {
      try 
      {

        this.mediaArray.forEach(item => {
          item.imgNotFound = null;
          console.log('service item.imgNotFound ' + item.imgNotFound);
          this.checkImage(item.Poster);
          item.imgNotFound = this.imgNotFound;

          // if (this.imgNotFound){
          //   item.imgNotFound = Boolean(true);
          // }
          // else
          // {
          //   item.imgNotFound = Boolean(false);
          // }     
        }); 
        console.log('service item.imgNotFound => ' + JSON.stringify(this.imgNotFound));
     
   

        return this.mediaArray.filter(x=> x.Type == type);
      }
      catch (error) {
        console.error('getDataByType error ', error);
      }
    }

    public search(data:Media[],text:string) : Media[] {
    try 
    {
      if (! (text === undefined) &&  ! (text === ''))
      {
  
          return data.filter(x=> x.Title.indexOf(text) >= 0 || x.Year.indexOf(text) >= 0 )  
      }
      return [];

    }
    catch (error) {
      console.error('search error ', error);
    }
 
    }

    public update(text:string) : any {
     //No need to Implement
      return null;
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

  private checkImage(URL) {
    var tester=new Image();
    tester.onload=this.imageFound;
    tester.onerror=this.imageNotFound;
    tester.src=URL;
    console.log('Image :' + URL);
  }

private imageFound() {
    console.log('Image found and loaded !');// + URL);
    this.imgNotFound = Boolean(false);

  }

private imageNotFound() {
    console.log('Image not found !');// + URL);
    this.imgNotFound = Boolean(true);
}



}

