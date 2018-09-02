import { Injectable } from '@angular/core';
import { map, delay, catchError, finalize} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ExceptionService } from '@app/core/services/exception.service';
import { environment } from '../../../environments/environment';
import {RegulatoryData} from '@app/modules/document-management/model/regulatory-data.model';
import {LoggerService} from '@app/core/services/logger.service';
import {ArchiveResponse} from '@app/modules/document-management/model/archive-response.model';
import {Eligibility} from '@app/modules/document-management/model/eligibility.model';
import {Task} from '@app/core/model/workfront/Task.model';
import { TaskList } from '@app/modules/document-management/task-list';
import {of} from 'rxjs/index';


@Injectable()
export class DMService {

  constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService,
    private logger: LoggerService
  ) {}
  getPDFPreviewByDocumentID(documentID: string) {
    return this.http
      .get(`${environment.documentManagementURL}/documentManagement/pdfPreview?documentId=${documentID}`, {
        responseType: 'blob'
      })
      .pipe(
        map(res => res),
        delay(5000),
        catchError(this.exceptionService.catchBadResponse),
        finalize(() => {
          this.logger.log("done with retrieving PEF preview data");
        })
      );
  }
  getDocumentListByObjectId(objectId: string) {
    return this.http
      .get(`${environment.documentManagementURL}/portal/documentList?objectId=${objectId}`)
      .pipe(
        map(res => res),
        catchError(this.exceptionService.catchBadResponse),
        finalize(() => {
          this.logger.log("done with retrieving document list data");
        })
      );
  }
  getArchivalEligibilityByDocumentIdAndUserId(documentId: string, userId: string) {
    return this.http
      .get<Eligibility>(`${environment.documentManagementURL}/documentManagement/eligibility?documentId=${documentId}&userId=${userId}`)
      .pipe(
        map(res => res),
        catchError(this.exceptionService.catchBadResponse),
        finalize(() => {
          this.logger.log("done with retrieving eligibility data");
        })
      );
  }
  getRegulatoryActionByDocumentID(documentID) {
    return this.http
      .get<RegulatoryData>(`${environment.documentManagementURL}/documentManagement/regulatoryActions?documentId=${documentID}`)
      .pipe(
        map(res => res),
        catchError(this.exceptionService.catchBadResponse),
        finalize(() => {
          this.logger.log("done with retrieving regulatory data");
        })
      );
  }
  portalLogIn(emailAddress: string) {
    console.log(emailAddress);
    return this.http
      .get<RegulatoryData>(`${environment.documentManagementURL}/portal/security/getUserByEmailAddress?emailAddress=${emailAddress}`)
      .pipe(
        map(res => res),
        catchError(this.exceptionService.catchBadResponse),
        finalize(() => {
          this.logger.log("done with login");
        })
      );
  }
  getTaskListByUserId(userId) {
    return of(TaskList).pipe(delay(5000));
    // return this.http
    //   .get<Task[]>(`${environment.documentManagementURL}/portal/taskList?userId=${userId}`)
    //   .pipe(
    //     map(res => res),
    //     catchError(this.exceptionService.catchBadResponse),
    //     finalize(() => {
    //       this.logger.log("done with task list data");
    //     })
    //   );
  }
  getTaskByTaskId(taskId) {
    return this.http
      .get<Task[]>(`${environment.documentManagementURL}/portal/task?taskId=${taskId}`)
      .pipe(
        map(res => res),
        catchError(this.exceptionService.catchBadResponse),
        finalize(() => {
          this.logger.log("done with task data");
        })
      );
  }
}
