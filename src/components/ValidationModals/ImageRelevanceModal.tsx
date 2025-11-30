import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Search } from "lucide-react";
import { InspectSourcePanel } from "./InspectSourcePanel";

interface ImageRelevanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageRelevanceModal = ({ isOpen, onClose }: ImageRelevanceModalProps) => {
  const [showInspect, setShowInspect] = useState(false);

  const handleClose = () => {
    setShowInspect(false);
    onClose();
  };

  return (
    <>
      {/* Inspect Source Panel */}
      <InspectSourcePanel isOpen={showInspect && isOpen} onClose={() => setShowInspect(false)} />
      
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <SheetTitle className="text-lg">Detail Penilaian - Image Relevance</SheetTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowInspect(!showInspect)}
              className={showInspect ? "bg-primary/10 border-primary text-primary" : ""}
            >
              <Search className="h-4 w-4 mr-2" />
              Inspect
            </Button>
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

            {/* Detail Saran */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Detail Saran</h4>
              
              {/* Positive Point */}
              <div className="bg-success/10 rounded-lg p-3 border border-success/20 animate-fade-in">
                <p className="text-xs text-success font-medium mb-2">✓ Gambar Sangat Relevan & Informatif</p>
                <div className="bg-success/5 rounded p-2 border-l-2 border-success">
                  <p className="text-xs text-foreground leading-relaxed">
                    Semua objek yang disebutkan dalam deskripsi (pekerja, helm rusak, dump truck) terlihat jelas di gambar. 
                    Traffic control dan infrastructure juga sesuai dengan konteks area pit loading. Komposisi foto baik dengan 
                    fokus jelas pada hazard utama (helm rusak), lighting memadai, dan skala objek mudah dipahami. 
                    Tools observasi konsisten antara field input (Visual inspection) dan source gambar (smartphone camera).
                  </p>
                </div>
              </div>
              
              {/* Negative Point */}
              <div className="bg-warning/10 rounded-lg p-3 border border-warning/20 animate-fade-in">
                <p className="text-xs text-warning font-medium mb-2">⚠ Angle Foto Bisa Lebih Optimal</p>
                <div className="bg-warning/5 rounded p-2 border-l-2 border-warning">
                  <p className="text-xs text-foreground leading-relaxed">
                    Untuk dokumentasi yang lebih komprehensif, pertimbangkan pengambilan foto dari sudut yang lebih dekat 
                    untuk menampilkan detail kerusakan helm secara close-up, plus satu foto wide-angle untuk menunjukkan 
                    konteks keseluruhan area kerja. Ini akan membantu investigasi lebih detail.
                  </p>
                </div>
              </div>
            </div>

            {/* Validasi Image Extraction vs Deskripsi */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Validasi Image Extraction vs Deskripsi</h4>
              
              <div className="space-y-3">
                {/* People */}
                <div className="border border-border rounded-lg p-3 bg-success/5">
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
                    <p className="text-xs text-success font-medium">✓ Objek pekerja konsisten antara deskripsi dan gambar</p>
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

                {/* Traffic Control */}
                <div className="border border-border rounded-lg p-3 bg-success/5">
                  <div className="flex items-start gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                    <p className="text-xs font-semibold">Traffic Control</p>
                  </div>
                  <div className="pl-6 space-y-1">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Deskripsi:</span> "...aktivitas loading di pit area"
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Image Extraction:</span> Terdeteksi rambu/marking area kerja di sekitar lokasi
                    </p>
                    <p className="text-xs text-success font-medium">✓ Traffic control sesuai dengan aktivitas yang dilaporkan</p>
                  </div>
                </div>

                {/* Infrastructure & Access */}
                <div className="border border-border rounded-lg p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                    <p className="text-xs font-semibold">Infrastructure & Access</p>
                  </div>
                  <div className="pl-6 space-y-1">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Deskripsi:</span> "...area loading Pit 3"
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Image Extraction:</span> Terlihat jalan akses dan area pit yang terbuka
                    </p>
                    <p className="text-xs text-success">✓ Infrastruktur sesuai dengan lokasi yang disebutkan</p>
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
              <h4 className="text-sm font-semibold">Validasi Tools Pengamatan</h4>
              
              <div className="border border-border rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-xs font-semibold">Tools Observasi</p>
                </div>
                <div className="pl-6 space-y-1">
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

            {/* Detail Scoring */}
            <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
              <h4 className="text-sm font-semibold">Detail Scoring</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Objek utama (people) konsisten</span>
                  <span className="font-medium text-success">+20</span>
                </div>
                <div className="flex justify-between">
                  <span>Kendaraan (vehicles) terlihat</span>
                  <span className="font-medium text-success">+15</span>
                </div>
                <div className="flex justify-between">
                  <span>Traffic control sesuai konteks</span>
                  <span className="font-medium text-success">+15</span>
                </div>
                <div className="flex justify-between">
                  <span>Infrastructure & access jelas</span>
                  <span className="font-medium text-success">+15</span>
                </div>
                <div className="flex justify-between">
                  <span>Lingkungan (environment) sesuai</span>
                  <span className="font-medium text-success">+15</span>
                </div>
                <div className="flex justify-between">
                  <span>Komposisi foto baik</span>
                  <span className="font-medium text-success">+10</span>
                </div>
                <div className="flex justify-between">
                  <span>Tools observasi konsisten</span>
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
    </>
  );
};
