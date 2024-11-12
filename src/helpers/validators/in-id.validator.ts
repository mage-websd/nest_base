import {
  isInt,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { In, ObjectLiteral, Repository } from 'typeorm';
import __ from '../lang';

interface IInIdOption {
  repository: Repository<ObjectLiteral>; // repository - table find item in
  column?: string; // column in table in, default = 'id'
  label?: string; // label replace message column name
  type?: any; //type column, default Number
}

/**
 * use dto
 * 
 * @Validate(InIdValidator, [
    {
      repository: UserRepository,
      // column: 'id',
      // label: 'id',
    },
  ])

 */

@ValidatorConstraint({ name: 'inid', async: true })
export class InIdValidator implements ValidatorConstraintInterface {
  public async validate(value: string, args: ValidationArguments) {
    if (!value) {
      return true;
    }

    const options: IInIdOption = args.constraints[0];
    const where = {};

    if (!options.column) {
      options.column = 'id';
    }

    if (Array.isArray(value)) {
      where[options.column] = In(value);
      const result = await options.repository.count({
        where,
      });

      return result === value.length;
    }

    if (!options.type || options.type === Number) {
      if (!isInt(value)) {
        return true;
      }
    }

    where[options.column] = value;
    const result = await options.repository.findOne({
      select: ['id'],
      where,
    });

    return !!result;
  }

  public defaultMessage(args: ValidationArguments) {
    const options: IInIdOption = args.constraints[0];

    return __('in', {
      label: options.label ?? options.column,
    });
  }
}
