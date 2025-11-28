import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface DescriptionValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DescriptionValidationModal = ({ isOpen, onClose }: DescriptionValidationModalProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-lg">Detail Penilaian - Description Completeness</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-4">
          {/* Score Overview */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-border">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">65</div>
              <Badge className="bg-warning/20 text-warning border-warning/30">Medium</Badge>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <p className="text-sm font-medium">Perlu Kelengkapan Data</p>
            </div>
          </div>

          {/* Detail Saran */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Detail Saran</h4>
            
            {/* Positive Point */}
            <div className="bg-success/10 rounded-lg p-3 border border-success/20 animate-fade-in">
              <p className="text-xs text-success font-medium mb-2">✓ Deskripsi Hazard Jelas</p>
              <div className="bg-success/5 rounded p-2 border-l-2 border-success">
                <p className="text-xs text-foreground leading-relaxed">
                  Aspek WHAT, WHEN, WHERE, WHY, dan HOW sudah dijelaskan dengan baik. Detail kondisi kerusakan helm 
                  (retakan 5cm pada cangkang luar) sangat spesifik dan memudahkan assessment risiko. Waktu kejadian 
                  tercatat dari metadata, dan konteks risiko tersirat dari aktivitas loading di area pit.
                </p>
              </div>
            </div>
            
            {/* Negative Point */}
            <div className="bg-warning/10 rounded-lg p-3 border border-warning/20 animate-fade-in">
              <p className="text-xs text-warning font-medium mb-2">⚠ Identitas Pekerja Tidak Lengkap</p>
              <div className="bg-warning/5 rounded p-2 border-l-2 border-warning">
                <p className="text-xs text-foreground leading-relaxed">
                  Aspek WHO masih kurang detail - sebaiknya tambahkan identitas atau tim pekerja yang terdampak 
                  (misalnya "Operator Loading PT XYZ, Tim A") dan jumlah pekerja terdampak untuk keperluan 
                  investigasi dan follow-up yang lebih efektif.
                </p>
              </div>
            </div>
          </div>

          {/* Validasi 5W 1H */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Validasi 5W 1H</h4>
            
            <div className="space-y-3">
              {/* WHAT */}
              <div className="border border-border rounded-lg p-3 bg-success/5">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-xs font-semibold">WHAT (Apa yang terjadi?)</p>
                </div>
                <div className="pl-6 space-y-1">
                  <p className="text-xs text-muted-foreground">
                    "Ditemukan pekerja di area pit yang tidak menggunakan helm safety standar. 
                    Helm yang digunakan sudah mengalami kerusakan pada bagian cangkang luar dengan retakan sepanjang 5cm."
                  </p>
                  <p className="text-xs text-success font-medium">✓ Deskripsi hazard jelas dan spesifik</p>
                </div>
              </div>

              {/* WHO */}
              <div className="border border-warning rounded-lg p-3 bg-warning/5">
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
                  <p className="text-xs font-semibold">WHO (Siapa yang terdampak?)</p>
                </div>
                <div className="pl-6 space-y-1">
                  <p className="text-xs text-muted-foreground">
                    "Pekerja sedang melakukan aktivitas loading..."
                  </p>
                  <p className="text-xs text-warning">⚠ Identitas/tim pekerja tidak disebutkan</p>
                  <p className="text-xs text-warning">⚠ Jumlah pekerja terdampak tidak disebutkan</p>
                </div>
              </div>

              {/* WHEN */}
              <div className="border border-border rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-xs font-semibold">WHEN (Kapan terjadi?)</p>
                </div>
                <div className="pl-6 space-y-1">
                  <p className="text-xs text-muted-foreground">Timestamp: 2024-01-15 10:30 WIB</p>
                  <p className="text-xs text-success">✓ Waktu tercatat dari metadata</p>
                </div>
              </div>

              {/* WHERE */}
              <div className="border border-border rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-xs font-semibold">WHERE (Di mana terjadi?)</p>
                </div>
                <div className="pl-6 space-y-1">
                  <p className="text-xs text-muted-foreground">"di area pit... di dekat unit dump truck"</p>
                  <p className="text-xs text-success">✓ Lokasi umum disebutkan</p>
                  <p className="text-xs text-warning">⚠ Zona spesifik bisa lebih detail</p>
                </div>
              </div>

              {/* WHY */}
              <div className="border border-border rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-xs font-semibold">WHY (Mengapa berbahaya?)</p>
                </div>
                <div className="pl-6 space-y-1">
                  <p className="text-xs text-muted-foreground">Konteks: PPE rusak + aktivitas loading (high risk)</p>
                  <p className="text-xs text-success">✓ Konteks risiko tersirat dari deskripsi</p>
                </div>
              </div>

              {/* HOW */}
              <div className="border border-border rounded-lg p-3 bg-success/5">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-xs font-semibold">HOW (Bagaimana kondisinya?)</p>
                </div>
                <div className="pl-6 space-y-1">
                  <p className="text-xs text-muted-foreground">"retakan sepanjang 5cm pada cangkang luar"</p>
                  <p className="text-xs text-success font-medium">✓ Detail kondisi kerusakan jelas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Scoring */}
          <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
            <h4 className="text-sm font-semibold">Detail Scoring</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>WHAT - Deskripsi hazard jelas</span>
                <span className="font-medium text-success">+20</span>
              </div>
              <div className="flex justify-between">
                <span>WHEN - Waktu tercatat</span>
                <span className="font-medium text-success">+10</span>
              </div>
              <div className="flex justify-between">
                <span>WHERE - Lokasi disebutkan</span>
                <span className="font-medium text-success">+15</span>
              </div>
              <div className="flex justify-between">
                <span>WHY - Konteks risiko jelas</span>
                <span className="font-medium text-success">+10</span>
              </div>
              <div className="flex justify-between">
                <span>HOW - Detail kondisi spesifik</span>
                <span className="font-medium text-success">+15</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span>WHO - Identitas pekerja tidak disebutkan</span>
                <span className="font-medium text-warning">-10</span>
              </div>
              <div className="flex justify-between">
                <span>WHO - Jumlah terdampak tidak disebutkan</span>
                <span className="font-medium text-warning">-5</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 mt-2 font-semibold">
                <span>Total Score</span>
                <span className="text-primary">65/100</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
