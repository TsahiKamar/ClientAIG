
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
  
    mediaArray: Media[] = data["results"];

    constructor(private http: HttpClient){

    }

    public geAllData(): Media[] {
      return this.mediaArray;
    }

    public getDataByType(type:string): Media[] {
      try 
      {
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

}

