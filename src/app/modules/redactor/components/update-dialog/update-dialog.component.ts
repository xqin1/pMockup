import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {
  @Input() selectionIds: string[] = [];
  @Input() projectAttachedTemplate: string[] = [];
  @Input() attachTemplateComplete: boolean;
  @Input() attachTemplateAllComplete: boolean;
  constructor() { }

  ngOnInit() {
  }

}
