import { FileText, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const AppSidebar = () => {
  return (
    <div className="w-16 border-r bg-background flex flex-col items-center py-6 gap-6">
      {/* Logo */}
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <svg
          className="h-6 w-6 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L3 7V12C3 16.97 6.84 21.41 12 22C17.16 21.41 21 16.97 21 12V7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="11" r="1" fill="currentColor" />
          <circle cx="9" cy="13" r="1" fill="currentColor" />
          <circle cx="15" cy="13" r="1" fill="currentColor" />
          <circle cx="12" cy="15" r="1" fill="currentColor" />
        </svg>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col items-center gap-4">
        <TooltipProvider>
          {/* Modul Pelapor - Active */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <FileText className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="text-xs">
                Modul untuk input laporan, analisis otomatis, dan review hasil AI.
              </p>
            </TooltipContent>
          </Tooltip>

          {/* Modul Evaluator - Disabled */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <button
                disabled
                className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground opacity-50 cursor-not-allowed"
              >
                <Settings className="h-5 w-5" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent side="right" className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Coming Soon</h4>
                <p className="text-xs text-muted-foreground">
                  Modul ini akan menampilkan daftar hazard, daftar duplicate gambar,
                  serta modul rekomendasi & perbaikan. Fitur ini akan tersedia pada
                  fase pengembangan berikutnya.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </TooltipProvider>
      </div>
    </div>
  );
};
