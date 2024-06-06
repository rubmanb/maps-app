import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  templateUrl: './maps-layout.component.html',
  styleUrl: './maps-layout.component.css'
})
export class MapsLayoutComponent {
  map = L.map('map').setView([51.505, -0.09], 13);
}
