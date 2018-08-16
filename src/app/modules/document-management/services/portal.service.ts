import { Injectable } from '@angular/core';
import {LoggerService} from '@app/core/services/logger.service';
import { User } from '@app/core/model/workfront/User.model';

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  user: User = new User();
  constructor(
    private logger: LoggerService
  ) { }
  setCurrentUser(user: User) {
    this.user = user;
  }
}
