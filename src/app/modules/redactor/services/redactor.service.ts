import { Injectable } from '@angular/core';
import {LoggerService} from '@app/core/services/logger.service';
import {Task} from '@app/core/model/workfront/Task.model';
import {Project} from '@app/core/model/workfront/Project.model';

@Injectable({
  providedIn: 'root'
})
export class RedactorService {
  task: Task = new Task();
  projects: Project[] = [];
  constructor(
    private logger: LoggerService
  ) {}

  setCurrentTask(task: Task) {
    this.task = task;
  }

  addProjects(projects: Project[]){
    for ( let p of projects){
      this.projects.push(p);
    }
  }

  getProjects() {
    return this.projects;
  }
}
