import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-full-screen-loader',
  templateUrl: './full-screen-loader.component.html',
  styleUrls: ['./full-screen-loader.component.css']
})
export class FullScreenLoaderComponent implements OnInit {
  @Input() dataLoading;

  constructor() { }

  ngOnInit() {
  }

}
