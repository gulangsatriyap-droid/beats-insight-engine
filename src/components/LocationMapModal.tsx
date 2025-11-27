import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  latitude: string;
  longitude: string;
  locationName?: string;
}

export const LocationMapModal = ({
  isOpen,
  onClose,
  latitude,
  longitude,
  locationName
}: LocationMapModalProps) => {
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            {locationName || "Lokasi Kejadian"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Coordinates Display */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Latitude</p>
              <p className="font-mono text-sm font-semibold">{latitude}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Longitude</p>
              <p className="font-mono text-sm font-semibold">{longitude}</p>
            </div>
          </div>

          {/* Map Embed */}
          <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden border border-border">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${latitude},${longitude}&zoom=15`}
            />
          </div>

          {/* Open in Google Maps */}
          <Button
            onClick={() => window.open(googleMapsUrl, '_blank')}
            variant="outline"
            className="w-full"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Buka di Google Maps
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
