import { Component, OnInit, Input } from '@angular/core';
import {DocumentData} from '@app/modules/document-management/model/documant-data.model';
import {DocumentRegulatoryActionPayload} from '@app/modules/document-management/model/document-regulatory-action-paylaod.model';
import {ValuePair} from '@app/modules/document-management/model/value-pair.model';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  @Input() documentData: DocumentData;
  @Input() regulatoryData: DocumentRegulatoryActionPayload;
  constructor() { }

  showDetailTable(): boolean {
    if((this.documentData &&this.documentData.customFormData.length > 0) ||
      (this.regulatoryData && this.regulatoryData.regulatoryActions.length > 0)) {
      return true;
    } else {
      return false;
    }
  }
  getRegulatoryDisplayData(): ValuePair[] {
    const displayData: ValuePair[] = [];
    this.regulatoryData.regulatoryActions.forEach((r) => {
      let exist = false;
      this.documentData.customFormData.forEach((c) => {
        if(c.name === r.name) {
          exist = true;
        }
      });
      if (!exist) {
        displayData.push(r);
      }
    })
    return displayData;
}
  ngOnInit() {
  }

}
