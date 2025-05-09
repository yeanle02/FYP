"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TeamHeader({ teamName = "Sydney Swans", teamLogo = "/teams/Sydney_Swans.png" }) {
  const router = useRouter();
  return (
    <div className="bg-gray-900 shadow-lg w-full h-full flex items-center justify-center overflow-hidden">
     <div className="flex items-center gap-8 w-full max-w-screen-xl px-4 h-full">
     <div className="relative bg-white rounded-full flex items-center justify-center shadow-md ml-20 mt-10 p-4">
          <img
            src={teamLogo}
            alt={`${teamName} logo`}
            className="w-[150px] h-[150px] object-contain"
          />
        </div>
        <div className="flex flex-col items-start w-[1100px] h-full relative">
          <h1 className="text-[90px] font-extrabold text-white ml-20">
            {teamName}
          </h1>
    
        </div>
      </div>
    </div>
  );
}
