import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Map, LngLat, Marker} from 'mapbox-gl';

interface MarkerAndColor{
  color: string,
  marker: Marker
}

interface PlainMarker{
  color: string,
  lngLat: number[]
}
@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit{

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public lnglat: LngLat = new LngLat(-0.39, 39.47);

  ngAfterViewInit(): void {
    if(!this.divMap) throw "HTML element div map not found";

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lnglat, // starting position [lng, lat]
      zoom: 13, // starting zoom
      });

      this.readFromLocalStorage();

      // const markerHtml = document.createElement('div');
      // markerHtml.innerHTML = 'nombre random'

      // const marker = new Marker({
        // color: 'red',
      //   element: markerHtml
      // })
      //   .setLngLat(this.lnglat)
      //   .addTo(this.map)
  }

  createrMarker(){
    if(!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map?.getCenter()

    this.addMarker(lngLat, color);
  }


  addMarker(lngLat: LngLat, color: string){
    if(!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true

    }).setLngLat(lngLat).addTo(this.map);

    this.markers.push({
      color, marker
    });

    this.saveToLocalStorage();
    marker.on('dragend', () => {
      this.saveToLocalStorage();
    })
  }

  deleteMarker(i: number) {
    if(!this.markers) return;
    this.markers[i].marker.remove()
    this.markers.splice(i,1)
  }

  flyTo(marker: Marker){
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }


  saveToLocalStorage(){
    const plainMarker: PlainMarker[] = this.markers.map( ({color, marker}) => {

      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarker));
  }

  readFromLocalStorage(){
    const plainMarker = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkerString: PlainMarker[] = JSON.parse(plainMarker);

    plainMarkerString.forEach(({color, lngLat}) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat)
      return this.addMarker(coords, color);
    });
  }

}
