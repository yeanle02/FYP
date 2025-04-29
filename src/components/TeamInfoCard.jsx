// src/components/TeamInfoCard.jsx
"use client";

import Image from "next/image";

export default function TeamInfoCard({
  role,       // "Captain" or "Coach"
  name,       // e.g. "Harris Andrews"
  imageSrc,   // e.g. "/Captain/Brisbane_Lions/Harris Andrews.png"
}) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition
                    duration-300 px-4 py-6 flex items-center gap-4 h-[180px] w-[370px]">
      {/* 左侧：角色 + 头像 */}
      <div className="flex flex-col items-center w-[120px]">
        <div className="text-2xl font-bold text-white mb-2">{role}</div>
        <div className="w-[92px] h-[92px] relative rounded-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={`${role} – ${name}`}
            fill
            className="object-cover"
          />
        </div>
      </div>
      {/* 右侧：姓名 */}
      <div className="pl-4 flex-1">
        <div className="text-xl font-semibold text-white">{name}</div>
      </div>
    </div>
  );
}
