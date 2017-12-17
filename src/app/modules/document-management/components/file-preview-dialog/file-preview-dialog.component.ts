import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-file-preview-dialog',
  templateUrl: './file-preview-dialog.component.html',
  styleUrls: ['./file-preview-dialog.component.css']
})
export class FilePreviewDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FilePreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit() {
  }

}
