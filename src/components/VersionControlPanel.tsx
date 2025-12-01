import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GitBranch, Calendar, CheckCircle2, FileText } from "lucide-react";

export const APP_VERSION = "v0.1.0-poc";

const CHANGELOG = [
  {
    category: "Data Integration",
    items: [
      "Auto pull report data from BEATS by ID",
      "Detect invalid / wrong report ID",
      "Reset button that clears ID and AI analysis result (if any)",
    ],
  },
  {
    category: "Hazard Report Display",
    items: [
      "Display hazard report detail, including:",
      "• Report metadata (ID, reporter, timestamp, etc.)",
      "• Map preview with a link/button to open full map",
      "• Findings / Temuan detail",
      "• Image preview that can be zoomed in",
    ],
  },
  {
    category: "AI Analysis Panel",
    items: [
      "Empty state when there is no analysis yet",
      "Analyze button active only when metadata is valid",
      "After analysis, show two tabs: Score & Extraction",
    ],
  },
  {
    category: "Score Tab Features",
    items: [
      "Overall score (general score)",
      "Highlight / key AI findings",
      "Short summary of analysis",
      "Detailed scoring for 3 cards: Field Consistency, Description Checker, Image Relevance",
    ],
  },
  {
    category: "Action Buttons",
    items: [
      "Re-Analyze button for re-running AI analysis",
      "Save Result button with confirmation modal",
      "After saving, analysis becomes read-only (locked)",
    ],
  },
];

export const VersionControlPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1.5 text-muted-foreground hover:text-foreground">
          <GitBranch className="h-3 w-3" />
          Version Control
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader className="pb-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            Version Control
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] pr-4">
          <div className="py-6 space-y-6">
            {/* Current Version */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Current Version</h3>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="text-xs">
                      {APP_VERSION}
                    </Badge>
                    <span className="text-sm font-medium text-foreground">
                      Form Checker
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    POC
                  </Badge>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Last Updated</h3>
              <div className="p-4 bg-muted/50 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">December 1, 2025</p>
                    <p className="text-xs text-muted-foreground">10:30 AM WIB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Changelog */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Changelog / Feature List
              </h3>
              
              <div className="space-y-4">
                {CHANGELOG.map((section, index) => (
                  <div key={index} className="p-4 bg-card border border-border rounded-lg">
                    <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      {section.category}
                    </h4>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li 
                          key={itemIndex} 
                          className={`text-xs text-muted-foreground leading-relaxed ${
                            item.startsWith("•") ? "pl-3" : ""
                          }`}
                        >
                          {item.startsWith("•") ? item : `• ${item}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
