import { DatePipe } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Media } from 'src/models/media.model';
import { ShareService } from 'src/services/share.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  providers:[DatePipe]
})
export class CardComponent implements OnInit {

@Input() tSelectedItem:any = null; 
@Input() tSelectedIndex:number = null; 
@Input() tItemIndex:number = null; 


@Output() displayEvent = new EventEmitter<boolean>();
@Input()
  parentSubject:Subject<any>;
  
  dateFormat : string;
  title:string = null;

  subscription :Subscription;

constructor(private sharedService:ShareService,public datepipe: DatePipe) { 
  console.log('Card component tSelectedItem:' + JSON.stringify(this.tSelectedItem));
  console.log('Card component tSelectedIndex:' + JSON.stringify(this.tSelectedIndex));
  console.log('Card component tItemIndex:' + JSON.stringify(this.tItemIndex));

  this.subscription = this.sharedService.getMessage().subscribe(message => {  
    console.log('Card component message.text:' + JSON.stringify(message.text));
 
    let obj = JSON.parse(message.text);
    this.title = obj.title;
    //let index = obj.index; 
   
  });

}

  ngOnInit(): void {
      console.log('tSelectedItem :' + JSON.stringify(this.tSelectedItem));
  }
  
  cardDisplay(value: boolean) {
    console.log('Send to parent ..' + value);
    this.displayEvent.emit(value);
  }

  hide(){
    this.tSelectedIndex = -1;
  }

  ngOnDestroy() {
    //needed if child gets re-created (eg on some model changes)
    //note that subsequent subscriptions on the same subject will fail
    //so the parent has to re-create parentSubject on changes
    //orig  this.parentSubject.unsubscribe();
  }

}
