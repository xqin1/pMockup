import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { Navigation} from '@app/modules/document-management/model/navigation.model';
import { DocumentConfig} from '@app/modules/document-management/config';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  navItems: Navigation[] = DocumentConfig.navigation;
  @Input() navIndex: number;
  @Input() objectId: string;
  @Input() userId: string;
  @Output() navIndexChange = new EventEmitter<Navigation>();
  constructor(
    private router: Router
  ) { }
  disableTab(nav: Navigation): boolean {
    if (nav.index > this.navIndex) {
      return true;
    }else {
      return false;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes["navIndex"] && changes["navIndex"].currentValue === 0 && typeof changes["navIndex"].previousValue !== 'undefined') {
      this.router.navigate(['/document-archive', 'document-list', this.objectId, this.userId]);
    }
  }

  tabChange($event) {
    this.navIndexChange.emit($event);
  }
  ngOnInit() {
  }

}
