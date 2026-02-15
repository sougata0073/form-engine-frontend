export interface ViewFormErrorRes {
  formTitle: string | null,
  reason: 'NOT_PUBLISHED' | 'NOT_ACCEPTING_RESPONSE',
  message: string
}
