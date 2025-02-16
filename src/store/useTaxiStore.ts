import { create } from 'zustand';
import axios from 'axios';

export interface TaxiData {
  vendor_id: string;
  pickup_latitude: number;
  pickup_longitude: number;
  dropoff_latitude: number;
  dropoff_longitude: number;
  fare_amount: number;
  trip_distance: number;
  passenger_count: number;
  payment_type: string;
  pickup_datetime: string;
  dropoff_datetime: string;
}

interface Filters {
  min_fare?: number;
  max_fare?: number;
  min_distance?: number;
  max_distance?: number;
  payment_type?: string;
  start_time?: string;
  end_time?: string;
}

interface TaxiStore {
  // Properti untuk error dan mapType
  error: string | null;
  mapType: "Street" | "Satellite" | "Terrain";
  setMapType: (type: "Street" | "Satellite" | "Terrain") => void;

  // Common filters
  filters: Filters;
  setFilters: (filters: Partial<Filters>) => void;

  // --- SCATTER STATE ---
  scatterData: TaxiData[];
  scatterPage: number;
  scatterLimit: number;
  scatterHasMore: boolean;
  scatterLoading: boolean;
  fetchScatterData: (reset?: boolean, pageOverride?: number, limit?: number) => Promise<void>;
  loadMoreScatter: () => Promise<void>;

  // --- LINE CHART STATE ---
  lineChartData: TaxiData[];
  lineChartPage: number;
  lineChartLimit: number;
  lineChartLoading: boolean;
  fetchLineChartData: (reset?: boolean, pageOverride?: number, limit?: number) => Promise<void>;

  
  // --- MAP STATE ---
  mapData: TaxiData[];
  mapPage: number;
  mapLimit: number;
  mapHasMore: boolean;
  mapLoading: boolean;
  fetchMapData: (reset?: boolean, pageOverride?: number, limit?: number) => Promise<void>;
  loadMoreMap: () => Promise<void>;

  // barChartData: TaxiData[];
  // fetchBarChartData: (reset?: boolean, pageOverride?: number, limit?: number) => Promise<void>;

  // Optional: data summary (totalItems, dll)
  totalItems: number;
}


export const useTaxiStore = create<TaxiStore>((set, get) => ({
  // Properti untuk error dan mapType
  error: null,
  mapType: "Street",
  setMapType: (type) => set({ mapType: type }),

  // Common filters
  filters: {},
  setFilters: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters } });
    // Reset kedua slice data ketika filter berubah
    get().fetchScatterData(true, 1, get().scatterLimit);
    get().fetchMapData(true, 1, get().mapLimit);
    get().fetchLineChartData(true, 1, get().lineChartLimit);
  },

  // --- SCATTER STATE ---
  scatterData: [],
  scatterPage: 1,
  scatterLimit: 10,
  scatterHasMore: true,
  scatterLoading: false,

  // --- LINE CHART STATE ---
  lineChartData: [],
  lineChartPage: 0,
  lineChartLimit: 10,
  lineChartLoading: false,




  fetchScatterData: async (reset = false, pageOverride?: number, limit?: number) => {
    set({ scatterLoading: true });
    try {
      const { filters, scatterLimit } = get();
      const currentLimit = limit ?? scatterLimit;
      const currentPage = reset ? 1 : pageOverride ?? get().scatterPage;

      const params = new URLSearchParams(
        Object.entries({ ...filters, page: currentPage, limit: currentLimit }).reduce(
          (acc, [key, value]) => {
            if (value !== undefined) acc[key] = String(value);
            return acc;
          },
          {} as Record<string, string>
        )
      ).toString();

      const response = await axios.get(`http://localhost:3000/taxi?${params}`);
      const newData: TaxiData[] = response.data.data;

      const updatedData = reset ? newData : [...get().scatterData, ...newData];
      const hasMore = newData.length === currentLimit;

      set(() => ({
        scatterData: updatedData,
        scatterPage: currentPage + 1,
        scatterHasMore: hasMore,
        scatterLimit: currentLimit,
        scatterLoading: false,
        totalItems: response.data.totalItems,
        // Update global summary dari respons API
        totalTrips: response.data.totalTrips,
        totalDistance: response.data.totalDistance,
        averageDistance: response.data.averageDistance,
      }));
    } catch (error) {
      set({ scatterLoading: false, error: 'Gagal mengambil data' });
    }
  },

  loadMoreScatter: async () => {
    const { scatterLimit } = get();
    await get().fetchScatterData(false, undefined, scatterLimit);
  },


  fetchLineChartData: async (reset = false, pageOverride?: number, limit?: number) => {
    set({ lineChartLoading: true });
    try {
      const { filters, scatterLimit } = get();
      const currentLimit = limit ?? scatterLimit;
      const currentPage = reset ? 1 : pageOverride ?? get().scatterPage;

      const params = new URLSearchParams(
        Object.entries({ ...filters, page: currentPage, limit: currentLimit }).reduce(
          (acc, [key, value]) => {
            if (value !== undefined) acc[key] = String(value);
            return acc;
          },
          {} as Record<string, string>
        )
      ).toString();

      const response = await axios.get(`http://localhost:3000/taxi?${params}`);
      const newData: TaxiData[] = response.data.data;

      const updatedData = reset ? newData : [...get().scatterData, ...newData];
      const hasMore = newData.length === currentLimit;

      set(() => ({
        lineChartData: updatedData,
        lineChartPage: currentPage + 1,
        scatterHasMore: hasMore,
        lineChartLimit: currentLimit,
        // scatterLoading: false,
        // totalItems: response.data.totalItems,
        // Update global summary dari respons API
        // totalTrips: response.data.totalTrips,
        // totalDistance: response.data.totalDistance,
        // averageDistance: response.data.averageDistance,
      }));
    } catch (error) {
      set({ scatterLoading: false, error: 'Gagal mengambil data' });
    }
  },

  

  // --- MAP STATE ---
  mapData: [],
  mapPage: 1,
  mapLimit: 10, // default untuk map
  mapHasMore: true,
  mapLoading: false,
  fetchMapData: async (reset = false, pageOverride?: number, limit?: number) => {
    set({ mapLoading: true });
    try {
      const { filters, mapLimit } = get();
      const currentLimit = limit ?? mapLimit;
      const currentPage = reset ? 1 : pageOverride ?? get().mapPage;

      const params = new URLSearchParams(
        Object.entries({ ...filters, page: currentPage, limit: currentLimit }).reduce(
          (acc, [key, value]) => {
            if (value !== undefined) acc[key] = String(value);
            return acc;
          },
          {} as Record<string, string>
        )
      ).toString();

      const response = await axios.get(`http://localhost:3000/taxi?${params}`);
      const newData: TaxiData[] = response.data.data;

      const updatedData = reset ? newData : [...get().mapData, ...newData];
      const hasMore = newData.length === currentLimit;

      set(() => ({
        mapData: updatedData,
        mapPage: currentPage + 1,
        mapHasMore: hasMore,
        mapLimit: currentLimit,
        mapLoading: false,
        totalItems: response.data.totalItems,
        // Jika summary data sama, bisa update juga di sini (opsional)
        totalTrips: response.data.totalTrips,
        totalDistance: response.data.totalDistance,
        averageDistance: response.data.averageDistance,
      }));
    } catch (error) {
      set({ mapLoading: false, error: 'Gagal mengambil data' });
    }
  },
  loadMoreMap: async () => {
    const { mapLimit } = get();
    await get().fetchMapData(false, undefined, mapLimit);
  },

  totalItems: 0,
  totalTrips: 0,
  totalDistance: 0,
  averageDistance: 0,
}));

