"use client";
import Image from "next/image";

export default function TeamHeader({ teamName = "Sydney Swans", homeVenue = "SCG" }) {
  return (
    <div className="bg-gray-900 shadow-lg w-full h-[280px] flex items-center justify-center">
      <div className="flex items-center gap-20 w-[1300px] h-[220px]  ml-36 ">
        <Image
          src="/teams/Sydney_Swans.png" 
          alt={`${teamName} logo`}
          width={220}
          height={220}
        />
        <div className="flex flex-col  items-start w-[1100px] h-full relative ">
          <h1 className="text-[90px] font-extrabold text-white ml-20 leading-[]">{teamName}</h1>
          <p className="text-white text-2xl font-semibold absolute  ml-20 top-[75%] left-0">
            🏟 Home Venue: {homeVenue}
          </p>
        </div>
      </div>
    </div>
  );
}
