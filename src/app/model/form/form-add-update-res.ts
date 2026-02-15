export interface FormAddUpdateRes {
  id: string,
  title: string,
  description: string,
  published: boolean,
  acceptingResponse: boolean,
  notAcceptingResponseMessage: string | null,
  stopAcceptingResponseOn: Date,
  stopAcceptingResponseAfterResponse: number,
}
