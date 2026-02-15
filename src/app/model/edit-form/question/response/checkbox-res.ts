import {QuestionRes} from './question-res';
import {ValidationConfig} from '../../../validation-config/validation-config';

export interface OnlyCheckboxRes<VC extends ValidationConfig> {
  options: string[],
  validationConfig: VC
}

export interface CheckboxRes<VC extends ValidationConfig> extends OnlyCheckboxRes<VC>, QuestionRes {
}
