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
    if(documentList.documents.length > 0) {
      this.userId = userId;
      this.projectStatus = documentList.documents[0]["project"]["status"];
      if (DocumentConfig.projectClosedCode.includes(this.projectStatus)) {
        this.projectClosed = true;
      }
      documentList.documents.forEach(doc => {
        const documentData: DocumentData = new DocumentData();
        documentData.documentID = doc["id"];
        documentData.documentName = `${doc["name"]}.${doc["currentVersion"]['ext']}`;
        // documentData.lastUpdatedDate =  moment(new Date(doc['lastModDate'])).format("MM/DD/YYYY HH:mm:ss");
        documentData.lastUpdatedDate = new Date(doc['lastModDate']);

        documentData.customFormData = this.setCustmFormData(doc["parameterValues"]);
        this.setDocumentEligibility(documentData, documentList.eligibility, doc);
        this.setDocumentApprovers(documentData, doc);
        documentData.documentLinkURL = this.setDocumentLinkURL(documentData, doc);
        documentData.previewEligible = this.setDocumentPreview(documentData, doc);
        documentData.actionEligible = this.setDocumentAction(documentData);
        this.documentDataList.push(documentData);
      });
    }
    return this.documentDataList;
  }
  setDocumentAction(document: DocumentData): boolean {
    let result = true;
    if (document.archivalStatus === "Archived" && !document.reArchivalEligible) {
      result = false;
    }
    return result;
  }
  setDocumentPreview(document: DocumentData, doc: object): boolean {
    let result = false;
    const ext = doc["currentVersion"]['ext'];
    if (DocumentConfig.previewEligibleType.includes(ext)) {
      if (document.reArchivalEligible) {
        result = true;
      } else {
        if (!DocumentConfig.noPreviewCode.includes(document.archivalStatus)) {
          result = true;
        }
      }
    }
    return result;
  }
  setDocumentEligibility(document: DocumentData, eligibilityList: Eligibility[], doc: object) {
    const eligibility: Eligibility = eligibilityList.filter(e => {
      return e.documentID === document.documentID;
    })[0];
    document.archivalStatus = eligibility.reason;
    document.archivalEligible = eligibility.archivalEligible;
    if (document.archivalStatus === "Archived" && doc["currentVersion"]["externalIntegrationType"] !== "WEBHOOKS") {
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
  setRegulatoryActionData(regulatoryActions: ValuePair[]): ValuePair[] {
    const regulatoryActionData: ValuePair[] = [];
    if (regulatoryActions !== null) {
      const regulatoryActionMap: ValuePair[] = regulatoryActions.sort();
      const actionsWithoutPrefix: string[] = [];
      const regulatoryActionMap2: Object[] = [];
      regulatoryActionMap.forEach(function (item) {
        for (let action in item) {
          const value = item[action];
          if (action.substring(0, 3) === "DE:") {
            action = action.substring(3);
          }
          actionsWithoutPrefix.push(action);
          const obj = {};
          obj[action] = value;
          regulatoryActionMap2.push(obj);
        }
      });
      actionsWithoutPrefix.sort().forEach(sortAction => {
        regulatoryActionMap2.forEach(item => {
          for (const action in item) {
            if (action === sortAction) {
              if (item[action] !== "" && item[action] !== null && !DocumentConfig.regulatoryActionExcludeFields.includes(action)) {
                const regulatoryActionObj: ValuePair = new ValuePair();
                regulatoryActionObj.name = action;
                regulatoryActionObj.value = this.parseDateField(action, item[action]);
                regulatoryActionData.push(regulatoryActionObj);
              }
            }
          }
        });
      });
    }
    return regulatoryActionData;
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

