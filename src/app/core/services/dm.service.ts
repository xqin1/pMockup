import { Injectable } from '@angular/core';
import { map, delay, catchError, finalize} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ExceptionService } from '@app/core/services/exception.service';
import { environment } from '../../../environments/environment';
import {RegulatoryData} from '@app/modules/document-management/model/regulatory-data.model';
import {LoggerService} from '@app/core/services/logger.service';
import {ArchiveResponse} from '@app/modules/document-management/model/archive-response.model';
import {Eligibility} from '@app/modules/document-management/model/eligibility.model';


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
      .get(`${environment.documentManagementURL}/documentManagement/documentList?objectId=${objectId}`)
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
          // do something
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
          // do something
          this.logger.log("done with retrieving regulatory data");
        })
      );
  }
}
