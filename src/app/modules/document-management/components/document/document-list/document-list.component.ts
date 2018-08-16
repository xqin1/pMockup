import {Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy} from '@angular/core';
import { DocumentData} from 'app/modules/document-management/model/documant-data.model';
import {DocumentConfig} from 'app/modules/document-management/config';
import { DocumentManagementService} from 'app/modules/document-management/services/document-management.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentListComponent implements OnInit {
  showDetail = false;
  taskApprovals = DocumentConfig.fakeTaskApprovals;

  @Input() documentListLoading: boolean;
  @Input() documentDataList: DocumentData[];
  @Input() selectedDocumentId: string;
  @Output() documentSelected= new EventEmitter<String>();
  @Output() documentLinkData = new EventEmitter<String>();
  @Output() regulatoryData = new EventEmitter<String>();

  constructor(
    private documentManagementService: DocumentManagementService
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
  isProjectClosed(): boolean {
    return this.documentManagementService.documentMetadata.projectClosed;
  }
  hasPendingTaskApproval() {
    return this.documentManagementService.documentMetadata.pendingTaskApprovals;
  }
  toggleApproverDetail() {
    this.showDetail = !this.showDetail;
  }
  ngOnInit() {
  }

}
