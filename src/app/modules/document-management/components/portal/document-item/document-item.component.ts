import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Document} from '@app/core/model/workfront/Document.model';
import {environment} from '@env/environment';
import {TaskData} from '@app/modules/document-management/model/task-data.model';
@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentItemComponent implements OnInit {
  @Input() document: Document;
  @Input() selectedDocumentId: string;
  @Output() selectDocument = new EventEmitter<string>();
  constructor() { }

  getDocumentName() {
    return `${this.document.name}.${this.document.currentVersion.ext}`;
  }

  getShowDocumentLink(documentId: string) {
    return `${environment.workfrontHost}/document/view?ID=${documentId}`;
  }
  openPDFPreview(documentId: string){
    const url = `${environment.workfrontHost}/PanoramaDocMgmt/documentManagement/pdfPreview?documentId=${documentId}`;
    window.open(url, "_blank");
  }
  getDocumentDownloadUrl(documentId: string) {
    return `${environment.workfrontHost}/document/download?ID=${documentId}`;
  }
  showPDFPreview() {
    let result = false;
    if (this.document.currentVersion.ext === "doc" || this.document.currentVersion.ext === "docx") {
      result = true;
    }
    return result;
  }
  onDocumentSelected() {
    console.log("change");
    this.selectDocument.emit(this.document.ID);
  }
  ngOnInit() {
  }

}
