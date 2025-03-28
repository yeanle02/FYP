"use client";

export function ReadButton() {
  const handleRead = async () => {
    try {
      const res = await fetch("/api/matches", { method: "GET" });
      const data = await res.json();
      console.log("Matches from DB:", data.matches);
    //   alert(`Fetched ${data.matches?.length || 0} match(es)! Check the console.`);
    } catch (error) {
      console.error(" Failed:", error);
    }
  };

  return (
    <button
      onClick={handleRead}
      className="bg-green-600 text-white px-4 py-2 rounded ml-4"
    >
      Read Matches
    </button>
  );
}
