import {Component, Input, ChangeDetectionStrategy, OnInit, Output, EventEmitter} from '@angular/core';
import { PortalService} from '@app/modules/document-management/services/portal.service';
import { TaskData} from '@app/modules/document-management/model/task-data.model';

@Component({
  selector: 'app-portal-header',
  templateUrl: './portal-header.component.html',
  styleUrls: ['./portal-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalHeaderComponent implements OnInit {
  @Input() numberOfTasks: number;
  @Input() taskLoadIds: string[];
  @Input() selectedTask: TaskData;
  @Output() updateTask = new EventEmitter();
  userName: String;
  constructor(
    private portalService: PortalService
  ) { }

  onTaskUpdate() {
    this.updateTask.emit(this.selectedTask.task.ID);
  }

  showRefreshButton() {
    let result = true;
    if (this.taskLoadIds !== null && this.selectedTask !== null && this.taskLoadIds.includes(this.selectedTask.task.ID)) {
      result = false;
    }
    return result;
  }
  ngOnInit() {
    this.userName = this.portalService.user.name;
  }

}
