import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-component',
  templateUrl: './demo-component.component.html',
  styleUrls: ['./demo-component.component.css']
})
export class DemoComponentComponent implements OnInit {
  test: string; 
  constructor() { }

  ngOnInit() {
  
  }

}
