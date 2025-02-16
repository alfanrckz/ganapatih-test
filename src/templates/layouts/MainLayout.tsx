import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../organisms/header/Header';
import { useTaxiStore } from '../../store/useTaxiStore';
import { formatThousand } from '../../helper/number.helper';


export const MainLayout: React.FC = () => {
    const {totalTrips, totalDistance, averageDistance } = useTaxiStore();
  const data2 = [
      {
        title: 'Total Distance',
        value: `${totalDistance}`,
        colors: 'bg-[#155E95]',
      },
      {
        title: 'No. of Trips',
        value: `${totalTrips}`,
        colors: 'bg-[#009990]',
      },
      {
        title: 'Average Distance',
        value: `${averageDistance}`,
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
                    
                  <div className={`${item.colors} h-[70%] text-white text-start border-4 border-gray-400 rounded-lg`} key={index}>
                    <h1 className='font-semibold md:text-lg lg:text-4xl p-4 pb-0'>{item.title}:</h1>
                    <h1 className='font-semibold pl-5'>{formatThousand(item.value)}</h1>
                  </div>
                  ))}
        </div>
        <div className='h-[80vh] overflow-y-auto'>
        <Outlet/>
        </div>
      </div>
    </div>
    </div>
  );
};