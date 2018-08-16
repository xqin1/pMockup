import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DocumentData} from 'app/modules/document-management/model/documant-data.model';

@Component({
  selector: 'app-archive-confirmation-dialog',
  templateUrl: './archive-confirmation-dialog.component.html',
  styleUrls: ['./archive-confirmation-dialog.component.css']
})
export class ArchiveConfirmationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ArchiveConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DocumentData
  ) { }

  ngOnInit() {
  }

}
