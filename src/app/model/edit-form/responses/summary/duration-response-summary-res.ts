import {ResponseSummary} from './response-summary';

export interface DurationResponseSummaryRes extends ResponseSummary {
  responses: Response[]
}

export interface Response {
  hours: number,
  minutes: number,
  seconds: number
}
