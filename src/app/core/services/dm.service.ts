import { Injectable } from '@angular/core';
import {map, delay, catchError, finalize, retry} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ExceptionService } from '@app/core/services/exception.service';
import { environment } from '../../../environments/environment';
import {LoggerService} from '@app/core/services/logger.service';
import {RedactorResponse} from '@app/modules/redactor/models/redactor-response.model';
const serviceOrigin = location.origin;
@Injectable()
export class DMService {
  constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService,
    private logger: LoggerService,
  ){
    console.log(serviceOrigin);
  }

  ////////////////////////////////////////////////////////////////////////////////////
  // redactor API
  //////////////////////////////////////////////////////////////////////////////////////
  getRedactorTaskByTaskId(taskId) {
    return this.http
      .get<any>(`${serviceOrigin}/${environment.documentManagementURL}/redactor/getRedactorTask?taskId=${taskId}`)
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
      .get<any>(`${serviceOrigin}/${environment.documentManagementURL}/redactor/getApplicationNumber?appType=${appType}&appNumber=${appNumber}&limit=${limit}`)
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
      .get<any>(`${serviceOrigin}/${environment.documentManagementURL}/redactor/getPostApprovalProjects?appType=${appType}&appNumber=${appNumber}`)
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
      .get<RedactorResponse>(`${serviceOrigin}/${environment.documentManagementURL}/redactor/attachRedactorTemplate?projectId=${projectId}`,
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
      .post<RedactorResponse>(`${serviceOrigin}/${environment.documentManagementURL}/redactor/setRedactorNotes`, redactorNotes,
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
      .get<any>(`${serviceOrigin}/${environment.documentManagementURL}/redactor/getUserBySessionId?sessionId=${sessionId}`)
      .pipe(
        map(res => res.data),
        // catchError(this.exceptionService.catchBadResponse),
        finalize(() => {
          this.logger.log("done with login");
        })
      );
  }
}
