import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromDocument from 'app/modules/document-management/reducers/index.reducer';
import {Observable} from 'rxjs/Observable';
import { DocumentManagementService} from '@app/modules/document-management/services/document-management.service';
import { DocumentData} from '@app/modules/document-management/model/documant-data.model';
import {MatDialog} from '@angular/material';
import { environment} from '@env/environment';
import {ReArchiveDialogComponent} from '@app/modules/document-management/components/re-archive-dialog/re-archive-dialog.component';
import { FilePreviewDialogComponent} from '@app/modules/document-management/components/file-preview-dialog/file-preview-dialog.component';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documentListLoading$: Observable<boolean>;
  @Input() documentDataList: DocumentData[];
  @Output() documentArchive= new EventEmitter<DocumentData>();
  constructor(
    private documentManagementService: DocumentManagementService,
    private store: Store<fromDocument.State>,
    public dialog: MatDialog
) {
    this.documentListLoading$ = this.store.select((fromDocument.getDocumentListLoading));
  }

  getShowDocumentLink(row: DocumentData) {
    return `${environment.workfrontHost}/document/view?ID=${row.documentID}`;
  }

  archive(data: DocumentData) {
    this.documentArchive.emit(data);
  }
  reArchive(doc: DocumentData): void {
    const dialogRef = this.dialog.open(ReArchiveDialogComponent, {
      width: '400px',
      data: doc
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
      console.log(result);
    });
  }
  preview(doc: DocumentData) {
    this.dialog.open(FilePreviewDialogComponent, {
      width: '800px',
      height: '600px',
      data: {document: doc, pdfContent: 'pdfContent'}
    });
  }
  ngOnInit() {
  }

}
