"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TeamHeader({ teamName = "Sydney Swans", teamLogo = "/teams/Sydney_Swans.png" }) {
  const router = useRouter();
  return (
<<<<<<< HEAD
    <div className="bg-gray-900 shadow-lg w-full h-[280px] flex items-center justify-center relative">
      <div className="w-[1300px] relative">
        <button 
          onClick={() => router.back()}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center gap-2 px-4 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 group border border-white/20 hover:border-white/40"
          aria-label="Go back"
        >
          <svg 
            className="w-5 h-5 text-white transform transition-transform duration-300 group-hover:translate-x-[-2px]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-white font-medium">Back</span>
        </button>
        <div className="flex items-center gap-20 h-[220px]">
          <Image
            src={teamLogo}
            alt={`${teamName} logo`}
            width={220}
            height={220}
            className="ml-36"
          />
          <div className="flex flex-col items-start justify-center w-[1100px] h-full relative">
            <h1 className="text-[80px] font-extrabold text-white ml-20 truncate max-w-[900px]">
              {teamName}
            </h1>
          </div>
=======
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
    
>>>>>>> teampage
        </div>
      </div>
    </div>
  );
}
