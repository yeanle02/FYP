"use client";
import Image from "next/image";

export default function TeamHeader({ teamName = "Sydney Swans",  teamLogo = "/teams/Sydney_Swans.png" }) {
  return (
    <div className="bg-gray-900 shadow-lg w-full h-full flex items-center justify-center overflow-hidden">
      <div className="flex items-center gap-8 w-full max-w-screen-xl px-4 h-full">
        <Image
          src={teamLogo}
          alt={`${teamName} logo`}
          width={220}
          height={220}
        />
        <div className="flex flex-col items-start w-[1100px] h-full relative">
          <h1 className="text-[90px] font-extrabold text-white ml-20">
            {teamName}
          </h1>
    
        </div>
      </div>
    </div>
  );
}
