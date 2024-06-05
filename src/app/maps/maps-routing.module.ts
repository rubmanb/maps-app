import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiniMapComponent } from './components/mini-map/mini-map.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'map',
        component: MiniMapComponent
      },
      {
        path: '**',
        redirectTo: 'map'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
