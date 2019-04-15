import { Component, OnInit } from '@angular/core';
import { Title} from '@angular/platform-browser';

@Component({
  selector: 'app-redactor-parent',
  templateUrl: './redactor-parent.component.html',
  styleUrls: ['./redactor-parent.component.css']
})
export class RedactorParentComponent implements OnInit {

  constructor(
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("ANDA Redactor");
  }

}
