import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Image as ImageIcon } from "lucide-react";

interface ImageRelevanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageRelevanceModal = ({ isOpen, onClose }: ImageRelevanceModalProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-lg">Detail Penilaian - Image Relevance</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-4">
          {/* Score Overview */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-border">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95</div>
              <Badge className="bg-success/20 text-success border-success/30">Good</Badge>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <p className="text-sm font-medium">Sangat Relevan</p>
            </div>
          </div>

          {/* Validasi Image Extraction vs Deskripsi */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-primary" />
              Validasi Image Extraction vs Deskripsi
            </h4>
            
            <div className="space-y-3">
              {/* People */}
              <div className="border border-border rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-xs font-semibold">People</p>
                </div>
                <div className="pl-6 space-y-1">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Deskripsi:</span> "Ditemukan pekerja di area pit..."
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Image Extraction:</span> Terdeteksi 1 pekerja dengan PPE (helm rusak)
                  </p>
                  <p className="text-xs text-success">✓ Objek pekerja konsisten antara deskripsi dan gambar</p>
                </div>
              </div>

              {/* Vehicles */}
              <div className="border border-border rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-xs font-semibold">Vehicles</p>
                </div>
                <div className="pl-6 space-y-1">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Deskripsi:</span> "...di dekat unit dump truck"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Image Extraction:</span> Terdeteksi dump truck di background
                  </p>
                  <p className="text-xs text-success">✓ Kendaraan yang disebutkan terlihat di gambar</p>
                </div>
              </div>

              {/* Environment */}
              <div className="border border-border rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-xs font-semibold">Environment</p>
                </div>
                <div className="pl-6 space-y-1">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Deskripsi:</span> "...area pit... aktivitas loading"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Image Extraction:</span> Pit area dengan kondisi outdoor, area loading
                  </p>
                  <p className="text-xs text-success">✓ Konteks lingkungan sesuai</p>
                </div>
              </div>

              {/* Composition */}
              <div className="border border-border rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-xs font-semibold">Composition</p>
                </div>
                <div className="pl-6 space-y-1">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Image Extraction:</span> Fokus pada helm rusak, lighting baik, skala jelas
                  </p>
                  <p className="text-xs text-success">✓ Komposisi foto mendukung dokumentasi hazard</p>
                </div>
              </div>
            </div>
          </div>

          {/* Validasi Tools Pengamatan */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              Validasi Tools Pengamatan
            </h4>
            
            <div className="border border-border rounded-lg p-3">
              <div className="pl-2 space-y-1">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium">Field:</span> "Visual inspection"
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium">Image Source:</span> Smartphone camera (EXIF data)
                </p>
                <p className="text-xs text-success">✓ Metode observasi konsisten dengan sumber gambar</p>
              </div>
            </div>
          </div>

          {/* Validasi Objek & Informasi */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Validasi Objek & Informasi</h4>
            
            <div className="space-y-2">
              <div className="flex items-start gap-2 p-2 bg-success/10 rounded border-l-2 border-success">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium">Objek di deskripsi muncul di gambar</p>
                  <p className="text-xs text-muted-foreground">Pekerja, helm rusak, dump truck - semua terlihat jelas</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 bg-warning/10 rounded border-l-2 border-warning">
                <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium">Objek di gambar tidak disebutkan</p>
                  <p className="text-xs text-muted-foreground">Material stockpile terlihat di background namun tidak disebutkan dalam deskripsi</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 bg-success/10 rounded border-l-2 border-success">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium">Tidak ada informasi kontradiktif</p>
                  <p className="text-xs text-muted-foreground">Semua informasi dalam deskripsi sesuai dengan visual gambar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Scoring */}
          <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
            <h4 className="text-sm font-semibold">Detail Scoring</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Objek utama (people) konsisten</span>
                <span className="font-medium text-success">+25</span>
              </div>
              <div className="flex justify-between">
                <span>Kendaraan (vehicles) terlihat</span>
                <span className="font-medium text-success">+20</span>
              </div>
              <div className="flex justify-between">
                <span>Lingkungan (environment) sesuai</span>
                <span className="font-medium text-success">+20</span>
              </div>
              <div className="flex justify-between">
                <span>Komposisi foto baik</span>
                <span className="font-medium text-success">+15</span>
              </div>
              <div className="flex justify-between">
                <span>Tools observasi konsisten</span>
                <span className="font-medium text-success">+10</span>
              </div>
              <div className="flex justify-between">
                <span>Tidak ada kontradiksi</span>
                <span className="font-medium text-success">+10</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span>Angle bisa lebih optimal (minor)</span>
                <span className="font-medium text-warning">-5</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 mt-2 font-semibold">
                <span>Total Score</span>
                <span className="text-primary">95/100</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
