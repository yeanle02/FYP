"use client";
import Image from "next/image";

export default function TeamHeader({ teamName = "Sydney Swans", homeVenue = "SCG" }) {
  return (
    <div className="bg-red-300 shadow-lg w-full h-[280px] flex items-center justify-center">
      <div className="flex items-center gap-20 w-[1300px] h-[220px]">
        <Image
          src="/teams/sydney.svg"
          alt={`${teamName} logo`}
          width={220}
          height={220}
        />
        <div className="flex flex-col  items-start w-[1100px] h-full relative ">
          <h1 className="text-[90px] font-extrabold text-white leading-[]">{teamName}</h1>
          <p className="text-white text-2xl font-semibold absolute top-[75%] left-0">
            🏟 Home Venue: {homeVenue}
          </p>
        </div>
      </div>
    </div>
  );
}
