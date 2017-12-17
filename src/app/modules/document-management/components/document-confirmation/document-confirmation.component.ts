import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DocumentData} from '@app/modules/document-management/model/documant-data.model';

@Component({
  selector: 'app-document-confirmation',
  templateUrl: './document-confirmation.component.html',
  styleUrls: ['./document-confirmation.component.css']
})
export class DocumentConfirmationComponent implements OnInit {
  @Input() selectedDocument: DocumentData;
  @Output() doneArchive = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  done() {
    this.doneArchive.emit(true);
  }

}
