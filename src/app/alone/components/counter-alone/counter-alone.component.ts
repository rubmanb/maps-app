import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-alone',
  standalone: true,
  imports: [],
  templateUrl: './counter-alone.component.html',
  styleUrl: './counter-alone.component.css'
})
export class CounterAloneComponent {

  public counter: number = 0;


  incrementCounter(n: number){
    this.counter = this.counter + n;
  }

  resetCounter(){
    this.counter = 0;
  }
}
