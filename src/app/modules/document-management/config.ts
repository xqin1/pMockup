export const DocumentConfig = {
  customFormExcludeFields: [
    "Access to Document Linking",
    // "Application Status",
    // "Submission Status",
    "Document Archival Status",
    "Document Signatory Authority",
    "Linked Project/Program GUIDs",
    "Linked Projects/Programs",
    "Requested Delivery Method",
    "Smart Template",
    "Select the appropriate letter template",
    "Template Automation ID"
  ],
  regulatoryActionExcludeFields: [
    "74 Day Filing Issues Goal Closed By",
    "Breakthrough Therapy Designation Goal Closed By",
    "Document Signatory Authority",
    "Fast Track Designation Goal Closed By",
    "Filing Goal Closed By",
    "Labeling and PMR/PMC Discussion Goal Closed By",
    "Meeting Date Goal Closed By",
    "Meeting Minutes Goal Closed By",
    "Meeting Preliminary Responses Goal Closed By",
    "Meeting Response Goal Closed By",
    "OND PDUFA Goal Date Closed By",
    "Proprietary Name Review Goal Closed By"
  ],
  projectClosedCode: [
    "CPL",
    "NAP",
    "CLD"
  ],
  archivingStatusCode: [
    "Archived",
    "Archiving in progress",
    "Archiving start"
  ],
  noDocumentLinkingCode: [
    "Archived",
    "Archiving in Progress",
    "Archiving start"
  ],
  noPreviewCode: [
    "Archived",
    "Archiving in Progress",
    "Archiving start"
  ],
  previewEligibleType: [
    "doc",
    "docx"
  ],
  fakeTaskApprovals: {
    "stageName": "Clinical Review",
    "sequenceNumber": 0,
    "approvers": [
      {
        "approverName": "Xiaoming Qin",
        "approverId": "someUserId",
        "status": "Awaiting Approval"
      },
      {
        "approverName": "James Wong",
        "approverId": "someUserId",
        "status": "Rejected"
      }]
  },
  taskState: [
    {"name": "Select", "index": 0, "color": "#FF8A65", "label": "SELECT", "show": true},
    {"name": "Build", "index": 0, "color": "#222C67", "label": "BUILD", "show": true},
    {"name": "Upload", "index": 0, "color": "#222C67", "label": "BUILD", "show": true},
    {"name": "Concur", "index": 1, "color": "#007CBA", "label": "CONCUR", "show": true},
    {"name": "Sign", "index": 2, "color": "#57950D", "label": "SIGN", "show": true},
    {"name": "Archive", "index": 3, "color": "#6C1B3B", "label": "ARCHIVE", "show": true}
],
  notificationSetting: {
    duration: 3000
  }



};
