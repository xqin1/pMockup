import { Component, OnInit } from '@angular/core';
import { PortalService} from '@app/modules/document-management/services/portal.service';

@Component({
  selector: 'app-portal-header',
  templateUrl: './portal-header.component.html',
  styleUrls: ['./portal-header.component.css']
})
export class PortalHeaderComponent implements OnInit {

  constructor(
    private portalService: PortalService
  ) { }

  userName: String;

  ngOnInit() {
    this.userName = this.portalService.user.name;
  }

}
