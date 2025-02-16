import { Controller, Get, Query } from "@nestjs/common";
import { TaxiService } from "./taxi.service";
import { MonthlyTrip } from "./taxi.service"

@Controller('taxi')
export class TaxiController {
  constructor(private readonly taxiService: TaxiService) {}

  @Get()
  async getTaxiData(
    @Query('vendor_id') vendor_id?: string,
    @Query('payment_type') payment_type?: string,
    @Query('min_lat') min_lat?: number,
    @Query('max_lat') max_lat?: number,
    @Query('min_lng') min_lng?: number,
    @Query('max_lng') max_lng?: number,
    @Query('center_lat') center_lat?: number,
    @Query('center_lng') center_lng?: number,
    @Query('radius') radius?: number,
    @Query('start_time') start_time?: string,
    @Query('end_time') end_time?: string,
    @Query('min_passengers') min_passengers?: number,
    @Query('max_passengers') max_passengers?: number,
    @Query('min_fare') min_fare?: number,
    @Query('max_fare') max_fare?: number,
    @Query('min_distance') min_distance?: number,
    @Query('max_distance') max_distance?: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.taxiService.getData({
      vendor_id,
      payment_type,
      min_lat, max_lat, min_lng, max_lng,
      center_lat, center_lng, radius,
      start_time, end_time,
      min_passengers, max_passengers,
      min_fare, max_fare,
      min_distance, max_distance
    }, Number(page), Number(limit));
  }

  @Get("monthly-trip-count")
  async getMonthlyTripCount(@Query() filters: any): Promise<MonthlyTrip[]> {
    return this.taxiService.getMonthlyTripCount(filters);
  }

}