"use client";

import Image from "next/image";

const mockMatches = [
  {
    date: "3 Aug",
    status: "Final",
    homeTeam: "Port Adelaide",
    homeLogo: "/teams/port.svg",
    homeScore: "22.16 (148)",
    awayTeam: "Sydney",
    awayLogo: "/teams/sydney.svg",
    awayScore: "5.6 (36)",
    videoThumbnail: "/teams/default-video.jpg",
  },
  {
    date: "9 Aug",
    status: "Final",
    homeTeam: "Sydney",
    homeLogo: "/teams/sydney.svg",
    homeScore: "13.11 (89)",
    awayTeam: "Collingwood",
    awayLogo: "/teams/collingwood.svg",
    awayScore: "12.14 (86)",
    videoThumbnail: "/teams/default-video.jpg",
  },
  {
    date: "15 Aug",
    status: "Final",
    homeTeam: "Melbourne",
    homeLogo: "/teams/melbourne.svg",
    homeScore: "15.10 (100)",
    awayTeam: "Richmond",
    awayLogo: "/teams/richmond.svg",
    awayScore: "11.8 (74)",
    videoThumbnail: "/teams/default-video.jpg",
  },
  {
    date: "22 Aug",
    status: "Final",
    homeTeam: "West Coast",
    homeLogo: "/teams/westcoast.svg",
    homeScore: "18.12 (120)",
    awayTeam: "Fremantle",
    awayLogo: "/teams/fremantle.svg",
    awayScore: "14.6 (90)",
    videoThumbnail: "/teams/default-video.jpg",
  },
  {
    date: "28 Aug",
    status: "Final",
    homeTeam: "Geelong",
    homeLogo: "/teams/geelong.svg",
    homeScore: "16.10 (106)",
    awayTeam: "Essendon",
    awayLogo: "/teams/essendon.svg",
    awayScore: "10.8 (68)",
    videoThumbnail: "/teams/default-video.jpg",
  },
  {
    date: "30 Aug",
    status: "Final",
    homeTeam: "Hawthorn",
    homeLogo: "/teams/hawthorn.svg",
    homeScore: "12.14 (86)",
    awayTeam: "Adelaide Crows",
    awayLogo: "/teams/adelaide.svg",
    awayScore: "13.12 (90)",
    videoThumbnail: "/teams/default-video.jpg",
  },
  {
    date: "3 Aug",
    status: "Final",
    homeTeam: "Port Adelaide",
    homeLogo: "/teams/port.svg",
    homeScore: "22.16 (148)",
    awayTeam: "Sydney",
    awayLogo: "/teams/sydney.svg",
    awayScore: "5.6 (36)",
    videoThumbnail: "/teams/default-video.jpg",
  },
  {
    date: "9 Aug",
    status: "Final",
    homeTeam: "Sydney",
    homeLogo: "/teams/sydney.svg",
    homeScore: "13.11 (89)",
    awayTeam: "Collingwood",
    awayLogo: "/teams/collingwood.svg",
    awayScore: "12.14 (86)",
    videoThumbnail: "/teams/default-video.jpg",
  },
  {
    date: "15 Aug",
    status: "Final",
    homeTeam: "Melbourne",
    homeLogo: "/teams/melbourne.svg",
    homeScore: "15.10 (100)",
    awayTeam: "Richmond",
    awayLogo: "/teams/richmond.svg",
    awayScore: "11.8 (74)",
    videoThumbnail: "/teams/default-video.jpg",
  },
  {
    date: "22 Aug",
    status: "Final",
    homeTeam: "West Coast",
    homeLogo: "/teams/westcoast.svg",
    homeScore: "18.12 (120)",
    awayTeam: "Fremantle",
    awayLogo: "/teams/fremantle.svg",
    awayScore: "14.6 (90)",
    videoThumbnail: "/teams/default-video.jpg",
  },
  {
    date: "28 Aug",
    status: "Final",
    homeTeam: "Geelong",
    homeLogo: "/teams/geelong.svg",
    homeScore: "16.10 (106)",
    awayTeam: "Essendon",
    awayLogo: "/teams/essendon.svg",
    awayScore: "10.8 (68)",
    videoThumbnail: "/teams/default-video.jpg",
  },
  {
    date: "30 Aug",
    status: "Final",
    homeTeam: "Hawthorn",
    homeLogo: "/teams/hawthorn.svg",
    homeScore: "12.14 (86)",
    awayTeam: "Adelaide Crows",
    awayLogo: "/teams/adelaide.svg",
    awayScore: "13.12 (90)",
    videoThumbnail: "/teams/default-video.jpg",
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
                {/* left info */}
                <div className="flex flex-col gap-6 w-4/5">
                  {/* team1 */}
                  <div className="flex items-center gap-5">
                    <Image
                      src={match.homeLogo}
                      alt={match.homeTeam}
                      width={80}
                      height={80}
                    />
                    <span className="text-[22px] text-gray-800 font-semibold w-1/2">
                      {match.homeTeam}
                    </span>
                    <span className="text-[20px] text-gray-900 font-bold w-1/2 text-right">
                      {match.homeScore}
                    </span>
                  </div>
  
                  {/* team2 */}
                  <div className="flex items-center gap-5">
                    <Image
                      src={match.awayLogo}
                      alt={match.awayTeam}
                      width={80}
                      height={80}
                    />
                    <span className="text-[22px] text-gray-800 font-semibold w-1/2">
                      {match.awayTeam}
                    </span>
                    <span className="text-[20px] text-gray-700 font-bold w-1/2 text-right">
                      {match.awayScore}
                    </span>
                  </div>
                </div>
  
                <div className="flex flex-col items-center h-[190px] pl-5 border-l border-gray-200 w-1/5">
                  {/* Final + date */}
                  <div className="flex flex-col h-1/2">
                    <p className="text-sm text-gray-700 font-medium text-center mb-0.1">
                      {match.status}
                    </p>
                    <p className="text-sm text-gray-500 text-center mt-0.1">
                      {match.date}
                    </p>
                  </div>
  
                  {/* vedio */}
                  <div className="w-[140px] h-[82px] relative rounded-md overflow-hidden mt-1">
                    <Image
                      src={match.videoThumbnail}
                      alt="Match video"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  