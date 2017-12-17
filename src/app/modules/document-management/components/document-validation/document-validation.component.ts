import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {DocumentData} from '@app/modules/document-management/model/documant-data.model';

@Component({
  selector: 'app-document-validation',
  templateUrl: './document-validation.component.html',
  styleUrls: ['./document-validation.component.css']
})
export class DocumentValidationComponent implements OnInit {
  @Input() selectedDocument: DocumentData;
  @Output() cancelArchive = new EventEmitter<boolean>();
  @Output() archiveDocument = new EventEmitter<DocumentData>();
  constructor() { }

  ngOnInit() {
  }
  preview(){
    console.log("preview");
  }
  cancel() {
    this.cancelArchive.emit(true);
  }
  archive() {
    this.archiveDocument.emit(this.selectedDocument);
  }
  reArchive(data: DocumentData): void {

  }
}
