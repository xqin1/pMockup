import { Component, OnInit, Input } from '@angular/core';
import {DocumentData} from '@app/modules/document-management/model/documant-data.model';
import {DocumentRegulatoryActionPayload} from '@app/modules/document-management/model/document-regulatory-action-paylaod.model';
import {ValuePair} from '@app/modules/document-management/model/value-pair.model';

@Component({
  selector: 'app-document-metadata',
  templateUrl: './document-metadata.component.html',
  styleUrls: ['./document-metadata.component.css']
})
export class DocumentMetadataComponent implements OnInit {
  @Input() documentData: DocumentData;
  constructor() { }

  showMetadataTable(): boolean {
    if ((this.documentData && this.documentData.customFormData.length > 0)) {
      return true;
    } else {
      return false;
    }
  }
  getRegulatoryDisplayData(): ValuePair[] {
    const displayData: ValuePair[] = [];
    this.documentData.regulatoryData.regulatoryActions.forEach((r) => {
      let exist = false;
      this.documentData.customFormData.forEach((c) => {
        if (c.name === r.name) {
          exist = true;
        }
      });
      if (!exist) {
        displayData.push(r);
      }
    });
    return displayData;
}
  ngOnInit() {
  }
}
