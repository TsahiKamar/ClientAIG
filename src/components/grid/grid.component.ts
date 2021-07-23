import { Component, Input, OnInit } from '@angular/core';
import { Media } from 'src/models/media.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
@Input() tData:Media[] = null; 


  

imgNotFound:boolean = null;
  
  constructor() { 
 
  }

  ngOnInit(): void {
    console.log('tData:' + JSON.stringify(this.tData));

   
  }

  // ngOnChanges(){
  //  this.tData.forEach(item => {
  //    this.checkImage(item.Poster);
  //    if (this.imgNotFound = true){
  //     item.imgNotFound = Boolean(true);
  //   }
  //    else
  //    {
  //     item.imgNotFound = Boolean(false);
  //   }     
  //  }); 
  //  }

 checkImage(URL) {
    var tester=new Image();
    tester.onload=this.imageFound;
    tester.onerror=this.imageNotFound;
    tester.src=URL;
    console.log('Image :' + URL);
}

imageFound() {
    console.log('Image found and loaded !' + URL);
    this.imgNotFound = false;

  }

imageNotFound() {
    console.log('Image not found !' + URL);
    this.imgNotFound = true;
}


}
