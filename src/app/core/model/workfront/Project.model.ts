export interface ProjecCustomField {
  "DE:Goal Date": string;
}
export class Project {
  ID: string;
  name: string
  plannedCompletionDate: Date;
  plannedStartDate: Date;
  projectedCompletionDate: Date;
  status: string;
  objCode: string;
  parameterValues: ProjecCustomField;

}
