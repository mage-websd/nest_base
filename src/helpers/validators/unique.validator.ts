import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Not, ObjectLiteral, Repository } from 'typeorm';
import __ from '../lang';

interface IUniqueOption {
  repository: Repository<ObjectLiteral>; // repository - table find item unique
  column: string; // column in table unique
  sameColumn?: string; // column where not in
  label?: string; // label replace message column name
}

/**
 * use dto
 * 
 * @Validate(UniqueValidator, [
    {
      repository: UserRepository,
      column: 'mail',
      sameColumn: 'id',
      label: 'mail',
    },
  ])

 */

@ValidatorConstraint({ name: 'unique', async: true })
export class UniqueValidator implements ValidatorConstraintInterface {
  public async validate(value: string, args: ValidationArguments) {
    if (!value) {
      return true;
    }
    const options: IUniqueOption = args.constraints[0];
    const where = {};
    where[options.column] = value;

    if (options.sameColumn && args.object[options.sameColumn]) {
      where[options.sameColumn] = Not(args.object[options.sameColumn]);
    }

    const result = await options.repository.findOne({
      select: ['id'],
      where,
    });

    return result ? false : true;
  }

  public defaultMessage(args: ValidationArguments) {
    const options: IUniqueOption = args.constraints[0];

    return __('unique', {
      field: options.label ?? options.column,
    });
  }
}
