import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {LngLat, Map, Marker} from 'mapbox-gl';
@Component({
  selector: 'component-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent {
  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(): void {
    if(!this.divMap) throw "HTML element div map not found";
    if(!this.lngLat) throw "lngLat can't be null";

    //map
    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false
    });

    //marker
    new Marker().setLngLat(this.lngLat).addTo(map);
  }
}
