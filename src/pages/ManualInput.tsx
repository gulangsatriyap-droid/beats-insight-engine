import { useState } from "react";
import { toast } from "sonner";
import { DetailObservasiPanel } from "@/components/DetailObservasiPanel";
import { TemuanPanel } from "@/components/TemuanPanel";
import { AnalysisResultPanel } from "@/components/AnalysisResultPanel";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2, FileText, AlertCircle, RotateCcw } from "lucide-react";

type AnalysisState = "none" | "analyzing" | "complete" | "saved";
type LoadingState = "idle" | "loading" | "success" | "error";

const ManualInput = () => {
  const [reportId, setReportId] = useState("");
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [analysisState, setAnalysisState] = useState<AnalysisState>("none");
  const [hasError, setHasError] = useState(false);
  
  const [showReAnalyzeConfirmation, setShowReAnalyzeConfirmation] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  const isReadOnly = analysisState === "saved";
  const metadataLoaded = loadingState === "success";

  const handleLoadMetadata = () => {
    if (!reportId.trim()) {
      toast.error("Masukkan ID laporan terlebih dahulu");
      return;
    }

    setLoadingState("loading");
    setHasError(false);

    // Simulate API call
    setTimeout(() => {
      // Simulate finding the ID (simple validation)
      const validIds = ["TEST ID BEATS 67957", "HZD-2025-000123"];
      const isValid = validIds.some(id => reportId.toUpperCase().includes(id.toUpperCase()));

      if (isValid) {
        setLoadingState("success");
        toast.success("Metadata berhasil dimuat");
      } else {
        setLoadingState("error");
        setHasError(true);
        toast.error("ID laporan tidak ditemukan");
      }
    }, 1500);
  };

  const handleReportIdChange = (value: string) => {
    setReportId(value);
    if (hasError) {
      setHasError(false);
      setLoadingState("idle");
    }
  };

  const handleAnalyze = () => {
    setAnalysisState("analyzing");
    toast.info("Menganalisis laporan...");

    setTimeout(() => {
      setAnalysisState("complete");
      toast.success("Analisis selesai");
    }, 3000);
  };

  const handleReAnalysis = () => {
    setShowReAnalyzeConfirmation(true);
  };

  const handleReAnalyzeConfirm = () => {
    setShowReAnalyzeConfirmation(false);
    setAnalysisState("analyzing");
    toast.info("Menganalisis ulang laporan...");

    setTimeout(() => {
      setAnalysisState("complete");
      toast.success("Analisis selesai");
    }, 3000);
  };

  const handleSaveResult = () => {
    setShowSaveConfirmation(true);
  };

  const handleSaveConfirm = () => {
    setShowSaveConfirmation(false);
    setAnalysisState("saved");
  };

  const handleReset = () => {
    setReportId("");
    setLoadingState("idle");
    setAnalysisState("none");
    setHasError(false);
    toast.info("Form telah direset");
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="border-b border-border bg-card shadow-sm">
            <div className="px-8 py-5">
              <div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">BEATS Hazard Reporting System</h1>
                <p className="text-sm text-muted-foreground mt-1">AI-Powered Safety Analysis & Evaluation</p>
              </div>
            </div>
          </header>

          <div className="p-8">
            <div className="grid grid-cols-12 gap-6">
              {/* Panel 1: Manual Input */}
              <div className="col-span-3">
                <div className="bg-card border border-border rounded-xl shadow-sm h-[calc(100vh-180px)] flex flex-col overflow-hidden">
                  <div className="p-5 overflow-y-auto flex-1 scrollbar-thin">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-foreground">Input Laporan</h3>
                      <p className="text-xs text-muted-foreground">Load data dari BEATS Mobile App</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      className="h-8 text-xs"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Reset
                    </Button>
                  </div>
                  
                  <div>
                    
                    {hasError && (
                      <div className="mb-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-destructive">Gagal memuat metadata</p>
                          <p className="text-xs text-destructive/80 mt-0.5">Pastikan ID yang dimasukkan sudah benar.</p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="reportId" className="text-sm font-medium text-foreground mb-1.5 block">
                          ID Laporan BEATS
                        </Label>
                        <Input
                          id="reportId"
                          type="text"
                          placeholder="Masukkan ID laporan dari BEATS Mobile App"
                          value={reportId}
                          onChange={(e) => handleReportIdChange(e.target.value)}
                          disabled={loadingState === "success"}
                          className={`h-10 text-sm transition-all ${
                            hasError 
                              ? "border-destructive focus-visible:ring-destructive animate-[shake_0.4s_ease-in-out]" 
                              : ""
                          }`}
                        />
                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                          ID laporan diambil dari BEATS Mobile App. Mohon masukkan ID yang tertera di detail laporan pada aplikasi mobile.
                        </p>
                        {hasError && (
                          <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            ID laporan tidak ditemukan. Periksa kembali ID dari BEATS Mobile App.
                          </p>
                        )}
                      </div>
                      <Button
                        onClick={handleLoadMetadata}
                        disabled={loadingState === "success" || !reportId.trim() || loadingState === "loading"}
                        className="w-full h-10 text-sm"
                      >
                        {loadingState === "loading" ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          "Load Metadata"
                        )}
                      </Button>
                    </div>
                  </div>

                  <Card className="p-4 bg-muted/30 border-border">
                    <h4 className="text-xs font-semibold text-foreground mb-3">Metadata Laporan</h4>
                    
                    {loadingState === "loading" && (
                      <div className="space-y-3 animate-pulse">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                        <div className="h-4 bg-muted rounded w-2/3"></div>
                      </div>
                    )}

                    {loadingState === "idle" && (
                      <div className="text-center py-6">
                        <FileText className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                        <p className="text-sm font-medium text-foreground mb-1">
                          Belum ada laporan yang dipilih
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Masukkan ID laporan dari BEATS Mobile App, lalu klik "Load Metadata" untuk melihat detail laporan.
                        </p>
                      </div>
                    )}

                    {loadingState === "error" && (
                      <div className="text-center py-6">
                        <AlertCircle className="h-12 w-12 text-destructive/40 mx-auto mb-3" />
                        <p className="text-sm font-medium text-foreground mb-1">
                          Metadata tidak dapat dimuat
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          ID laporan tidak ditemukan. Coba masukkan kembali ID dari BEATS Mobile App.
                        </p>
                      </div>
                    )}

                    {loadingState === "success" && (
                      <div className="space-y-2.5">
                        <div>
                          <p className="text-xs text-muted-foreground">ID Laporan</p>
                          <p className="text-sm font-medium text-foreground">TEST ID BEATS 67957</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Reporter</p>
                          <p className="text-sm font-medium text-foreground">Ahmad Suryanto</p>
                          <p className="text-xs text-muted-foreground">Supervisor – Dept. Mining</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">PIC</p>
                          <p className="text-sm font-medium text-foreground">Budi Santoso</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Timestamp</p>
                          <p className="text-sm font-medium text-foreground">2025-01-15, 09:32 WIB</p>
                        </div>
                      </div>
                    )}
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 2: Detail Observasi */}
            <div className="col-span-3">
              <div className="bg-card border border-border rounded-xl shadow-sm h-[calc(100vh-180px)] flex flex-col overflow-hidden">
                <div className="p-5 overflow-y-auto flex-1 scrollbar-thin">
                  <DetailObservasiPanel
                    hasData={metadataLoaded}
                    isReadOnly={isReadOnly}
                  />
                </div>
              </div>
            </div>

            {/* Panel 3: Temuan */}
            <div className="col-span-3">
              <div className="bg-card border border-border rounded-xl shadow-sm h-[calc(100vh-180px)] flex flex-col overflow-hidden">
                <div className="p-5 overflow-y-auto flex-1 scrollbar-thin">
                  <TemuanPanel
                    hasData={metadataLoaded}
                    isReadOnly={isReadOnly}
                  />
                </div>
              </div>
            </div>

            {/* Panel 4: AI Analysis */}
            <div className="col-span-3">
              <div className="bg-card border border-border rounded-xl shadow-sm h-[calc(100vh-180px)] flex flex-col overflow-hidden">
                <div className="p-5 overflow-y-auto flex-1 scrollbar-thin">
                  <AnalysisResultPanel
                    metadataLoaded={metadataLoaded}
                    hasAnalysis={analysisState === "complete" || analysisState === "saved"}
                    onAnalyze={handleAnalyze}
                    onReAnalyze={handleReAnalysis}
                    onSaveResult={handleSaveResult}
                    isAnalyzing={analysisState === "analyzing"}
                    isSaved={analysisState === "saved"}
                    showReAnalyzeConfirmation={showReAnalyzeConfirmation}
                    showSaveConfirmation={showSaveConfirmation}
                    onReAnalyzeConfirm={handleReAnalyzeConfirm}
                    onSaveConfirm={handleSaveConfirm}
                    onCloseReAnalyzeConfirmation={() => setShowReAnalyzeConfirmation(false)}
                    onCloseSaveConfirmation={() => setShowSaveConfirmation(false)}
                  />
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ManualInput;
