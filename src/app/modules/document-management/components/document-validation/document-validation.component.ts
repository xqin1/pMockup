import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {DocumentData} from '@app/modules/document-management/model/documant-data.model';
import {MatDialog} from '@angular/material';
import {ReArchiveDialogComponent} from '@app/modules/document-management/components/re-archive-dialog/re-archive-dialog.component';
import { FilePreviewDialogComponent} from '@app/modules/document-management/components/file-preview-dialog/file-preview-dialog.component';


@Component({
  selector: 'app-document-validation',
  templateUrl: './document-validation.component.html',
  styleUrls: ['./document-validation.component.css']
})
export class DocumentValidationComponent implements OnInit {
  @Input() selectedDocument: DocumentData;
  @Output() cancelArchive = new EventEmitter<boolean>();
  @Output() archiveDocument = new EventEmitter<DocumentData>();
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }
  preview() {
    this.dialog.open(FilePreviewDialogComponent, {
      width: '800px',
      height: '600px',
      data: {document: this.selectedDocument, pdfContent: 'pdfContent'}
    });
  }
  cancel() {
    this.cancelArchive.emit(true);
  }
  archive() {
    this.archiveDocument.emit(this.selectedDocument);
  }
}
