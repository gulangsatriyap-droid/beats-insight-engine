import { ClipboardCheck, FileSearch, Settings2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const AppSidebar = () => {
  return (
    <div className="w-20 border-r bg-background flex flex-col items-center py-6">
      {/* Logo */}
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-primary/70 shadow-md mb-4">
        <svg
          className="h-8 w-8 text-primary-foreground"
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
          <circle cx="12" cy="11" r="1.2" fill="currentColor" />
          <circle cx="9" cy="13" r="1.2" fill="currentColor" />
          <circle cx="15" cy="13" r="1.2" fill="currentColor" />
          <circle cx="12" cy="15" r="1.2" fill="currentColor" />
        </svg>
      </div>

      {/* Separator */}
      <div className="w-10 h-px bg-border mb-6" />

      {/* Menu Items */}
      <TooltipProvider>
        <div className="flex flex-col items-center gap-4 flex-1">
          {/* Modul Pelapor - Active */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 shadow-sm hover:bg-primary/15 hover:shadow-md transition-all duration-200"
                aria-label="Modul Pelapor"
              >
                <ClipboardCheck className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p className="text-xs font-medium mb-1">Modul Pelapor</p>
              <p className="text-xs text-muted-foreground">
                Input laporan, analisis otomatis, dan review hasil AI
              </p>
            </TooltipContent>
          </Tooltip>

          {/* Modul Evaluator - Disabled */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted/30 text-muted-foreground/40 border border-border/50 cursor-default hover:border-border transition-colors"
                aria-label="Modul Evaluator (Coming Soon)"
                disabled
              >
                <FileSearch className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p className="text-xs font-medium mb-1">Modul Evaluator</p>
              <p className="text-xs text-muted-foreground">
                Meninjau hazard & rekomendasi perbaikan. Akan tersedia di fase berikutnya.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-px bg-border mb-4" />
          
          {/* Settings Icon */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                aria-label="Settings"
              >
                <Settings2 className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="text-xs">Pengaturan aplikasi</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};
