import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";

// order form min prioce validator
export function minPriceValidator(minPrice: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!(control instanceof FormArray)) {
      return null;
    }

    const formArray = control;
    const totalPrice = formArray.controls.reduce((total, control) => {
      const price = control.get('price')?.value || 0;
      const count = control.get('count')?.value || 0;
      return total + price * count;
    }, 0);

    return (totalPrice / 100) >= minPrice ? null : { minPrice: { required: minPrice, actual: totalPrice } };
  };
} 