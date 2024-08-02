## Modules

#### Log
Package: log4js

1. import: `import logger from 'src/helpers/logs';`
1. Use

    ```
    1. logger.info({attr: value});
    2. logger.error(errorObject, 'string type error')
    ```

#### DB
Package: mysql2, typeorm, typeorm-transactional, @jorgebodega/typeorm-seeding

1. Add migration file: struct db
1. Add entity in folder src/entities/, add export in file src/entities/index.ts
1. Add repository in folder src/repositories/, add export in file src/repositories/index.ts
1. Options create seed: Add file seeder in folder src/seeders/file.seeder.ts, then run commamd to seeder data

#### Auth
package: @nestjs/jwt, bcrypt

1. Change .env:

    ```
      # secrect
      JWT_SECRET=stringrandom 

      # time live of access token (second)
      JWT_EXPIRE=60
    ```
1. import:

    ```
    import { UseGuards } from '@nestjs/common';
    import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
    ```
1. Use @UseGuards(AuthGuard) in controller

#### Multi-language

1. File json text: `lang/en/message.json`
1. Config .env: `APP_LANG=en`
1. Use: 

    ```
    import __ from 'src/helpers/lang';

    __('email', { field: 'mail' })
    ```

#### Validation
package: class-validator

###### Custom validation

1. Unique, XSS rule
1. Import: `import { UniqueValidator } from 'src/helpers/validators/unique.validator';`
1. Use

    ```
    @Validate(UniqueValidator, [
      {
        repository: UserRepository,
        column: 'mail',
        field: 'mail',
      },
    ])
    mail: string;
    ```
