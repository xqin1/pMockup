import {User} from '@app/core/model/workfront/User.model';

export class Category {
  readonly OBJCODE: string = "CTGY";
  ID: string;
  customerID: string;
  description: string;
  enteredByID: string;
  extRefID: string;
  groupID: string;
  hasCalculatedFields: string;
  lastUpdateDate: Date;
  astUpdatedByID: string;
  name: string;
  customer: object;
  enteredBy: User;
  group: object;
  lastUpdatedBy: object;
  categoryCascadeRules: object[];
  categoryParameters: object[];
  otherGroups: object[];
}
