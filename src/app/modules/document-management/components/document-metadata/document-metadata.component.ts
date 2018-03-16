import { Component, OnInit, Input, SimpleChange, OnChanges } from '@angular/core';
import {DocumentData} from '@app/modules/document-management/model/documant-data.model';
import {ValuePair} from '@app/modules/document-management/model/value-pair.model';
import {LoadingStatus} from '@app/modules/document-management/model/loading-status.model';
import {MatSnackBar} from '@angular/material';
import { DocumentManagementService} from '@app/modules/document-management/services/document-management.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-document-metadata',
  templateUrl: './document-metadata.component.html',
  styleUrls: ['./document-metadata.component.css']
})
export class DocumentMetadataComponent implements OnInit {
  @Input() documentData: DocumentData;
  @Input() regulatoryDataLoadingStatus: LoadingStatus;
  // set toggleNotification(status: LoadingStatus) {
  //   status.loading ? this.snackBar.open("Loading Regulatory Data"): null;
  //   console.log("set: " + status.loading);
  // }
  constructor(
    public snackBar: MatSnackBar,
    private documentManagementService: DocumentManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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
  goToDocumentList(): void {
    this.router.navigate(['/document-management', 'document-list',
      this.documentManagementService.documentMetadata.objectId, this.documentData.documentID]);
  }
  ngOnInit() {
    // this.snackBar.open("Loading Regulatory Data");
  }
}
