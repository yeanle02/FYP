"use client";
import Image from "next/image";

export default function TeamHeader({ teamName = "Sydney Swans", homeVenue = "SCG" }) {
  return (
    <div className="bg-red-300 rounded-2xl shadow-lg px-16 py-10 w-full max-w-[1800px] h-[280px] mx-auto flex items-center justify-center">
      <div className="flex items-center gap-20 w-[1300px] h-[220px]">
        <Image
          src="/teams/sydney.svg"
          alt={`${teamName} logo`}
          width={220}
          height={220}
        />
        <div className="flex flex-col  items-start w-[1100px] h-full relative translate-x-[200px]">
          <h1 className="text-[82px] font-extrabold text-white leading-[]">{teamName}</h1>
          <p className="text-white text-3xl font-semibold absolute top-[75%] left-0">
            🏟 Home Venue: {homeVenue}
          </p>
        </div>
      </div>
    </div>
  );
}
