Nestjs base
------

## Installation

```bash
$ npm install
```

## Command the app

1. Start app
    ```bash
    # watch mode
    $ npm run start:dev

    # production mode
    $ npm run start:prod
    ```

1. Check coding convention with eslint
    ```bash
    npm run lint
    ```

1. Migration:

    ```bash
    # Run migration with new struct
    npm run typeorm migration:run

    # Revert (rollback) migration
    npm run typeorm migration:revert

    # Create file migration
    npm run migration:create ./src/databases/migrations/alter-struct-table
    ```

1. Seeder:
    ```bash
    npm run seed:run src/databases/seeders/file.seeder.ts
    ```

## DEVELOPER DOCS
read more [docs](./docs/)
