"use client";

import Image from "next/image";

const mockMatches = [
  {
    date: "3 Aug",
    status: "Final",
    homeTeam: "Sydney",
    homeLogo: "/teams/Sydney_Swans.png",
    homeScore: "13.11 (89)",
    awayTeam: "Collingwood",
    awayLogo: "/teams/Collingwood.png",
    awayScore: "12.14 (86)",
  },
  {
    date: "9 Aug",
    status: "Final",
    homeTeam: "Sydney",
    homeLogo: "/teams/Sydney_Swans.png",
    homeScore: "12.11 (86)",
    awayTeam: "Port Adelaide",
    awayLogo: "/teams/Port_Adelaide.png",
    awayScore: "22.16 (148)",
  },
  {
    date: "9 Aug",
    status: "Final",
    homeTeam: "Sydney",
    homeLogo: "/teams/Sydney_Swans.png",
    homeScore: "14.61 (90)",
    awayTeam: "Melbourne",
    awayLogo: "/teams/Melbournefc.png",
    awayScore: "15.10 (100)",
  },
  {
    date: "9 Aug",
    status: "Final",
    homeTeam: "Sydney",
    homeLogo: "/teams/Sydney_Swans.png",
    homeScore: "16.87 (96)",
    awayTeam: "Richmond",
    awayLogo: "/teams/Richmond_Tigers.png",
    awayScore: "11.8 (74)",
  },
  {
    date: "9 Aug",
    status: "Final",
    homeTeam: "Sydney",
    homeLogo: "/teams/Sydney_Swans.png",
    homeScore: "13.87 (88)",
    awayTeam: "West Coast",
    awayLogo: "/teams/West_Coast_Eagles.png",
    awayScore: "18.12 (120)",
  },
  {
    date: "9 Aug",
    status: "Final",
    homeTeam: "Sydney",
    homeLogo: "/teams/Sydney_Swans.png",
    homeScore: "11.21 (84)",
    awayTeam: "Fremantle",
    awayLogo: "/teams/Fremantle.png",
    awayScore: "14.6 (90)",
  },
  {
    date: "9 Aug",
    status: "Final",
    homeTeam: "Sydney",
    homeLogo: "/teams/Sydney_Swans.png",
    homeScore: "18.21 (120)",
    awayTeam: "Geelong",
    awayLogo: "/teams/Geelong_Cats.png",
    awayScore: "16.10 (106)",
  },
  {
    date: "9 Aug",
    status: "Final",
    homeTeam: "Sydney",
    homeLogo: "/teams/Sydney_Swans.png",
    homeScore: "18.21 (98)",
    awayTeam: "Geelong",
    awayLogo: "/teams/Geelong_Cats.png",
    awayScore: "16.10 (106)",
  },
  {
    date: "28 Aug",
    status: "Final",
    homeTeam: "Geelong",
    homeLogo: "/teams/Geelong_Cats.png",
    homeScore: "16.10 (106)",
    awayTeam: "Essendon",
    awayLogo: "/teams/Essendon.png",
    awayScore: "10.8 (68)",
  },
  {
    date: "30 Aug",
    status: "Final",
    homeTeam: "Hawthorn",
    homeLogo: "/teams/Hawthorn.png",
    homeScore: "12.14 (86)",
    awayTeam: "Adelaide Crows",
    awayLogo: "/teams/Adelaide-Crows.png",
    awayScore: "13.12 (90)",
  },
];

export default function MatchHistory() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-6">
          {mockMatches.map((match, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-5 flex justify-between items-center h-[220px]"
            >
              <div className="flex flex-col gap-6 w-4/5">
                <div className="flex items-center gap-5">
                  <Image
                    src={match.homeLogo}
                    alt={match.homeTeam}
                    width={55}
                    height={55}
                  />
                  <span className="text-[22px] text-gray-800 font-semibold flex-1 text-left">
                    {match.homeTeam}
                  </span>
                  <span className="text-[20px] text-gray-900 font-bold w-1/2 text-right">
                    {match.homeScore}
                  </span>
                </div>

                <div className="flex items-center gap-5">
                  <Image
                    src={match.awayLogo}
                    alt={match.awayTeam}
                    width={55}
                    height={55}
                  />
                  <span className="text-[22px] text-gray-800 font-semibold flex-1 text-left">
                    {match.awayTeam}
                  </span>
                  <span className="text-[20px] text-gray-700 font-bold w-1/2 text-right">
                    {match.awayScore}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center h-[190px] pl-5 border-l border-gray-200 w-1/5">
                <div className="flex flex-col justify-center items-center h-1/2">
                  <p className="text-18px text-gray-700 font-medium text-center mb-2">
                    {match.status}
                  </p>
                  <p className="text-18px text-gray-500 text-center mt-2">
                    {match.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
