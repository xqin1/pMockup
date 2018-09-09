import {ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Document} from '@app/core/model/workfront/Document.model';

@Component({
  selector: 'app-document-item-list',
  templateUrl: './document-item-list.component.html',
  styleUrls: ['./document-item-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentItemListComponent implements OnInit {
  @Input() documentList: Document[];
  @Input() selectedDocumentId: string;
  @Output() selectDocument = new EventEmitter<string>();
  constructor() { }

  onDocumentSelected(documentId: string) {
    this.selectDocument.emit(documentId);
  }
  ngOnInit() {
  }

}
