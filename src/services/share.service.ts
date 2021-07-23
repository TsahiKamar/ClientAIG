import { Injectable } from '@angular/core';  
import { Subject } from 'rxjs';  
import { Observable } from 'rxjs';  
  
@Injectable()  
export class ShareService {  
  private subject = new Subject<any>();  
  constructor() { }  
  
  sendMessage(message: string) {  
    this.subject.next({ text: message });  
  }  
  
  getMessage(): Observable<any> {  
    return this.subject.asObservable();  
  }}  