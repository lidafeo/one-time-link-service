import { Module } from '@nestjs/common';
import { OneTimeLinkService } from './one-time-link.service';
import { OneTimeLinkController } from './one-time-link.controller';
import { OneTimeLinkRepository } from './one-time-link.repository';
import { LINK_KEY_LENGTH } from './constants';

@Module({
  imports: [],
  providers: [
    OneTimeLinkService,
    OneTimeLinkRepository,
    {
      provide: LINK_KEY_LENGTH,
      useValue: 12,
    },
  ],
  controllers: [OneTimeLinkController],
  exports: [],
})
export class OneTimeLinkModule {}
