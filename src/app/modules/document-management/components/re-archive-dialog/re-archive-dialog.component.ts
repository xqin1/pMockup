import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogTitle, MatDialogContent, MatDialogActions} from '@angular/material';
import { DocumentData} from '@app/modules/document-management/model/documant-data.model';

@Component({
  selector: 'app-re-archive-dialog',
  templateUrl: './re-archive-dialog.component.html',
  styleUrls: ['./re-archive-dialog.component.css']
})
export class ReArchiveDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReArchiveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DocumentData
  ) { }

  ngOnInit() {
  }

}
