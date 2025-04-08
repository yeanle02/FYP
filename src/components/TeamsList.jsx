"use client";

import Image from "next/image";
import Link from "next/link";
import { teams } from "@/app/data/teams"; 

export default function TeamsList() {
  return (
    <div className="relative">
      <div className="bg-gray-200 py-8 px-12 w-full max-w-screen-2xl mx-auto rounded-2xl h-[80vh] overflow-y-scroll relative">
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 gap-6">
              {teams.map((team, index) => (
                <Link
                  key={index}
                  href={`/teams/memberinfo?teamName=${encodeURIComponent(team.name)}`}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-3 flex flex-col items-center justify-center h-[180px] cursor-pointer"
                >
                  {/* Logo */}
                  <div className="w-36 h-36 relative">
                    <Image
                      src={team.logo}
                      alt={team.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Name */}
                  <p className="mt-4 text-[28px] text-gray-800 font-semibold">
                    {team.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
