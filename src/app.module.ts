import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OneTimeLinkModule } from './modules/one-time-links/one-time-link.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    OneTimeLinkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
