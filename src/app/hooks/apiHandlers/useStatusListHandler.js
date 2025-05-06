// src/hooks/apiHandlers/useStatusListHandler.js
import { useState, useEffect } from 'react';

export default function useStatusListHandler() {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchTopTen = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/teams/statusList');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Fetch failed');
        setResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTopTen();
  }, []);

  return { loading, error, results };
}
