import {Directive, input} from '@angular/core';
import {ResponseSummary} from '../model/edit-form/responses/summary/response-summary';

@Directive()
export class EditFormResponseSummaryComponent<R extends ResponseSummary> {

  responseSummary = input.required<R>();

}
