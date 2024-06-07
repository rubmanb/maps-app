import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import mapboxgl from 'mapbox-gl';

(mapboxgl as any).accessToken = 'pk.eyJ1IjoicmF5MTM4NiIsImEiOiJjbHgzY285cGYwNGs2MmlzYzdxYnFzMnd0In0.gguyny32AAUmaw7C4cm68A';

import { MapsRoutingModule } from './maps-routing.module';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';

import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { CounterAloneComponent } from "../alone/components/counter-alone/counter-alone.component";
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';



@NgModule({
    declarations: [
        MiniMapComponent,

        MapsLayoutComponent,
        MarkersPageComponent,
        PropertiesPageComponent,
        ZoomRangePageComponent,
    ],
    imports: [
        CommonModule,
        MapsRoutingModule,
        CounterAloneComponent,
        SideMenuComponent,
    ]
})
export class MapsModule { }
