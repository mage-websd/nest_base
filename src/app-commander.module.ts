import { Module } from '@nestjs/common';
import { SeedCommand, QueueRunCommand } from './commands';
import { dbProviders } from './provides/db.provide';

@Module({
  imports: [],
  controllers: [],
  providers: [...dbProviders, SeedCommand, QueueRunCommand],
})
export class AppCommanderModule {}
