import { Injectable } from '@angular/core';
import { map, catchError, finalize} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ExceptionService } from '@app/core/services/exception.service';
import { environment } from '../../../environments/environment';
import {LoggerService} from '@app/core/services/logger.service';


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
}
