import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

export interface MonthlyTrip {
  month: string;
  totalTrips: number;
}


@Injectable()
export class TaxiService {
  private readonly apiUrl = 'https://data.cityofnewyork.us/resource/gkne-dk5s.json';
  private cachedData: any[] = []

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

      if (filters.start_time && filters.end_time) {
        const startTime = new Date(filters.start_time).getTime();
        const endTime = new Date(filters.end_time).getTime();
        data = data.filter(item => {
          const pickupTime = new Date(item.pickup_datetime).getTime();
          const dropoffTime = item.dropoff_datetime ? new Date(item.dropoff_datetime).getTime() : null;
          return (pickupTime >= startTime && pickupTime <= endTime) || (dropoffTime && dropoffTime >= startTime && dropoffTime <= endTime);
        });
      }

      data = data.map(item => ({
        ...item,
        dropoff_datetime: item.dropoff_datetime || null,
      }));

      if (filters.min_passengers) {
        data = data.filter(item => Number(item.passenger_count) >= filters.min_passengers);
      }
      if (filters.max_passengers) {
        data = data.filter(item => Number(item.passenger_count) <= filters.max_passengers);
      }

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

      // Pagination with limit 10, 100, 500, or 1000
      const totalItems = data.length;
      const startIndex = (page - 1) * limit;
      const paginatedData = data.slice(startIndex, startIndex + limit);

      const totalDistance = data.reduce((acc, item) => acc + Number(item.trip_distance), 0);
      const totalFare = data.reduce((acc, item) => acc + Number(item.fare_amount), 0);
      const totalTrips = data.length;
      const averageFare = totalTrips > 0 ? totalFare / totalTrips : 0;
      const averageDistance = totalTrips > 0 ? totalDistance / totalTrips : 0;

      return {
        totalDistance,
        totalFare,
        totalTrips,
        averageDistance,
        totalItems,
        page,
        limit,
        totalPages: Math.ceil(totalItems / limit),
        data: paginatedData.map(item => ({
          ...item,
          passenger_count: Number(item.passenger_count),
        }))
      };
    } catch (error) {
      throw new HttpException('Error fetching data', HttpStatus.BAD_GATEWAY);
    }
  }

  async getMonthlyTripCount(filters: any) {
    try {
      if (this.cachedData.length === 0) {
        const response = await axios.get(this.apiUrl);
        this.cachedData = response.data || []; 
      }

      let data = [...this.cachedData]; 

      if (filters.start_time && filters.end_time) {
        const startTime = new Date(filters.start_time).getTime();
        const endTime = new Date(filters.end_time).getTime();

        data = data.filter(item => {
          const pickupTime = new Date(item.pickup_datetime).getTime();
          return pickupTime >= startTime && pickupTime <= endTime;
        });
      }

      const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];

      const monthlyCounts: Record<string, MonthlyTrip> = {};

  

      data.forEach(item => {
        const date = new Date(item.pickup_datetime);
        const year = date.getUTCFullYear(); 
        const monthIndex = date.getUTCMonth(); 
        const monthKey = `${year}-${monthIndex}`; 
      
        if (!monthlyCounts[monthKey]) {
          monthlyCounts[monthKey] = { month: monthNames[monthIndex], totalTrips: 0 };
        }
        monthlyCounts[monthKey].totalTrips++;
      });

      const result: MonthlyTrip[] = Object.keys(monthlyCounts)
        .sort((a, b) => {
          const [yearA, monthA] = a.split("-").map(Number);
          const [yearB, monthB] = b.split("-").map(Number);
          return yearA !== yearB ? yearA - yearB : monthA - monthB;
        })
        .map(key => monthlyCounts[key]);

      return result;
    } catch (error) {
      throw new HttpException("Error fetching data", HttpStatus.BAD_GATEWAY);
    }
  }
  
  

  
  

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

