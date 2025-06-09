import { useState, useEffect } from "react";
import type { Skip } from "../types/skip";
import { SkipService } from "../services/skipService";

interface UseSkipsReturn {
  skips: Skip[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useSkips = (
  postcode: string = "NR32",
  area: string = "Lowestoft"
): UseSkipsReturn => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkips = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await SkipService.getSkipsByLocation();
      setSkips(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      console.error("Error fetching skips:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkips();
  }, [postcode, area]);

  return {
    skips,
    loading,
    error,
    refetch: fetchSkips,
  };
};
