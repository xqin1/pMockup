export const DocumentConfig = {
  navigation: [
    {name: "Select Document", value: "select", index: 0, icon: "find_in_page"},
    {name: "Validate", value: "validate", index: 1, icon: "check_circle"},
    {name: "Confirm Archive", value: "confirm", index: 2, icon: "unarchive"}
  ],
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
  sectionTitle: {
    "customFormTitle": "Validate Smart Template Interview Information",
    "regulatoryTitle": "Review Regulatory Information",
    "projectClosed": "The review is complete and no documents can be archived"
  },
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
    "pdf",
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
    {"name": "Build", "index": 0, "color": "#375e9e"},
    {"name": "Concur", "index": 1, "color": "#20f7f7"},
    {"name": "Sign", "index": 2, "color": "#30a362"},
    {"name": "Archive", "index": 3, "color": "#991030"},
    {"name": "Upload", "index": 0, "color": "#c85def"},
    {"name": "N/A", "index": 0, "color": "#ef1c04"},
]


};
