import {Component, Input, OnInit} from '@angular/core';
import {LoadingStatus} from 'app/modules/document-management/model/loading-status.model';
import {DocumentData} from 'app/modules/document-management/model/documant-data.model';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentManagementService} from 'app/modules/document-management/services/document-management.service';

@Component({
  selector: 'app-document-link',
  templateUrl: './document-link.component.html',
  styleUrls: ['./document-link.component.css']
})
export class DocumentLinkComponent implements OnInit {
  @Input() documentData: DocumentData;
  @Input() documentLinkDataLoadingStatus: LoadingStatus;
  constructor(
    private documentManagementService: DocumentManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  goToDocumentList(): void {
    this.router.navigate(['/document-management', 'document', 'document-list',
      this.documentManagementService.documentMetadata.objectId, this.documentManagementService.documentMetadata.userId]);
  }
  ngOnInit() {
  }

}
