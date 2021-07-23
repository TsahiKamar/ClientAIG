import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaComponent } from 'src/components/media/media.component';

const routes: Routes = [
  
  { path: '',redirectTo: '/media',pathMatch:'full'},
  { path: 'media',component: MediaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }









