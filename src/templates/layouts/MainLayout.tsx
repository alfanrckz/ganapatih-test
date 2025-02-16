import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../organisms/header/Header';
import { useTaxiStore } from '../../store/useTaxiStore';


export const MainLayout: React.FC = () => {
    // const {totalTrips, totalDistance, averageDistance } = useTaxiStore();
  const data2 = [
      {
        title: 'Total Distance',
        // value: `${totalDistance}`,
        value: `${0}`,
        colors: 'bg-[#155E95]',
      },
      {
        title: 'No. of Trips',
        // value: `${totalTrips}`,
        value: `${0}`,

        colors: 'bg-[#009990]',
      },
      {
        title: 'Average Distance',
        // value: `${averageDistance}`,
        value: `${0}`,

        colors: 'bg-[#872341]',
      }
    ]
  return (
    <div>
    <div className="grid grid-cols-6">
      <div className='col-span-1 bg-[#1E3E62]'>
        <Header />
      </div>

      <div className='col-span-5 bg-[#0B192C] px-10 h-[100vh]' >
        <div className="grid grid-cols-3 gap-5 h-[20vh] pt-2">
                  {data2.map((item, index) => (
                    
                  <div className={`${item.colors} h-[70%] text-white text-center border border-white rounded-lg shadow-lg`} key={index}>
                    <h1 className='font-semibold text-4xl pt-5'>{item.title}:</h1>
                    <h1>{item.value}</h1>
                  </div>
                  ))}1
        </div>
        <div className='h-[80vh] overflow-y-auto'>
        <Outlet/>
        </div>
      </div>
    </div>
    </div>
  );
};