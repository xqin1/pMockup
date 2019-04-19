import { Injectable } from '@angular/core';
import {LoggerService} from '@app/core/services/logger.service';
import {Task} from '@app/core/model/workfront/Task.model';
import {Project} from '@app/core/model/workfront/Project.model';
import {RedactorProject} from '@app/modules/redactor/models/redactor-project.model';

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
      let exist = false;
      for(const project of this.projects) {
        if (project.ID === p.ID) {
          exist = true;
        }
      }
      if (!exist){
        this.projects.push(p);
      }
    }
  }

  getShowingProjects(projectIds: string[]) {
    const redactorProjects: RedactorProject[] = [];
    const myProjects: Project[] = [];
    for(const projectId of projectIds){
      const filterProjects = this.projects.filter(p => {
        return p.ID === projectId;
      });
      if (filterProjects.length > 0 ) {
        myProjects.push(filterProjects[0]);
      }
    }
    for (const p of myProjects) {
      const project: RedactorProject = new RedactorProject();
      project.id = p.ID;
      project.name = p.name;
      if (p.program && p.program.parameterValues) {
        if (p.program.parameterValues['DE:Approved Strength']) {
          project.approvedStrength = p.program.parameterValues['DE:Approved Strength'];
        }else{
          project.approvedStrength = '';
        }
        if (p.program.parameterValues['DE:Established Name']) {
          project.establishedName = p.program.parameterValues['DE:Established Name'];
        }else{
          project.establishedName = '';
        }
        if (p.program.parameterValues['DE:Dosage Form']) {
          project.dosageForm = p.program.parameterValues['DE:Dosage Form'];
        }else{
          project.dosageForm = '';
        }
      }
      redactorProjects.push(project);
    }
    return redactorProjects;
  }
}
