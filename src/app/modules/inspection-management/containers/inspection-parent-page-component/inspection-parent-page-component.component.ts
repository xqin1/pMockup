import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inspection-parent-page-component',
  templateUrl: './inspection-parent-page-component.component.html',
  styleUrls: ['./inspection-parent-page-component.component.css']
})
export class InspectionParentPageComponentComponent implements OnInit {
  headerTitle = 'Inspection Management';
  constructor() { }

  ngOnInit() {
  }

}
