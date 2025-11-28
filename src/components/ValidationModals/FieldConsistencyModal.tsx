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

          {/* Detail Saran */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Detail Saran</h4>
            
            {/* Positive Point */}
            <div className="bg-success/10 rounded-lg p-3 border border-success/20 animate-fade-in">
              <p className="text-xs text-success font-medium mb-2">✓ Konsistensi Data Baik</p>
              <div className="bg-success/5 rounded p-2 border-l-2 border-success">
                <p className="text-xs text-foreground leading-relaxed">
                  Detail lokasi dan tools pengamatan sudah konsisten antara field input dan image extraction. 
                  Kategori ketidaksesuaian (Road management) sesuai dengan konteks observasi di area pit, 
                  dan subketidaksesuaian (PPE - Helm Safety Rusak) terlihat jelas di gambar dengan deskripsi yang akurat.
                </p>
              </div>
            </div>
            
            {/* Negative Point */}
            <div className="bg-warning/10 rounded-lg p-3 border border-warning/20 animate-fade-in">
              <p className="text-xs text-warning font-medium mb-2">⚠ Perlu Detail Tambahan</p>
              <div className="bg-warning/5 rounded p-2 border-l-2 border-warning">
                <p className="text-xs text-foreground leading-relaxed">
                  Sebaiknya tambahkan informasi jarak dari referensi landmark (misalnya "50m dari crusher plant") 
                  dan timestamp verifikasi untuk meningkatkan akurasi lokasi. Detail ini akan membantu tim follow-up 
                  menemukan lokasi hazard dengan lebih cepat dan tepat.
                </p>
              </div>
            </div>
          </div>

          {/* Validasi Detail Laporan */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Validasi Detail Laporan</h4>
            
            <div className="space-y-3">
              {/* Tools Pengamatan */}
              <div className="border border-border rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-xs font-semibold">Tools Pengamatan</p>
                </div>
                <div className="pl-6 space-y-1">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Field:</span> "Visual inspection"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Image Extraction:</span> Terdeteksi kamera/smartphone pada foto
                  </p>
                  <p className="text-xs text-success">✓ Metode observasi konsisten</p>
                </div>
              </div>

              {/* Detail Lokasi */}
              <div className="border border-border rounded-lg p-3 bg-success/5">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-xs font-semibold">Detail Lokasi</p>
                </div>
                <div className="pl-6 space-y-1">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Field:</span> "Pit 3, Area Loading"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Image Extraction:</span> Background menunjukkan pit area dengan truck loading
                  </p>
                  <p className="text-xs text-success font-medium">✓ Lokasi konsisten antara field dan visual</p>
                </div>
              </div>
            </div>
          </div>

          {/* Validasi Ketidaksesuaian */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Validasi Ketidaksesuaian</h4>
            
            <div className="space-y-3">
              {/* Ketidaksesuaian */}
              <div className="border border-border rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-xs font-semibold">Ketidaksesuaian</p>
                </div>
                <div className="pl-6 space-y-1">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Deskripsi:</span> "Road management"
                  </p>
                  <p className="text-xs text-success">✓ Sesuai dengan konteks observasi di area pit</p>
                </div>
              </div>

              {/* Subketidaksesuaian */}
              <div className="border border-border rounded-lg p-3 bg-success/5">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-xs font-semibold">Subketidaksesuaian</p>
                </div>
                <div className="pl-6 space-y-1">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Deskripsi:</span> "PPE - Helm Safety Rusak"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Image:</span> Terlihat helm dengan kondisi retak/rusak
                  </p>
                  <p className="text-xs text-success font-medium">✓ Konsisten antara deskripsi dan visual</p>
                </div>
              </div>

              {/* Quick Action */}
              <div className="border border-border rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-xs font-semibold">Quick Action</p>
                </div>
                <div className="pl-6 space-y-1">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Deskripsi:</span> "Ganti helm safety baru, stop work sampai PPE lengkap"
                  </p>
                  <p className="text-xs text-success">✓ Tindakan relevan dengan temuan</p>
                </div>
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
                <span>Detail jarak dari referensi tidak disebutkan</span>
                <span className="font-medium text-warning">-15</span>
              </div>
              <div className="flex justify-between">
                <span>Timestamp verifikasi tidak tercatat</span>
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
