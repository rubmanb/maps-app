import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {LngLat, Map} from 'mapbox-gl';
@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public lnglat: LngLat = new LngLat(-74.5, 40);
  public lng: number = -74.5;
  public lat: number = 40;

  ngAfterViewInit(): void {
    if(!this.divMap) throw "HTML element div map not found";

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lnglat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      });

      this.mapListener();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListener(){
    if(!this.map) throw "Map not initalised";

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if(this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', () => {
      this.lnglat = this.map!.getCenter();
      const {lng, lat} = this.lnglat;
      this.lng = lng;
      this.lat = lat;
    });

  }

  zoomIn(){
    this.map?.zoomIn()
  }

  zoomOut(){
    this.map?.zoomOut()
  }

  zoomChange(value: string){
    this.zoom = Number(value);
    this.map?.setZoom(this.zoom);
  }

}
