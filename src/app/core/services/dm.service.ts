import { Injectable } from '@angular/core';
import {map, delay, catchError, finalize, retry} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ExceptionService } from '@app/core/services/exception.service';
import { environment } from '../../../environments/environment';
import {LoggerService} from '@app/core/services/logger.service';
import {Task} from '@app/core/model/workfront/Task.model';
import {of} from 'rxjs/index';
import {User} from '@app/core/model/workfront/User.model';
import {RedactorResponse} from '@app/modules/redactor/models/redactor-response.model';

@Injectable()
export class DMService {

  constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService,
    private logger: LoggerService
  ) {

  }

  ////////////////////////////////////////////////////////////////////////////////////
  // redactor API
  //////////////////////////////////////////////////////////////////////////////////////
  getRedactorTaskByTaskId(taskId) {
    return this.http
      .get<any>(`${environment.documentManagementURL}/redactor/getRedactorTask?taskId=${taskId}`)
      .pipe(
        map(res => res.data),
       // catchError(this.exceptionService.catchBadResponse),
        finalize(() => {
          this.logger.log("done with task data");
        })
      );
  }
  getApplicationNumber(appType: string, appNumber: string, limit: number) {
    return this.http
      .get<any>(`${environment.documentManagementURL}/redactor/getApplicationNumber?appType=${appType}&appNumber=${appNumber}&limit=${limit}`)
      .pipe(
        map(res => res.data),
       // catchError(this.exceptionService.catchBadResponse),
        finalize(() => {
          this.logger.log("done with application number");
        })
      );
  }
  getPostApprovalProjects(appType: string, appNumber: string) {
    return this.http
      .get<any>(`${environment.documentManagementURL}/redactor/getPostApprovalProjects?appType=${appType}&appNumber=${appNumber}`)
      .pipe(
        map(res => res.data),
      //  catchError(this.exceptionService.catchBadResponse),
        finalize(() => {
          this.logger.log("done with get redactor projects");
        })
      );
  }
  attachRdactorTemplate(projectId: string) {
    return this.http
      .get<RedactorResponse>(`${environment.documentManagementURL}/redactor/attachRedactorTemplate?projectId=${projectId}`,
        { headers: new HttpHeaders({ timeout: `${300000}` }) })
      .pipe(
        // retry(1),
        map(res => res),
      //  catchError(this.exceptionService.catchBadResponse),
        finalize(() => {
          this.logger.log("done with attach template");
        })
      );
  }
  updateRedactorProjectNotes(redactorNotes: string) {
    return this.http
      .post<RedactorResponse>(`${environment.documentManagementURL}/redactor/setRedactorNotes`, redactorNotes,
        { headers: new HttpHeaders({ timeout: `${300000}` }) })
      .pipe(
        map(res => res),
      // //  catchError(this.exceptionService.catchBadResponse),
        finalize(() => {
          this.logger.log("done with update redactor notes");
        })
      );
  }
  getUserBySessionId(sessionId: string) {
    return this.http
      .get<any>(`${environment.documentManagementURL}/redactor/getUserBySessionId?sessionId=${sessionId}`)
      .pipe(
        map(res => res.data),
        // catchError(this.exceptionService.catchBadResponse),
        finalize(() => {
          this.logger.log("done with login");
        })
      );
  }
}
