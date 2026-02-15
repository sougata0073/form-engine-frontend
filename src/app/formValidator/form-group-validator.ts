import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class FormGroupValidator {

  static rangeInputs(fromInputName: string, toInputNumber: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const fromNumber = Number( group.get(fromInputName)?.value)
      const toNumber = Number(group.get(toInputNumber)?.value)

      if (fromNumber < toNumber) return null

      return {rangeInputs: {fromNumber: fromNumber, toNumber: toNumber}}
    }
  }

}
