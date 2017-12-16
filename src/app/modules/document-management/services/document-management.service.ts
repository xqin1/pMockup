import { Injectable } from '@angular/core';
import { DocumentList} from '@app/modules/document-management/model/document-list.model';
import * as moment from 'moment';
import {Eligibility} from '@app/modules/document-management/model/document-list.model';
import { DocumentData} from '@app/modules/document-management/model/documant-data.model';
import { DocumentConfig } from '@app/modules/document-management/config.ts';
import {ValuePair} from '@app/modules/document-management/model/value-pair.model';

@Injectable()
export class DocumentManagementService {
  documentListLoaded = false;
  documentDataList: DocumentData[] = [];
  projectStatus: string = null;
  projectClosed = false;
  userId: string = null;
  constructor() { }

  processDocumentList(documentList: DocumentList, userId: string): DocumentData[] {
    this.userId = userId;
    this.projectStatus = documentList.documents[0]["project"]["status"];
    if (DocumentConfig.projectClosedCode.includes(this.projectStatus)) {
      this.projectClosed = true;
    }
    documentList.documents.forEach(doc => {
      const documentData: DocumentData = new DocumentData();
      documentData.documentID = doc["id"];
      documentData.documentName = `${doc["name"]}.${doc["currentVersion"]['ext']}`;
      documentData.lastUpdatedDate =  moment(new Date(doc['lastModDate'])).format("MM/DD/YYYY HH:mm:ss");
      documentData.customFormData = this.setCustmFormData(doc["parameterValues"]);
      this.setDocumentEligibility(documentData, documentList.eligibility, doc);
      this.setDocumentApprovers(documentData, doc);
      documentData.documentLinkURL = this.setDocumentLinkURL(documentData, doc);
      this.documentDataList.push(documentData);
    });
    return this.documentDataList;
  }

  setDocumentEligibility(document: DocumentData, eligibilityList: Eligibility[], doc: object) {
    const eligibility: Eligibility = eligibilityList.filter(e => {
      return e.documentID === document.documentID;
    })[0];
    document.archivalStatus = eligibility.reason;
    document.archivalEligible = eligibility.archivalEligible;
    if (!document.archivalEligible && doc["currentVersion"]["externalIntegrationType"] !== "WEBHOOKS") {
      document.reArchivalEligible = true;
    }else {
      document.reArchivalEligible = false;
    }
   }

  setDocumentApprovers(document: DocumentData, doc: object) {
    const array = [];
    const data = doc["approvals"];

    for (let i = 0; i < data.length; i++) {
      const status = data[i]['status'];
      if (data[i]['status'] !== "CANCELED") {
        const statusTrimmed = status.replace(/_/g, ' ');
        let approval = data[i]['approver']['displayName'] + " - " + statusTrimmed;

        if (data[i]['status'] !== "NEW") {
          const approvalDate = new Date(data[i]['approvalDate']);
          approval += ' ' + moment(approvalDate).format("MM/DD/YYYY");
        }
        array[i] = approval;
      }
    }
    document.approvers =  array;
  }

  setCustmFormData(customForms: object): ValuePair[] {
    const customFormData: ValuePair[] = [];
    const actionsWithoutPrefix: string[] = [];
    const customForms2 = [];
    if (customForms !== null) {
      for (let action in customForms) {
        const value = customForms[action];

        if (action.substring(0, 3) === "DE:") {
          action = action.substring(3);
        }
        actionsWithoutPrefix.push(action);
        const obj = {};
        obj[action] = value;
        customForms2.push(obj);
      }
      actionsWithoutPrefix.sort().forEach(sortAction => {
        customForms2.forEach(item => {
          for (const action in item) {
            if (action === sortAction) {
              if (item[action] !== "" && item[action] !== null && !DocumentConfig.customFormExcludeFields.includes(action)) {
                const customFormObj: ValuePair = new ValuePair();
                customFormObj.name = action;
                customFormObj.value = this.parseDateField(action, item[action]);
                customFormData.push(customFormObj);
              }
            }
          }
        });
      });
    }
    return customFormData;
  }
  parseDateField(fieldName: string, fieldValue: string): string {
    let result = null;
    if (fieldName.includes("Date")) {
      // for date format YYYY-MM-DD
      if (fieldValue.split("-").length === 3) {
        result = moment(fieldValue, "YYYY-MM-DD").format("MM/DD/YYYY");
      }
      // for date format YYYY-MM-DDThh:mm:ss:000-0400"
      if (fieldValue.split("T").length === 2) {
        const newFieldValue = fieldValue.split("T")[0];
        result = moment(newFieldValue, "YYYY-MM-DD").format("MM/DD/YYYY");
      }

      // for list of date format YYYY-MM-DD
      if (fieldValue.split(",").length > 1) {
        const newArray = [];
        for (const item of fieldValue.split(",")){
          if (item.split("-").length === 3) {
            newArray.push(moment(item, "YYYY-MM-DD").format("MM/DD/YYYY"));
          }
        }
        if (newArray.length === fieldValue.split(",").length) {
          result = newArray.toString();
        }
      }
    }
    if (result !== null && result !== "Invalid date") {
      return result;
    }else {
      return fieldValue;
    }
  }
  setDocumentLinkURL(document: DocumentData, doc: object): string {
    let documentLink: string = null;
    if (!DocumentConfig.noDocumentLinkingCode.includes(document.archivalStatus)) {
      if (typeof doc["parameterValues"] !== 'undefined' ) {
        if (typeof doc["parameterValues"]["DE:Access to Document Linking"] !== "undefined") {
          documentLink = doc["parameterValues"]["DE:Access to Document Linking"];
        }
      }
    }
    return documentLink;
  }
}

