import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { TrendingUp, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useState } from "react";
import { ChainOfThoughtSidebar } from "./ChainOfThoughtSidebar";
import { ExtractionTab } from "./ExtractionTab";
import { ConfirmationModal } from "./ConfirmationModal";

interface AnalysisResultPanelProps {
  metadataLoaded: boolean;
  hasAnalysis: boolean;
  onAnalyze: () => void;
  onReAnalyze: () => void;
  onSaveResult: () => void;
  isAnalyzing?: boolean;
  isSaved?: boolean;
  showReAnalyzeConfirmation: boolean;
  showSaveConfirmation: boolean;
  onReAnalyzeConfirm: () => void;
  onSaveConfirm: () => void;
  onCloseReAnalyzeConfirmation: () => void;
  onCloseSaveConfirmation: () => void;
}

export const AnalysisResultPanel = ({
  metadataLoaded,
  hasAnalysis,
  onAnalyze,
  onReAnalyze,
  onSaveResult,
  isAnalyzing,
  isSaved,
  showReAnalyzeConfirmation,
  showSaveConfirmation,
  onReAnalyzeConfirm,
  onSaveConfirm,
  onCloseReAnalyzeConfirmation,
  onCloseSaveConfirmation
}: AnalysisResultPanelProps) => {
  const [isChainOfThoughtOpen, setIsChainOfThoughtOpen] = useState(false);
  const [expandedScores, setExpandedScores] = useState<Record<string, boolean>>({});

  const subScores = [
    {
      id: "field-consistency",
      name: "Field Consistency",
      score: 70,
      positivePoints: "Lokasi form & deskripsi konsisten",
      positiveDetail: "Informasi lokasi di field observasi sesuai dengan koordinat yang tercantum. Deskripsi lokasi detail dan konsisten dengan foto yang diupload.",
      negativePoints: "Perlu detail lebih spesifik tentang zona kerja",
      negativeDetail: "Sebaiknya tambahkan informasi zona kerja spesifik (misalnya: Pit 3 - Sector A) dan jarak dari titik referensi untuk memudahkan identifikasi lokasi."
    },
    {
      id: "description-completeness",
      name: "Description Completeness",
      score: 65,
      positivePoints: "Deskripsi hazard sudah jelas",
      positiveDetail: "Penjelasan mengenai kondisi hazard, dampak potensial, dan konteks operasional sudah cukup detail dan mudah dipahami.",
      negativePoints: "Belum menyebut pihak terdampak",
      negativeDetail: "Deskripsi perlu dilengkapi dengan informasi personel atau tim yang berpotensi terdampak, estimasi jumlah pekerja di area tersebut, dan shift operasi yang terpengaruh."
    },
    {
      id: "image-relevance",
      name: "Image Relevance",
      score: 95,
      positivePoints: "Gambar sangat relevan dengan temuan",
      positiveDetail: "Foto menunjukkan kondisi hazard dengan jelas, sudut pengambilan tepat, lighting memadai, dan fokus pada objek yang dilaporkan. Scale/ukuran hazard terlihat jelas.",
      negativePoints: "Angle foto bisa lebih optimal",
      negativeDetail: "Untuk dokumentasi yang lebih baik, pertimbangkan untuk menambahkan foto dari sudut berbeda atau close-up detail area kritis untuk analisis lebih mendalam."
    }
  ];

  const toggleScore = (id: string) => {
    setExpandedScores(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Header */}
      <div className="flex-shrink-0 space-y-4 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">AI Analysis</h3>
            {isSaved && (
              <Badge variant="secondary" className="text-xs bg-success/20 text-success border-success/30">
                Locked
              </Badge>
            )}
          </div>
          {hasAnalysis && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsChainOfThoughtOpen(true)}
              className="h-7 text-xs"
            >
              Trace
            </Button>
          )}
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {!metadataLoaded ? (
          <div className="py-12 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Belum ada hasil analisis.
            </p>
            <p className="text-xs text-muted-foreground">
              Masukkan ID laporan BEATS, lalu klik "Load Metadata".
            </p>
          </div>
        ) : !hasAnalysis ? (
          <div className="py-8 text-center space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Belum ada hasil analisis.
              </p>
              <p className="text-xs text-muted-foreground">
                Klik tombol Analyze untuk memulai.
              </p>
            </div>
            <Button
              onClick={onAnalyze}
              disabled={isAnalyzing}
              className="w-full h-10 text-sm font-medium"
              size="sm"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze"
              )}
            </Button>
          </div>
        ) : (
          <>
            {/* Action Buttons at Top */}
            {!isSaved && (
              <div className="mb-4 space-y-3">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 h-9 text-sm"
                    onClick={onReAnalyze}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? "Re-analyzing..." : "Re-analyze"}
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 h-9 text-sm bg-success hover:bg-success/90"
                    onClick={onSaveResult}
                    disabled={isAnalyzing}
                  >
                    Save Result
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground bg-muted/50 border border-border rounded p-2">
                  Re-analyze untuk analisa ulang. Hasil sebelumnya akan digantikan.
                </p>
              </div>
            )}

            {isSaved && (
              <div className="bg-success/10 border border-success/30 rounded-lg p-4 text-center mb-4">
                <p className="text-xs text-success font-medium">
                  ✓ Hasil analisis telah disimpan. Analisis tidak dapat diubah lagi.
                </p>
              </div>
            )}

            <Tabs defaultValue="score" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted">
                <TabsTrigger value="score" className="text-xs">Score</TabsTrigger>
                <TabsTrigger value="extraction" className="text-xs">Extraction</TabsTrigger>
              </TabsList>

              <TabsContent value="score" className="space-y-4 mt-4">
                {/* Overall Score */}
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-4 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">78</div>
                      <Badge className="bg-success/20 text-success border-success/30 text-xs">
                        Good
                      </Badge>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary/40" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Overall Score
                  </div>
                </div>

                {/* Sub-Scores with Expandable Details */}
                <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                  <h4 className="text-xs font-semibold text-foreground">Sub-scores</h4>
                  
                  {subScores.map((score) => (
                    <Collapsible 
                      key={score.id}
                      open={expandedScores[score.id]}
                      onOpenChange={() => toggleScore(score.id)}
                    >
                      <div className="space-y-2 border-b border-border pb-3 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">{score.name}</span>
                          <span className="font-semibold text-primary">{score.score}/100</span>
                        </div>
                        <Progress value={score.score} className="h-2" />
                        
                        {/* Positive Point */}
                        <div className="bg-success/10 rounded p-2 border border-success/20">
                          <p className="text-xs text-success font-medium">✓ {score.positivePoints}</p>
                        </div>
                        
                        {/* Negative Point */}
                        <div className="bg-warning/10 rounded p-2 border border-warning/20">
                          <p className="text-xs text-warning font-medium">⚠ {score.negativePoints}</p>
                        </div>

                        <CollapsibleTrigger className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                          {expandedScores[score.id] ? (
                            <>
                              <ChevronUp className="h-3 w-3" />
                              <span>Sembunyikan detail</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-3 w-3" />
                              <span>Lihat detail</span>
                            </>
                          )}
                        </CollapsibleTrigger>

                        <CollapsibleContent className="space-y-2 pt-2">
                          <div className="bg-success/5 rounded p-2 border-l-2 border-success">
                            <p className="text-xs text-foreground leading-relaxed">{score.positiveDetail}</p>
                          </div>
                          <div className="bg-warning/5 rounded p-2 border-l-2 border-warning">
                            <p className="text-xs text-foreground leading-relaxed">{score.negativeDetail}</p>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  ))}
                </div>

              </TabsContent>

              <TabsContent value="extraction" className="mt-4">
                <ExtractionTab />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>

      <ChainOfThoughtSidebar
        isOpen={isChainOfThoughtOpen}
        onClose={() => setIsChainOfThoughtOpen(false)}
      />

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={showReAnalyzeConfirmation}
        onClose={onCloseReAnalyzeConfirmation}
        onConfirm={onReAnalyzeConfirm}
        title="Lakukan analisis ulang?"
        description="Hasil lama akan diganti dengan yang baru."
      />

      <ConfirmationModal
        isOpen={showSaveConfirmation}
        onClose={onCloseSaveConfirmation}
        onConfirm={onSaveConfirm}
        title="Simpan hasil analisis ini?"
        description="Setelah data disimpan, hasil analisis akan tersimpan di sistem dan tidak dapat dianalisis ulang lagi. Pastikan hasil analisis sudah sesuai sebelum menyimpan."
      />
    </div>
  );
};
