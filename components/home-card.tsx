'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';
import { HomeCardProps } from './data-for-lists/data-list';


const HomeCard = ({ 
    className, 
    img, 
    title, 
    description, 
    handleClick }: HomeCardProps) => {
        return (
            <section
              className={cn(
                'bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[200px] rounded-[14px] cursor-pointer',
                className
              )}
              onClick={handleClick}
            >
              <div className="flex-center glassmorphism size-12 rounded-[10px]">
                <Image src={img} alt="meeting" width={27} height={27} />
              </div>
              
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{title}</h1>
              </div>
            </section>
          );
}

export default HomeCard
