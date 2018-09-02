import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Document} from '@app/core/model/workfront/Document.model';
import {environment} from '@env/environment';
@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentItemComponent implements OnInit {
  @Input() selectedDocument: Document;
  constructor() { }

  getDocumentName() {
    return `${this.selectedDocument.name}.${this.selectedDocument.currentVersion.ext}`;
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
    if (this.selectedDocument.currentVersion.ext === "doc" || this.selectedDocument.currentVersion.ext === "docx") {
      result = true;
    }
    return result;
  }
  ngOnInit() {
  }

}
