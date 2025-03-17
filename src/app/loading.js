export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        <p className="text-xl font-semibold text-blue-900">Loading...</p>
      </div>
    </div>
  );
}
