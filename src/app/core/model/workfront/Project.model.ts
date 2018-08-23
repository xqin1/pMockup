export interface ProjecCustomField {
  "DE:Goal Date": string;
  "DE:Submission Classification";
  "DE:Supplement Sub Type";
  "DE:FDA Received Date";
  "DE:GDUFA Goal Date";
  "DE:Applicant";
  "DE:Established Name";
  "DE:Dosage Form";
  "DE:Submission Type";
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
