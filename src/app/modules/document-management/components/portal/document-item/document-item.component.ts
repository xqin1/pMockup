import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Document} from '@app/core/model/workfront/Document.model';
import {TaskData} from '@app/modules/document-management/model/task-data.model';

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
