export interface ProjecCustomField {
  "DE:Goal Date": string;
  "DE:Submission Classification": string;
  "DE:Supplement Sub Type": string;
  "DE:FDA Received Date": string;
  "DE:GDUFA Goal Date": string;
  "DE:Applicant": string;
  "DE:Established Name": string;
  "DE:Dosage Form": string;
  "DE:Submission Type": string;
  "DE:Product": string;
  "DE:Quality Date": string;
  "DE: Quality Mid Review Date": string;
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
