import {Component, Input, OnInit} from '@angular/core';
import {DocumentData} from 'app/modules/document-management/model/documant-data.model';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentManagementService} from 'app/modules/document-management/services/document-management.service';

@Component({
  selector: 'app-document-eligibility',
  templateUrl: './document-eligibility.component.html',
  styleUrls: ['./document-eligibility.component.css']
})
export class DocumentEligibilityComponent implements OnInit {
  @Input() documentData: DocumentData;
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
