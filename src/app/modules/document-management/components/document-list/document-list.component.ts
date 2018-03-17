import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DocumentData} from '@app/modules/document-management/model/documant-data.model';
import {DocumentRegulatoryActionPayload} from '@app/modules/document-management/model/document-regulatory-action-paylaod.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Input() documentListLoading: boolean;
  @Input() documentDataList: DocumentData[];
  @Input() selectedDocumentId: string;
  @Output() documentSelected= new EventEmitter<String>();
  @Output() documentLinkData = new EventEmitter<String>();
  @Output() regulatoryData = new EventEmitter<String>();

  constructor(
  ) {
  }

  onDocumentSelected(documentId: string) {
    this.documentSelected.emit(documentId);
  }
  onRegulatoryData(documentId: string){
    this.regulatoryData.emit(documentId);
  }
  onDocumentLinkData(documentId: string) {
    this.documentLinkData.emit(documentId);
  }
  onPDFData(documentId: string) {
    this.documentSelected.emit(documentId);
  }
  ngOnInit() {
  }

}
