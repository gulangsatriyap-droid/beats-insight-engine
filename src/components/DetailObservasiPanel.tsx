import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink } from "lucide-react";
import { useState } from "react";
import { LocationMapModal } from "./LocationMapModal";

interface DetailObservasiPanelProps {
  hasData?: boolean;
  isReadOnly?: boolean;
  latitude?: string;
  longitude?: string;
}

export const DetailObservasiPanel = ({
  hasData,
  isReadOnly,
  latitude = "2.0194521",
  longitude = "117.6183817"
}: DetailObservasiPanelProps) => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-foreground">Detail Laporan</h3>
        <p className="text-xs text-muted-foreground mt-1">Informasi lokasi dan metode observasi</p>
      </div>

      {hasData ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Tools Pengamatan</Label>
            <Input
              value="Pengawasan Langsung"
              disabled={isReadOnly}
              className="bg-muted border-input text-muted-foreground text-sm h-9"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Site</Label>
            <Input
              value="Berau Coal - Binungan"
              disabled={isReadOnly}
              className="bg-muted border-input text-muted-foreground text-sm h-9"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Lokasi</Label>
            <Input
              value="Pit A - Front 03"
              disabled={isReadOnly}
              className="bg-muted border-input text-muted-foreground text-sm h-9"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Detail Lokasi</Label>
            <Input
              value="Pit A - Front 078"
              disabled={isReadOnly}
              className="bg-muted border-input text-muted-foreground text-sm h-9"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Keterangan Lokasi</Label>
            <Textarea
              value="Area loading point dekat crusher station, sekitar 50 meter dari base camp. Kondisi jalan berdebu dengan visibilitas sedang."
              disabled={isReadOnly}
              className="min-h-[80px] text-sm bg-muted border-input text-muted-foreground resize-none"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setIsMapOpen(true)}
              variant="outline"
              size="sm"
              className="flex-1 h-9 text-sm"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Pin Point Lokasi
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9 text-sm"
              onClick={() => window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Buka Maps
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Latitude</Label>
              <Input
                value={latitude}
                disabled
                className="bg-background border-input text-foreground text-sm h-9 font-mono"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Longitude</Label>
              <Input
                value={longitude}
                disabled
              className="bg-background border-input text-foreground text-sm h-9 font-mono"
            />
          </div>
        </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Tools Pengamatan</Label>
            <Input placeholder="—" disabled className="h-9 text-sm bg-muted/30" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Site</Label>
            <Input placeholder="—" disabled className="h-9 text-sm bg-muted/30" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Lokasi</Label>
            <Input placeholder="—" disabled className="h-9 text-sm bg-muted/30" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Detail Lokasi</Label>
            <Textarea placeholder="—" disabled className="min-h-[80px] text-sm bg-muted/30 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Latitude</Label>
              <Input placeholder="—" disabled className="h-9 text-sm bg-muted/30 font-mono" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Longitude</Label>
              <Input placeholder="—" disabled className="h-9 text-sm bg-muted/30 font-mono" />
            </div>
          </div>
        </div>
      )}

      <LocationMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        latitude={latitude}
        longitude={longitude}
        locationName="Pit A - Front 03"
      />
    </div>
  );
};
