import { Injectable } from '@angular/core';
import {LoggerService} from '@app/core/services/logger.service';
import {Task} from '@app/core/model/workfront/Task.model';

@Injectable({
  providedIn: 'root'
})
export class RedactorService {
  task: Task = new Task();
  constructor(
    private logger: LoggerService
  ) {}

  setCurrentTask(task: Task) {
    this.task = task;
  }
}
