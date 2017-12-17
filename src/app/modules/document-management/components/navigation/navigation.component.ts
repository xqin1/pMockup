import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Navigation} from '@app/modules/document-management/model/navigation.model';
import { DocumentConfig} from '@app/modules/document-management/config';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  navItems: Navigation[] = DocumentConfig.navigation;
  @Input() navIndex: number;
  @Output() navIndexChange = new EventEmitter<Navigation>();
  constructor() { }
  disableTab(nav: Navigation): boolean {
    if (nav.index > this.navIndex) {
      return true;
    }else {
      return false;
    }
  }

  tabChange($event) {
    this.navIndexChange.emit($event);
  }
  ngOnInit() {
  }

}
