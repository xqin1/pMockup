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

  getShowingProjects(projectIds: string[]) {
    const myProjects: Project[] = [];
    for(const projectId of projectIds){
      const filterProjects = this.projects.filter(p => {
        return p.ID === projectId;
      });
      if (filterProjects.length > 0 ) {
        myProjects.push(filterProjects[0]);
      }
    }
    return myProjects;
  }
}
