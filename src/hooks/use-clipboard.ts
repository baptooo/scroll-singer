import { useQuery } from "react-query";

export const useClipboard = () => {
  return useQuery(
    "clipbaord",
    async function () {
      return await navigator.clipboard.readText();
    },
    {
      retry: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );
};
