import 'leaflet/dist/leaflet.css';
import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import { useTaxiStore } from '../store/useTaxiStore';

export const Map: React.FC = () => {
  const {
    mapData,
    mapLoading,
    error,
    fetchMapData,
    loadMoreMap,
    mapHasMore,
    mapType,
    setMapType,
    filters,
    setFilters,
    totalItems,
  } = useTaxiStore();
  
  useEffect(() => {
    fetchMapData(true, 1); // Ambil data saat komponen pertama kali dimuat untuk Map
  }, [fetchMapData]);

  const tileLayerURLs: Record<string, string> = {
    Street: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    Satellite: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    Terrain: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
  };

  return (
    <div className="flex gap-5 flex-col md:flex-row">
      <div className='w-full md:w-[80%] h-[80vh] border-8 border-white rounded-lg'>
        <MapContainer center={[40.7228, -73.9888]} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={tileLayerURLs[mapType]}
          />
          {mapLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {mapData.map((taxi, index) => (
            <Marker key={index} position={[taxi.pickup_latitude, taxi.pickup_longitude]}>
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <strong>Vendor:</strong> {taxi.vendor_id} <br />
                <strong>Fare:</strong> ${taxi.fare_amount} <br />
                <strong>Distance:</strong> {taxi.trip_distance} km <br />
                <strong>Payment:</strong> {taxi.payment_type}
                <Popup autoClose={false} closeOnClick={false} closeButton={false}>
                  <strong>Vendor:</strong> {taxi.vendor_id} <br />
                  <strong>Fare:</strong> ${taxi.fare_amount} <br />
                  <strong>Distance:</strong> {taxi.trip_distance} km <br />
                  <strong>Payment:</strong> {taxi.payment_type}
                </Popup>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>        
      </div>

      {/* Sidebar */}
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-[#1E3E62] p-4 h-auto">
        <div className="pb-4">
          <h2 className="text-xl font-bold text-white">Filters</h2>
        </div>
        {/* Filter inputs (sama seperti sebelumnya) */}
        <label className="block text-white">Fare Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.min_fare || ''}
            onChange={(e) => setFilters({ ...filters, min_fare: Number(e.target.value) })}
            className="border rounded p-2 w-1/2"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.max_fare || ''}
            onChange={(e) => setFilters({ ...filters, max_fare: Number(e.target.value) })}
            className="border rounded p-2 w-1/2"
          />
        </div>
        
        <label className="block text-white mt-4">Trip Distance</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.min_distance || ''}
            onChange={(e) => setFilters({ ...filters, min_distance: Number(e.target.value) })}
            className="border rounded p-2 w-1/2"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.max_distance || ''}
            onChange={(e) => setFilters({ ...filters, max_distance: Number(e.target.value) })}
            className="border rounded p-2 w-1/2"
          />
        </div>

        {/* <label className="block text-white mt-4">Payment Type</label>
        <select
          className="border rounded p-2 w-full"
          value={filters.payment_type || ''}
          onChange={(e) => setFilters({ payment_type: e.target.value })}
        >
          <option value="">All</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
        </select> */}
        
        <div className="py-4">
          <h2 className="text-xl font-bold text-white">Map Type</h2>
        </div>
        <div className="mt-4">
        {["Satellite", "Terrain", "Street"].map((type) => (
      <label key={type} className="flex items-center">
        <input
          type="radio"
          name="mapType"
          value={type}
          checked={mapType === type}
          onChange={() => setMapType(type as "Street" | "Satellite" | "Terrain")}
          className="form-radio text-blue-500"
        />
        <span className="ml-2 text-white">{type}</span>
      </label>
))}

        </div>
        {mapHasMore && (
          <div className="flex-col justify-center mt-4 text-center">
            <p className="text-white mb-2">Showing {mapData.length} of {totalItems} trips</p>
            <button
              onClick={loadMoreMap}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

