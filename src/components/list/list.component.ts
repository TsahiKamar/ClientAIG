import { isNgTemplate } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Media } from 'src/models/media.model';
import { ShareService } from 'src/services/share.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() tData:Media[]= [];

  selectedIndex:number = null;
  imgNotFound:boolean = null;
  
  constructor(private shareService : ShareService) { 
    this.selectedIndex = -1;
  
     this.tData.forEach(item => {
       console.log(' ctor item.imgNotFound ' + item.imgNotFound);
       this.checkImage(item.Poster);
       if (this.imgNotFound = true){
         item.imgNotFound = Boolean(true);
       }
       else
       {
         item.imgNotFound = Boolean(false);
       }     
     }); 

  }

  ngOnInit(): void {
  }

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

sort(type) {

  this.tData.sort((a, b) => { 
            if (a.Title < b.Title) return 1;
            if (a.Title > b.Title) return -1;
            //return 0;
        });
}

linkClick(title,i){
  console.log('list linkClick..selected index :' + i);
  console.log('list  linkClick..selected title :' + title);
  let jsonMessage = {title:title};
  this.shareService.sendMessage(JSON.stringify(jsonMessage));
}

showDetails(i){
  console.log('List selected index :' + i)
  this.selectedIndex = i ;
}

}


    // this.tData.forEach(item => {
    //   this.checkImage(item.Poster);
    //   if (this.imgNotFound = true){
    //     item.imgNotFound = true;
    //   }
    //   else
    //   {
    //     item.imgNotFound = false;
    //   }     
    // }); 
