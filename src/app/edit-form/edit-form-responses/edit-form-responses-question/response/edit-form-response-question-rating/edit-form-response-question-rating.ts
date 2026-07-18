import {Component, signal} from '@angular/core';
import {EditFormResponseQuestionComponent} from '../../../../../type/edit-form-response-question-component';
import {
  RatingResponseQuestionRes
} from '../../../../../model/edit-form/responses/question/rating-response-question-res';
import {
  EditFormResponsesQuestionBlankResponse
} from '../../../../../shared/edit-form-responses-question-blank-response/edit-form-responses-question-blank-response';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {ArrayUtil} from '../../../../../util/array-util';
import {RatingIcon} from '../../../../../type/rating-icon';
import {kebabCase} from 'lodash';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-edit-form-response-question-rating',
  imports: [
    EditFormResponsesQuestionBlankResponse,
    MatButton,
    MatCard,
    MatCardContent,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    NgOptimizedImage
  ],
  templateUrl: './edit-form-response-question-rating.html',
  styleUrl: './edit-form-response-question-rating.scss',
})
export class EditFormResponseQuestionRating extends EditFormResponseQuestionComponent<RatingResponseQuestionRes> {

  protected ratingNums = signal<number[]>([])

  override ngOnInit() {
    super.ngOnInit();

    this.ratingNums.set(ArrayUtil.fillByNumbers(1, this.response().maxRatingNumber))
  }

  protected ratingIconToPath(ratingIcon: RatingIcon, suffix: 'activated' | 'deactivated' | 'disabled') {
    const pathPrefix = 'assets/images/rating-icons/'
    return `${pathPrefix}${kebabCase(ratingIcon)}-${suffix}.svg`
  }
}
