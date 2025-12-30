import { useQuery } from "@tanstack/react-query";
import { getBaseUrl } from "../utils/getEnv";
import { sleep } from "../utils/sleep";

export interface Destination {
  id: number;
  city: string;
  airport: string;
}

export default function useDestinations(origin?: string) {
  const destination = useQuery<Destination[]>({
    queryKey: ["destination", origin],
    queryFn: async () => {
      await sleep(1000);
      const res = await fetch(`${getBaseUrl()}/destinations?origin=${origin}`);
      console.log(`${getBaseUrl()}/destinations?origin=${origin}`);

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
    enabled: !!origin,
  });

  return {
    ...destination,
    destinations:
      destination.data?.map(({ id, airport, city }) => ({
        id,
        label: `${airport} ${city}`,
        value: city,
      })) || [],
  };
}
