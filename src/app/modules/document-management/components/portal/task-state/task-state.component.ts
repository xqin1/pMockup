import {ChangeDetectionStrategy, Component, ViewChild, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {TaskData} from '@app/modules/document-management/model/task-data.model';
import {MatHorizontalStepper} from '@angular/material';

@Component({
  selector: 'app-task-state',
  templateUrl: './task-state.component.html',
  styleUrls: ['./task-state.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskStateComponent implements OnInit, OnChanges {
  @Input() selectedTaskId: string;
  @Input() selectedTask: TaskData;
  @ViewChild('stepper') stepper: MatHorizontalStepper;
  isLinear = true;
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["selectedTask"]) {
      console.log(changes["selectedTask"].currentValue.state);
    }
  }


  ngOnInit() {
    this.stepper.selectedIndex = 2;

  }

}
