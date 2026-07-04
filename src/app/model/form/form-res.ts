import {AnyQuestionRes} from '../../type/any-question-res';
import {FormInfoRes} from './form-info-res';

export interface FormRes extends FormInfoRes {
  questions: AnyQuestionRes[]
}
