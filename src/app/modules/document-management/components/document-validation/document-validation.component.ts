import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {DocumentData} from '@app/modules/document-management/model/documant-data.model';
import {MatDialog} from '@angular/material';
import { FilePreviewDialogComponent} from '@app/modules/document-management/components/file-preview-dialog/file-preview-dialog.component';
import {DocumentRegulatoryActionPayload} from '@app/modules/document-management/model/document-regulatory-action-paylaod.model';
import {environment} from '@env/environment';
import { PEFService} from '@app/core/services/pef.service';


@Component({
  selector: 'app-document-validation',
  templateUrl: './document-validation.component.html',
  styleUrls: ['./document-validation.component.css']
})
export class DocumentValidationComponent implements OnInit {
  @Input() selectedDocument: DocumentData;
  @Input() selectedRegulatoryData: DocumentRegulatoryActionPayload;
  @Input() userID: string;
  @Output() cancelArchive = new EventEmitter<boolean>();
  @Output() archiveDocument = new EventEmitter<DocumentData>();
  constructor(
    public dialog: MatDialog,
    private pefService: PEFService
  ) { }

  ngOnInit() {
  }
  getShowDocumentLink(documentID: string) {
    return `${environment.workfrontHost}/document/view?ID=${documentID}`;
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
    this.pefService.archiveDocument(this.selectedDocument.documentID, this.userID)
      .subscribe( result => {
        console.log(result);
        this.archiveDocument.emit(this.selectedDocument);
      });
  }
}
