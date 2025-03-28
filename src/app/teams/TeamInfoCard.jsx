"use client";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function TeamInfoCard({ role, name, imageSrc, link = "#" }) {
  return (
    <div className="bg-gray-300 rounded-xl shadow-md hover:shadow-xl transition duration-300 px-6 py-6 flex items-center gap-4 h-[180px] w-[0px] border-none">
      {/* logo and name */}
      <div className="flex flex-col items-center w-[120px]">
        <p className="text-[24px] font-bold text-red-800 mb-2">{role}</p>
        <div className="w-[92px] h-[92px] relative rounded-full overflow-hidden shadow-sm">
          <Image
            src={imageSrc}
            alt={`${role} - ${name}`}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* name + icon */}
      <div className="flex justify-between items-center flex-1 pl-8">
        <p className="text-[20px] font-semibold text-gray-900">{name}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="w-6 h-6 text-gray-600 hover:text-gray-800" />
        </a>
      </div>
    </div>
  );
}
