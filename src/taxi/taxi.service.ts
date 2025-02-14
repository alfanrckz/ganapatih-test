import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TaxiService {
  private readonly apiUrl = 'https://data.cityofnewyork.us/resource/gkne-dk5s.json';

  async getData(filters: any, page: number = 1, limit: number = 10) {
    try {
      const response = await axios.get(this.apiUrl);
      let data = response.data;

      // Filter berdasarkan area (bounding box)
      if (filters.min_lat && filters.max_lat && filters.min_lng && filters.max_lng) {
        data = data.filter(item =>
          item.pickup_latitude >= filters.min_lat &&
          item.pickup_latitude <= filters.max_lat &&
          item.pickup_longitude >= filters.min_lng &&
          item.pickup_longitude <= filters.max_lng
        );
      }

      // Filter berdasarkan jarak (dari titik pusat tertentu)
      if (filters.center_lat && filters.center_lng && filters.radius) {
        data = data.filter(item => {
          const distance = this.calculateDistance(
            filters.center_lat, filters.center_lng,
            item.pickup_latitude, item.pickup_longitude
          );
          return distance <= filters.radius;
        });
      }

      // Filter berdasarkan waktu pickup/dropoff
      if (filters.start_time && filters.end_time) {
        const startTime = new Date(filters.start_time).getTime();
        const endTime = new Date(filters.end_time).getTime();
        data = data.filter(item => {
          const pickupTime = new Date(item.pickup_datetime).getTime();
          return pickupTime >= startTime && pickupTime <= endTime;
        });
      }

      // Filter berdasarkan jumlah penumpang
      if (filters.min_passengers) {
        data = data.filter(item => Number(item.passenger_count) >= filters.min_passengers);
      }
      if (filters.max_passengers) {
        data = data.filter(item => Number(item.passenger_count) <= filters.max_passengers);
      }

      // Filter berdasarkan tarif dan jarak
      if (filters.min_fare) {
        data = data.filter(item => Number(item.fare_amount) >= filters.min_fare);
      }
      if (filters.max_fare) {
        data = data.filter(item => Number(item.fare_amount) <= filters.max_fare);
      }
      if (filters.min_distance) {
        data = data.filter(item => Number(item.trip_distance) >= filters.min_distance);
      }
      if (filters.max_distance) {
        data = data.filter(item => Number(item.trip_distance) <= filters.max_distance);
      }

      // Pagination
      const totalItems = data.length;
      const startIndex = (page - 1) * limit;
      const paginatedData = data.slice(startIndex, startIndex + limit);

      return {
        totalItems,
        page,
        limit,
        totalPages: Math.ceil(totalItems / limit),
        data: paginatedData,
      };
    } catch (error) {
      throw new HttpException('Error fetching data', HttpStatus.BAD_GATEWAY);
    }
  }

  // Haversine Formula untuk menghitung jarak antar koordinat
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius Bumi dalam km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
}
