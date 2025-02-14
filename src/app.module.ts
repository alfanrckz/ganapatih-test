import { Module } from '@nestjs/common';
import { TaxiService } from './taxi/taxi.service';
import { TaxiController } from './taxi/taxi.controller';

@Module({
  imports: [],
  controllers: [TaxiController],
  providers: [TaxiService],
})
export class AppModule {}
