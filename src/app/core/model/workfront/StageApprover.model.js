import {User} from "./User.model";

export class StageApprover {
  ID: string;
  approvalStepID: string;
  customerID: string;
  roleID: string;
  teamID: string;
  userID: string;
  wildCard: string;
  user: User;
}
