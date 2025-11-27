import { X, ChevronDown, ChevronUp, CheckCircle2, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface ChainOfThoughtSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChainOfThoughtSidebar = ({ isOpen, onClose }: ChainOfThoughtSidebarProps) => {
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({});

  if (!isOpen) return null;

  const toggleStep = (index: number) => {
    setExpandedSteps(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const steps = [
    {
      title: "Seeing & Extraction",
      duration: "120ms",
      summary: "Sistem membaca gambar dan mengekstraksi informasi visual dasar.",
      details: `Image scale: normal
Source: handheld_hp_portable_begesit
Quality: exposure=normal, low_light=none, blur=mild, noise=none

IE (ringkas):
• central_object: boom arm excavator, size: besar (≈3–4 m)
• people_ppe: 3 pekerja, small_group, helm & hi-vis terdeteksi
• vehicles: excavator (status: maintenance_or_repair)
• environment: surface kering & padat, FOV sedang, clutter level mixed`,
      status: "complete"
    },
    {
      title: "Menyiapkan Strategi IE",
      duration: "15ms",
      summary: "Berdasar kategori gambar dan kualitas, sistem memilih fokus pemeriksaan.",
      details: `Fokus utama:
• people/ppe
• komposisi area lifting
• akses/platform kerja

Pemeriksaan mikro:
• detail HP/seatbelt: dibaca hati-hati (blur ringan)

Pemeriksaan makro:
• layout area, clutter, jarak pekerja ke boom arm

Task plan:
T1. Validasi Tools Pengamatan
T2. Validasi Lokasi & Detail Lokasi
T3. Validasi Deskripsi Minimum (5W1H)
T4. Validasi Konsistensi Gambar vs Deskripsi
T5. Validasi Quick Action & Ketidaksesuaian`,
      status: "complete"
    },
    {
      title: "Validasi Tools Pengamatan",
      duration: "40ms",
      summary: "Sistem membandingkan field Tools Pengamatan di form dengan sumber gambar aktual.",
      details: `Form.tools: "Coaching – Interaksi Langsung"
Deteksi visual: sudut pandang handheld (kamera HP), jarak dekat, bukan CCTV/drone

Penilaian:
• tool_match_status: match
• catatan: Jenis framing dan kualitas gambar konsisten dengan dokumentasi coaching/handheld.`,
      status: "complete"
    },
    {
      title: "Validasi Lokasi & Detail Lokasi",
      duration: "55ms",
      summary: "Sistem membandingkan Lokasi + Detail Lokasi (teks) dengan pola visual area.",
      details: `Form.lokasi: "Disposal Rawa QSV 3 FAD"
Detail lokasi (teks): menyebut disposal area dan platform kerja

Pola visual:
• tidak terlihat pit wall atau haul road utama
• area lebih mirip platform kerja/maintenance bay, bukan disposal terbuka

Penilaian:
• location_match_status: partial
• catatan: Teks menyebut disposal, namun visual lebih mendekati area kerja/maintenance. Perlu klarifikasi jika disposal benar-benar dimaksud.`,
      status: "warning"
    },
    {
      title: "Validasi Deskripsi Minimum (5W1H)",
      duration: "80ms",
      summary: "Sistem mengecek apakah deskripsi menjawab apa, di mana, siapa, kapan/shift, bagaimana.",
      details: `Pemeriksaan:
• Apa: terdapat pelanggaran dumping di area kerja → TERBACA
• Di mana: lokasi tercantum namun tidak sepenuhnya konsisten dengan visual → PARSIAL
• Siapa: pekerja/pihak terlibat disebut secara umum, tanpa identitas peran rinci → MINIMAL
• Kapan/shift: informasi waktu/shift tidak eksplisit di deskripsi → TIDAK JELAS
• Bagaimana (HOW): mekanisme kejadian dijelaskan dalam 1–2 kalimat singkat

Penilaian:
• description_completeness: fair
• catatan: Deskripsi sudah menyebut inti kejadian, namun masih kurang detail waktu/shift dan peran pelaku.`,
      status: "warning"
    },
    {
      title: "Validasi Konsistensi Gambar vs Deskripsi",
      duration: "95ms",
      summary: "Sistem mencocokkan IE (People, Vehicles, Environment, Composition) dengan teks deskripsi.",
      details: `Pemeriksaan:
Objek yang disebut di teks:
• boom arm / aktivitas lifting → TERLIHAT di gambar
• area kerja dekat disposal → pola visual hanya mendukung sebagian

Objek penting di gambar yang tidak disebut di teks:
• jumlah pekerja di platform
• clutter di lantai (drum, toolbox, kabel)

Kontradiksi:
• tidak ditemukan kontradiksi langsung antara teks dan visual

Penilaian:
• image_text_consistency: mostly_consistent
• catatan: Deskripsi sejalan dengan komposisi umum, namun belum menyinggung risiko dari clutter dan jarak pekerja ke boom arm.`,
      status: "complete"
    },
    {
      title: "Validasi Quick Action & Ketidaksesuaian",
      duration: "110ms",
      summary: "Sistem menilai apakah Quick Action dan Ketidaksesuaian relevan dengan situasi di gambar.",
      details: `Form.ketidaksesuaian: fokus pada "Pelanggaran Dumping di Disposal"
Quick Action: instruksi penertiban aktivitas dumping dan pengaturan area

Bukti visual:
• menunjukkan aktivitas di platform kerja dengan boom arm dan beberapa pekerja
• tidak ada unit dumping aktif yang jelas terlihat

Penilaian:
• action_consistency: questionable
• catatan: Quick Action masih masuk akal untuk konteks disposal secara umum, namun tidak sepenuhnya ditopang oleh bukti visual yang lebih menunjukkan aktivitas kerja/maintenance daripada dumping aktif.`,
      status: "warning"
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 bottom-0 w-[440px] bg-card border-l border-border shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Chain of Thought</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Summary Header */}
        <div className="px-4 py-3 border-b border-border bg-muted/30">
          <p className="text-xs text-muted-foreground">
            Quality analysis completed in 18 seconds with overall status: <span className="font-semibold text-success">OK</span> (ready for scoring)
          </p>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {steps.map((step, index) => (
              <Collapsible
                key={index}
                open={expandedSteps[index]}
                onOpenChange={() => toggleStep(index)}
              >
                <div className="relative">
                  {/* Timeline line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-3 top-10 bottom-0 w-0.5 bg-border" />
                  )}
                  
                  {/* Step content */}
                  <div className="flex gap-3">
                    {/* Step icon */}
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center z-10">
                      {step.status === "complete" ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : step.status === "warning" ? (
                        <Info className="h-4 w-4 text-warning" />
                      ) : (
                        <span className="text-xs font-semibold text-muted-foreground">{index}</span>
                      )}
                    </div>
                    
                    {/* Step details */}
                    <div className="flex-1 pb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm text-foreground">
                          Step {index}: {step.title}
                        </h3>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          {step.duration}
                        </span>
                      </div>
                      
                      <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                        {step.summary}
                      </p>

                      <CollapsibleTrigger className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors">
                        {expandedSteps[index] ? (
                          <>
                            <ChevronUp className="h-3 w-3" />
                            <span>Sembunyikan detail teknis</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3" />
                            <span>Lihat detail teknis</span>
                          </>
                        )}
                      </CollapsibleTrigger>

                      <CollapsibleContent className="mt-2">
                        <div className="bg-muted/50 rounded-md p-3 border border-border">
                          <pre className="text-xs text-foreground leading-relaxed whitespace-pre-wrap font-mono">
                            {step.details}
                          </pre>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </div>
                </div>
              </Collapsible>
            ))}

            {/* Final Summary */}
            <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-foreground mb-1">Ringkasan Akhir</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    IE visual: berhasil dengan kualitas cukup baik. Validasi formulir menunjukkan tools_pengamatan match, lokasi partial match, deskripsi fair, konsistensi mostly_consistent, dan quick_action questionable. Rekomendasi: laporan dapat di-score dengan perbaikan pada penjelasan lokasi, detail 5W1H, dan penajaman Quick Action.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};