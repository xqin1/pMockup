import { Component, OnInit } from '@angular/core';
import { Navigation} from '@app/modules/document-management/model/navigation.model';
import { DocumentConfig} from '@app/modules/document-management/config';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  navs: Navigation[] = DocumentConfig.navigation;
  constructor() { }

  ngOnInit() {
  }

}
