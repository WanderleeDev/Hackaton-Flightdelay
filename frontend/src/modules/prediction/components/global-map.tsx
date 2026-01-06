import { Card } from "@/components/ui/card";
import { Map, MapControls } from "@/components/ui/map";

export default function GlobalMap() {
  return (
    <Card className="h-[600px] lg:h-[600px] p-0 overflow-hidden">
      <Map center={[-74.006, 40.7128]} zoom={1}>
        <MapControls />
      </Map>
    </Card>
  );
}
