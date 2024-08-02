import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import __ from '../lang';

@ValidatorConstraint({ name: 'xss', async: false })
export class XssValidator implements ValidatorConstraintInterface {
  public async validate(value: string) {
    return !/[\"<>&:;]/.test(value);
  }

  public defaultMessage() {
    return __('xss');
  }
}
