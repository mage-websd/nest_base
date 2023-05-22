import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Not, Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
class UniqueOnDatabase implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const whereBy = {
      [args.property]: value
    };
    if (args.object['id']) {
      whereBy['id'] = Not(args.object['id']);
    }
    const entity = args.object[`class_entity_${args.property}`];
    const entityExists = await entity.countBy(whereBy);
    return entityExists == 0;
  }
}

export function IsUnique(entity: Repository<any>, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    validationOptions = { ...{ message: propertyName + ' $value already exists. Choose another.' }, ...validationOptions };
    object[`class_entity_${propertyName}`] = entity;
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueOnDatabase,
    });
  };
}
