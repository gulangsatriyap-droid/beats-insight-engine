import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ZoomIn } from "lucide-react";
import { useState } from "react";
import { ImageGalleryModal } from "./ImageGalleryModal";
import miningImage from "@/assets/mining-inspection.jpg";

interface TemuanPanelProps {
  hasData?: boolean;
  isReadOnly?: boolean;
}

export const TemuanPanel = ({
  hasData,
  isReadOnly
}: TemuanPanelProps) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const sampleImages = [
    { url: miningImage, title: "Foto Temuan - Mining Site Inspection" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-foreground">Temuan</h3>
        <p className="text-xs text-muted-foreground mt-1">Detail temuan dan tindakan yang diperlukan</p>
      </div>

      {hasData ? (
        <>
          <div className="relative group cursor-pointer" onClick={() => setIsImageModalOpen(true)}>
            <div className="aspect-video rounded-lg overflow-hidden bg-muted border border-border transition-all group-hover:border-primary">
              <img
                src={miningImage}
                alt="Foto Temuan"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
              <div className="bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 group-hover:scale-100">
                <ZoomIn className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>

          <div className="mt-2 space-y-1">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Ukuran:</span> 1920 x 1080 px
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Nama File:</span> mining-inspection.jpg
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Description</Label>
              <Textarea
                value="Ditemukan pekerja di area pit yang tidak menggunakan helm safety standar. Helm yang digunakan sudah mengalami kerusakan pada bagian cangkang luar dengan retakan sepanjang 5cm. Pekerja sedang melakukan aktivitas loading di dekat unit dump truck."
                disabled={isReadOnly}
                className="min-h-[80px] text-sm bg-muted border-input text-muted-foreground resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Kesesuaian</Label>
              <Input
                value="Road management"
                disabled={isReadOnly}
                className="bg-muted border-input text-muted-foreground text-sm h-9"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Subketidaksesuaian</Label>
              <Input
                value="PPE - Helm Safety Rusak"
                disabled={isReadOnly}
                className="bg-muted border-input text-muted-foreground text-sm h-9"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Quick Action</Label>
              <Input
                value="Ganti helm safety baru, stop work sampai PPE lengkap"
                disabled={isReadOnly}
                className="bg-muted border-input text-muted-foreground text-sm h-9"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="aspect-video rounded-lg bg-muted/30 border border-border flex items-center justify-center">
            <p className="text-xs text-muted-foreground">No image</p>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Description</Label>
            <Textarea placeholder="—" disabled className="min-h-[80px] text-sm bg-muted/30 resize-none" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Kesesuaian</Label>
            <Input placeholder="—" disabled className="h-9 text-sm bg-muted/30" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Subketidaksesuaian</Label>
            <Input placeholder="—" disabled className="h-9 text-sm bg-muted/30" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Quick Action</Label>
            <Input placeholder="—" disabled className="h-9 text-sm bg-muted/30" />
          </div>
        </div>
      )}

      <ImageGalleryModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        images={sampleImages}
        initialIndex={0}
      />
    </div>
  );
};
