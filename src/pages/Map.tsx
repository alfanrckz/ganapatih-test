import 'leaflet/dist/leaflet.css'; // 
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export const Map: React.FC = () => {
  return (
    <>
      <div className="">
        <div className='flex gap-5'>

        <div className='w-[80%] h-[80vh]'>

        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
     
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        </div>

        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 h-96">
          <div className="py-4">
            <h2 className="text-xl font-bold text-gray-900">Map type</h2>
            <p className="text-gray-600 mt-2">
              This is a simple card created with Tailwind CSS. You can add any content you like.
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Select Map View</label>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input type="radio" name="mapType" className="form-radio text-blue-500" />
                <span className="ml-2 text-gray-700">Satellite</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="mapType" className="form-radio text-blue-500" />
                <span className="ml-2 text-gray-700">Terrain</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="mapType" className="form-radio text-blue-500" />
                <span className="ml-2 text-gray-700">Street</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Zoom map</button>
          </div>
        </div>


        </div>
      </div>
    </>
  );
};
