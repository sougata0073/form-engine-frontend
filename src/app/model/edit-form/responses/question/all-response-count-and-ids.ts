export interface AllResponseCountAndIds {
  totalResponseCount: string,
  responses: FormResponseSummary[]
}

export interface FormResponseSummary {
  responseId: string,
  responderId: string,
  responderUserName: string,
  responderEmail: string,
  responderAvatarUrl: string
}
