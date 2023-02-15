import { useCallback } from "react";
import { useQuery } from "react-query";

const CONSENT_KEY = "SS_CONSENT_CLIPBOARD";

export const useGrantAccess = () => {
  const clip = useClipboard();

  return useCallback(() => {
    localStorage.setItem(CONSENT_KEY, true);
    clip.refetch();
  }, [clip]);
};

export const useClipboard = () => {
  return useQuery(
    "clipbaord",
    async function () {
      if (localStorage.getItem(CONSENT_KEY)) {
        return await navigator.clipboard.readText();
      }

      return undefined;
    },
    {
      retry: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );
};
