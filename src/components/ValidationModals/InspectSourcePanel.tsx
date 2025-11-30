import { useState } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import miningImage from "@/assets/mining-inspection.jpg";

interface InspectSourcePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InspectSourcePanel = ({ isOpen, onClose }: InspectSourcePanelProps) => {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoom(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-[672px] w-[480px] bg-background border-l border-border shadow-xl z-50 flex flex-col animate-in slide-in-from-right-5 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <h3 className="text-sm font-semibold">Inspect Source Data</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-5">
          {/* Image Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Image</h4>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleZoomOut}>
                  <ZoomOut className="h-3 w-3" />
                </Button>
                <span className="text-xs text-muted-foreground min-w-[40px] text-center">{Math.round(zoom * 100)}%</span>
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleZoomIn}>
                  <ZoomIn className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleResetZoom}>
                  <RotateCcw className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div className="relative border border-border rounded-lg overflow-hidden bg-muted/20">
              <div className="overflow-auto max-h-[300px]">
                <img 
                  src={miningImage}
                  alt="Foto Temuan - Mining Site Inspection"
                  className="w-full transition-transform duration-200"
                  style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
                />
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground space-y-1">
              <p><span className="font-medium">Ukuran:</span> 1920 x 1080 px</p>
              <p><span className="font-medium">Nama File:</span> mining-inspection.jpg</p>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Deskripsi</h4>
            <div className="bg-muted/30 rounded-lg p-3 border border-border">
              <p className="text-xs text-foreground leading-relaxed">
                Ditemukan pekerja di area pit yang tidak menggunakan helm safety standar. Helm yang digunakan sudah mengalami kerusakan pada bagian shell dengan retakan visible sepanjang ±5cm. Pekerja berada di dekat unit dump truck HD785 yang sedang melakukan aktivitas loading di Pit 3.
              </p>
            </div>
          </div>

          {/* Tools Pengamatan Section */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tools Pengamatan</h4>
            <div className="bg-muted/30 rounded-lg p-3 border border-border">
              <p className="text-xs text-foreground">Pengawasan Langsung</p>
            </div>
          </div>

          {/* Information Extraction Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Extraction Result</h4>
            <p className="text-xs text-muted-foreground">Source: Extraction engine v1</p>
            
            {/* Image Category */}
            <div className="space-y-2">
              <p className="text-xs font-medium">Image Category</p>
              <div className="bg-muted/30 rounded-lg border border-border overflow-hidden">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="px-3 py-2 text-muted-foreground">Scale</td>
                      <td className="px-3 py-2 font-medium">normal</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-3 py-2 text-muted-foreground">Source</td>
                      <td className="px-3 py-2 font-medium">handheld_hp_portable_begesit</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-3 py-2 text-muted-foreground">Exposure</td>
                      <td className="px-3 py-2 font-medium">normal</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-muted-foreground">Low light</td>
                      <td className="px-3 py-2 font-medium">none</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detected Objects */}
            <div className="space-y-2">
              <p className="text-xs font-medium">Detected Objects</p>
              <div className="bg-muted/30 rounded-lg border border-border overflow-hidden">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="px-3 py-2 text-muted-foreground">People</td>
                      <td className="px-3 py-2 font-medium">1 pekerja dengan PPE (helm rusak)</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-3 py-2 text-muted-foreground">Vehicles</td>
                      <td className="px-3 py-2 font-medium">dump truck HD785</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-3 py-2 text-muted-foreground">Traffic Control</td>
                      <td className="px-3 py-2 font-medium">rambu/marking area kerja</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-3 py-2 text-muted-foreground">Infrastructure</td>
                      <td className="px-3 py-2 font-medium">jalan akses, area pit terbuka</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-muted-foreground">Environment</td>
                      <td className="px-3 py-2 font-medium">outdoor, pit area, loading zone</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Composition Analysis */}
            <div className="space-y-2">
              <p className="text-xs font-medium">Composition Analysis</p>
              <div className="bg-muted/30 rounded-lg border border-border overflow-hidden">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="px-3 py-2 text-muted-foreground">Focus</td>
                      <td className="px-3 py-2 font-medium">helm rusak (hazard utama)</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-3 py-2 text-muted-foreground">Lighting</td>
                      <td className="px-3 py-2 font-medium">memadai</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-muted-foreground">Object Scale</td>
                      <td className="px-3 py-2 font-medium">jelas & mudah dipahami</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
