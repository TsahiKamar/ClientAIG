import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MediaComponent } from 'src/components/media/media.component';
import { MediaService } from 'src/services/media.service';
import { GridComponent } from 'src/components/grid/grid.component';
import { CardComponent } from 'src/components/card/card.component';
import { ListComponent } from 'src/components/list/list.component';
import { ShareService } from 'src/services/share.service';
import { HttpClientModule } from '@angular/common/http';
//import { FormsModule } from '@angular/forms';
//import { ListComponent } from '../components/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    MediaComponent,
    GridComponent,
    CardComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
    //FormsModule
  ],
  providers: [MediaService,ShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
