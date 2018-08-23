import { Component, Input, OnInit } from '@angular/core';
import { TaskData} from '@app/modules/document-management/model/task-data.model';
import {environment} from '@env/environment';
import { MatExpansionPanel} from '@angular/material';
import {EventTargetLike, FromEventTarget} from 'rxjs/internal/observable/fromEvent';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  @Input() selectedTask: TaskData;
  constructor() { }

  getShowTaskLink(taskId: string) {
    return `${environment.workfrontHost}/task/view?ID=${taskId}`;
  }

  refreshTask() {
    console.log("refresh task");
  }

  expandPanel(matExpansionPanel: MatExpansionPanel, event: Event): void {
    event.stopPropagation(); // Preventing event bubbling

    if (!this._isExpansionIndicator(event)) {
      matExpansionPanel.toggle(); // Here's the magic
    }
  }

  private _isExpansionIndicator(event: Event): boolean {
    const expansionIndicatorClass = 'mat-expansion-indicator';
    return (event.target["classList"] && event.target["classList"].contains(expansionIndicatorClass) );
  }
  ngOnInit() {
  }

}
