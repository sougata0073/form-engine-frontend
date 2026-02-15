import {QuestionAddUpdateReq} from './question-add-update-req';
import {ValidationConfig} from '../../../validation-config/validation-config';

export interface OnlyCheckboxAddUpdateReq<VC extends ValidationConfig> {
  options: string[],
  validationConfig: VC
}

export interface CheckboxAddUpdateReq<VC extends ValidationConfig> extends QuestionAddUpdateReq, OnlyCheckboxAddUpdateReq<VC> {
}
