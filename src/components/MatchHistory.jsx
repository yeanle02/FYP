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
    awayLogo: "/teams/Collingwood_Magpies.png",
    awayScore: "12.14 (86)",
  },
  {
    date: "9 Aug",
    status: "Final",
    homeTeam: "Sydney",
    homeLogo: "/teams/Sydney_Swans.png",
    homeScore: "12.11 (86)",
    awayTeam: "Port Adelaide",
    awayLogo: "/teams/Port_Adelaide_Power.png",
    awayScore: "22.16 (148)",
  },
  {
    date: "9 Aug",
    status: "Final",
    homeTeam: "Sydney",
    homeLogo: "/teams/Sydney_Swans.png",
    homeScore: "14.61 (90)",
    awayTeam: "Melbourne",
    awayLogo: "/teams/Melbourne_Demons.png",
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
    awayLogo: "/teams/Fremantle_Dockers.png",
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
              className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-5 flex flex-col justify-between h-[180px]"
            >
              <div className="text-[26px] text-gray-800 font-semibold">
                {match.homeTeam}
              </div>

              <div className="mt-auto mb-2">
                <div className="grid grid-cols-5 text-sm text-gray-400">
                  <span className="text-center">Position</span>
                  <span className="text-center"></span>
                  <span className="text-center">Age</span>
                  <span className="text-center"></span>
                  <span className="text-center">Games</span>
                </div>

                {/* 给这两个部分之间设定很小的间距，比如 mt-1 */}
                <div className="grid grid-cols-5 text-[20px] text-gray-600 mt-1">
                  <span className="text-center">Forward</span>
                  <span className="text-center">|</span>
                  <span className="text-center">26</span>
                  <span className="text-center">|</span>
                  <span className="text-center">197 cm</span>
                </div>
              </div>
            </div>


          ))}
        </div>
      </div>
    </div>
  );
}
