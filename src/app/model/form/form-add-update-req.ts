export interface FormAddUpdateReq {
  title: string,
  description: string,
  published: boolean,
  acceptingResponse: boolean,
  notAcceptingResponseMessage: string | null,
  stopAcceptingResponseOn: Date | null,
  stopAcceptingResponseAfterResponse: number | null,
  userId: string
}
