import {AnyQuestionRes} from '../../type/any-question-res';
import {FormAddUpdateRes} from './form-add-update-res';

export interface FormRes extends FormAddUpdateRes {
  questions: AnyQuestionRes[]
}
