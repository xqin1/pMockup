import { Injectable } from '@angular/core';
import { map, catchError, finalize} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ExceptionService } from '@app/core/services/exception.service';
import { environment } from '../../../environments/environment';
import {RegulatoryData} from '@app/modules/document-management/model/regulatory-data.model';
import {LoggerService} from '@app/core/services/logger.service';
import {ArchiveResponse} from '@app/modules/document-management/model/archive-response.model';


@Injectable()
export class PEFService {

  constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService,
    private logger: LoggerService
  ) {}
  getDocumentListByObjectID(objectID) {
    return this.http
      .get<any>(`${environment.pefDocumentArchiveURL}/getDocumentsByObjectId?objectId=${objectID}`)
      .pipe(
        map(res => res),
        catchError(this.exceptionService.catchBadResponse),
        finalize(() => {
          this.logger.log("done with retrieving document list data");
        })
      );
  }
  getRegulatoryActionByDocumentID(documentID) {
    return this.http
      .get<RegulatoryData>(`${environment.pefDocumentArchiveURL}/getRegulatoryActions?documentID=${documentID}`)
      .pipe(
        map(res => res),
        catchError(this.exceptionService.catchBadResponse),
        finalize(() => {
          // do something
          this.logger.log("done with retrieving regulatory data");
        })
      );
  }
  archiveDocument(documentID: string, userID: string) {
    return this.http
      .get<ArchiveResponse>(`${environment.pefDocumentArchiveURL}/archiveDocument?documentID=${documentID}&userSessionID=null&userID=${userID}`)
      .pipe(
        map(res => res),
        catchError(this.exceptionService.catchBadResponse),
        finalize(() => {
          // do something
          this.logger.log("done with archiving document");
        })
      );
  }
}
