import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface FieldConsistencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FieldConsistencyModal = ({ isOpen, onClose }: FieldConsistencyModalProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-lg">Detail Penilaian - Field Consistency</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-4">
          {/* Score Overview */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-border">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">70</div>
              <Badge className="bg-warning/20 text-warning border-warning/30">Medium</Badge>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <p className="text-sm font-medium">Perlu Perbaikan Minor</p>
            </div>
          </div>

          {/* Validasi Detail Laporan */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              Validasi Detail Laporan
            </h4>
            
            <div className="space-y-3 pl-6">
              <div className="border-l-2 border-success pl-4 py-2">
                <p className="text-xs font-medium text-success mb-1">✓ Tools Pengamatan</p>
                <p className="text-xs text-muted-foreground">Field: "Visual inspection"</p>
                <p className="text-xs text-muted-foreground">Image Extraction: Terdeteksi kamera/smartphone pada foto</p>
              </div>

              <div className="border-l-2 border-success pl-4 py-2">
                <p className="text-xs font-medium text-success mb-1">✓ Detail Lokasi</p>
                <p className="text-xs text-muted-foreground">Field: "Pit 3, Area Loading"</p>
                <p className="text-xs text-muted-foreground">Image Extraction: Background menunjukkan pit area dengan truck loading</p>
              </div>

              <div className="border-l-2 border-warning pl-4 py-2">
                <p className="text-xs font-medium text-warning mb-1">⚠ Zona Kerja Spesifik</p>
                <p className="text-xs text-muted-foreground">Field: Tidak disebutkan</p>
                <p className="text-xs text-muted-foreground">Rekomendasi: Tambahkan zona kerja spesifik (e.g., "Pit 3 - Sector A")</p>
              </div>
            </div>
          </div>

          {/* Validasi Ketidaksesuaian */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              Validasi Ketidaksesuaian
            </h4>
            
            <div className="space-y-3 pl-6">
              <div className="border-l-2 border-success pl-4 py-2">
                <p className="text-xs font-medium mb-1">Ketidaksesuaian</p>
                <p className="text-xs text-muted-foreground">Deskripsi: "Road management"</p>
                <p className="text-xs text-success">✓ Sesuai dengan konteks observasi di area pit</p>
              </div>

              <div className="border-l-2 border-success pl-4 py-2">
                <p className="text-xs font-medium mb-1">Subketidaksesuaian</p>
                <p className="text-xs text-muted-foreground">Deskripsi: "PPE - Helm Safety Rusak"</p>
                <p className="text-xs text-muted-foreground">Image: Terlihat helm dengan kondisi retak/rusak</p>
                <p className="text-xs text-success">✓ Konsisten antara deskripsi dan visual</p>
              </div>

              <div className="border-l-2 border-success pl-4 py-2">
                <p className="text-xs font-medium mb-1">Quick Action</p>
                <p className="text-xs text-muted-foreground">Deskripsi: "Ganti helm safety baru, stop work sampai PPE lengkap"</p>
                <p className="text-xs text-success">✓ Tindakan relevan dengan temuan</p>
              </div>
            </div>
          </div>

          {/* Detail Scoring */}
          <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
            <h4 className="text-sm font-semibold">Detail Scoring</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Konsistensi lokasi form & deskripsi</span>
                <span className="font-medium text-success">+25</span>
              </div>
              <div className="flex justify-between">
                <span>Konsistensi tools pengamatan</span>
                <span className="font-medium text-success">+20</span>
              </div>
              <div className="flex justify-between">
                <span>Validasi ketidaksesuaian dengan temuan</span>
                <span className="font-medium text-success">+25</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span>Zona kerja spesifik tidak disebutkan</span>
                <span className="font-medium text-warning">-15</span>
              </div>
              <div className="flex justify-between">
                <span>Jarak dari referensi tidak disebutkan</span>
                <span className="font-medium text-warning">-15</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 mt-2 font-semibold">
                <span>Total Score</span>
                <span className="text-primary">70/100</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
