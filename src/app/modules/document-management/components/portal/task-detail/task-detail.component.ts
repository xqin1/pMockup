import {Component, Input, ViewChild, OnInit, Output, EventEmitter} from '@angular/core';
import { TaskData} from '@app/modules/document-management/model/task-data.model';
import {environment} from '@env/environment';
import { MatExpansionPanel} from '@angular/material';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  @Input() selectedTask: TaskData;
  @Input() taskLoadIds: string[];
  @Output() updateTask = new EventEmitter<string>();
  @ViewChild('detailPanel') detailPanel: MatExpansionPanel;
  panelOpenState = true;
  constructor() { }

  getShowTaskLink(taskId: string) {
    return `${environment.workfrontHost}/task/view?ID=${taskId}`;
  }

  refreshTask(taskId, event: Event) {
    event.stopPropagation();
    this.updateTask.emit(taskId);
  }

  taskLinkClick(event: Event) {
    event.stopPropagation();
  }

  togglePanel() {
    this.detailPanel.toggle();
  }
  showRefreshButton() {
    let result = true;
    if (this.taskLoadIds !== null && this.selectedTask !== null && this.taskLoadIds.includes(this.selectedTask.task.ID)) {
      result = false;
    }
    return result;
  }
  ngOnInit() {
  }

}
