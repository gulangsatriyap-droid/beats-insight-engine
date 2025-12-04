import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Copy, ChevronDown, ChevronRight, Image, Layers, Users, Car, TreePine } from "lucide-react";
import { toast } from "sonner";

const extractionData = {
  "image_properties": {
    "scale": "normal",
    "source": "Handheld",
    "lighting": "Daylight",
    "image_quality": "Clear"
  },
  "composition": {
    "central_object": {
      "name": "pipe",
      "shape": "cylinder",
      "material": "steel",
      "estimated_size": "medium"
    },
    "surrounding_objects": ["hammer", "chisel", "metal structure"],
    "activities": ["working on pipe"],
    "relationships": ["person working on pipe with hammer and chisel"],
    "area_condition": "Not visible"
  },
  "people_ppe": {
    "person_count": 1,
    "activities": ["working"],
    "ppe_equipment": {
      "safety_helmet": {
        "detected": true,
        "color": "white",
        "properly_worn": true,
        "description": "safety helmet"
      },
      "safety_glass": {
        "detected": false,
        "color": "Not visible",
        "properly_worn": false,
        "description": "safety glass"
      },
      "reflective_vest": {
        "detected": true,
        "color": "orange",
        "properly_worn": true,
        "description": "reflective vest"
      },
      "gloves": {
        "detected": false,
        "color": "Not visible",
        "properly_worn": false,
        "description": "gloves"
      },
      "safety_boots": {
        "detected": true,
        "color": "brown",
        "properly_worn": true,
        "description": "safety boots"
      },
      "safety_harness": {
        "detected": false,
        "color": "Not visible",
        "properly_worn": false,
        "description": "safety harness"
      },
      "respiratory_mask": {
        "detected": false,
        "color": "Not visible",
        "properly_worn": false,
        "description": "respiratory mask"
      },
      "earplugs": {
        "detected": false,
        "color": "Not visible",
        "properly_worn": false,
        "description": "earplugs"
      }
    },
    "people_relationships": ["person working alone"],
    "hazard_potential": ["struck by hammer", "struck by chisel", "falling objects"]
  },
  "vehicles": [],
  "traffic_control": [],
  "access_infra": [],
  "environment": {
    "composition": "metal structure",
    "type": "artificial",
    "condition": "dry",
    "size": "small"
  }
};

// Helper component for rendering key-value pairs
const KeyValueRow = ({ label, value, indent = 0 }: { label: string; value: any; indent?: number }) => {
  const paddingLeft = indent * 16;
  
  if (value === null || value === undefined || value === "") {
    return (
      <div className="flex py-2 border-b border-border/50 last:border-b-0" style={{ paddingLeft }}>
        <span className="text-xs font-medium text-muted-foreground w-2/5 capitalize">{label.replace(/_/g, ' ')}</span>
        <span className="text-xs text-muted-foreground italic">(kosong)</span>
      </div>
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return (
        <div className="flex py-2 border-b border-border/50 last:border-b-0" style={{ paddingLeft }}>
          <span className="text-xs font-medium text-muted-foreground w-2/5 capitalize">{label.replace(/_/g, ' ')}</span>
          <span className="text-xs text-muted-foreground italic">(kosong)</span>
        </div>
      );
    }
    return (
      <div className="py-2 border-b border-border/50 last:border-b-0" style={{ paddingLeft }}>
        <span className="text-xs font-medium text-muted-foreground capitalize">{label.replace(/_/g, ' ')}</span>
        <ul className="mt-1.5 ml-4 space-y-1">
          {value.map((item, idx) => (
            <li key={idx} className="text-xs text-foreground flex items-start gap-2">
              <span className="text-muted-foreground">•</span>
              <span>{typeof item === 'object' ? JSON.stringify(item) : String(item)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (typeof value === 'object') {
    return (
      <div className="py-2 border-b border-border/50 last:border-b-0" style={{ paddingLeft }}>
        <span className="text-xs font-medium text-muted-foreground capitalize mb-2 block">{label.replace(/_/g, ' ')}</span>
        <div className="ml-4 bg-muted/30 rounded-md p-2">
          {Object.entries(value).map(([k, v]) => (
            <KeyValueRow key={k} label={k} value={v} indent={0} />
          ))}
        </div>
      </div>
    );
  }

  if (typeof value === 'boolean') {
    return (
      <div className="flex py-2 border-b border-border/50 last:border-b-0" style={{ paddingLeft }}>
        <span className="text-xs font-medium text-muted-foreground w-2/5 capitalize">{label.replace(/_/g, ' ')}</span>
        <span className={`text-xs font-medium ${value ? 'text-success' : 'text-muted-foreground'}`}>
          {value ? 'Yes' : 'No'}
        </span>
      </div>
    );
  }

  return (
    <div className="flex py-2 border-b border-border/50 last:border-b-0" style={{ paddingLeft }}>
      <span className="text-xs font-medium text-muted-foreground w-2/5 capitalize">{label.replace(/_/g, ' ')}</span>
      <span className="text-xs text-foreground">{String(value)}</span>
    </div>
  );
};

// Collapsible section component
const CollapsibleSection = ({ 
  title, 
  icon: Icon, 
  data, 
  defaultOpen = false 
}: { 
  title: string; 
  icon: React.ElementType; 
  data: Record<string, any>; 
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isEmpty = Object.keys(data).length === 0 || 
    (Array.isArray(data) && data.length === 0);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between p-3 bg-muted/50 hover:bg-muted/70 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-primary/10 rounded">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">{title}</span>
            {isEmpty && (
              <span className="text-xs text-muted-foreground italic">(tidak ada data)</span>
            )}
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4 border border-t-0 border-border rounded-b-lg bg-card">
          {isEmpty ? (
            <p className="text-xs text-muted-foreground italic text-center py-4">Tidak ada data untuk ditampilkan</p>
          ) : (
            <div className="space-y-0">
              {Object.entries(data).map(([key, value]) => (
                <KeyValueRow key={key} label={key} value={value} />
              ))}
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

// PPE Equipment section with special rendering
const PPESection = ({ data }: { data: typeof extractionData.people_ppe }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between p-3 bg-muted/50 hover:bg-muted/70 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-primary/10 rounded">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">People & PPE</span>
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4 border border-t-0 border-border rounded-b-lg bg-card space-y-4">
          {/* Basic Info */}
          <div>
            <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Info Dasar</h5>
            <div className="space-y-0">
              <KeyValueRow label="Person Count" value={data.person_count} />
              <KeyValueRow label="Activities" value={data.activities} />
              <KeyValueRow label="People Relationships" value={data.people_relationships} />
              <KeyValueRow label="Hazard Potential" value={data.hazard_potential} />
            </div>
          </div>

          {/* PPE Equipment Grid */}
          <div>
            <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">PPE Equipment</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(data.ppe_equipment).map(([key, ppe]) => (
                <div 
                  key={key} 
                  className={`p-3 rounded-lg border ${
                    ppe.detected 
                      ? 'bg-success/5 border-success/30' 
                      : 'bg-muted/30 border-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium capitalize">{key.replace(/_/g, ' ')}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      ppe.detected 
                        ? 'bg-success/20 text-success' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {ppe.detected ? 'Detected' : 'Not Detected'}
                    </span>
                  </div>
                  {ppe.detected && (
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Color:</span>
                        <span className="text-foreground">{ppe.color}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Properly Worn:</span>
                        <span className={ppe.properly_worn ? 'text-success' : 'text-warning'}>
                          {ppe.properly_worn ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

// Combined Vehicles/Traffic/Access section
const VehiclesTrafficAccessSection = ({ 
  vehicles, 
  trafficControl, 
  accessInfra 
}: { 
  vehicles: any[]; 
  trafficControl: any[]; 
  accessInfra: any[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isEmpty = vehicles.length === 0 && trafficControl.length === 0 && accessInfra.length === 0;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between p-3 bg-muted/50 hover:bg-muted/70 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-primary/10 rounded">
              <Car className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">Vehicles / Traffic Control / Access Infra</span>
            {isEmpty && (
              <span className="text-xs text-muted-foreground italic">(tidak ada data)</span>
            )}
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4 border border-t-0 border-border rounded-b-lg bg-card space-y-4">
          {/* Vehicles */}
          <div>
            <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Vehicles</h5>
            {vehicles.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">Tidak ada kendaraan terdeteksi</p>
            ) : (
              <div className="space-y-2">
                {vehicles.map((v, idx) => (
                  <div key={idx} className="p-2 bg-muted/30 rounded text-xs">
                    {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Traffic Control */}
          <div>
            <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Traffic Control</h5>
            {trafficControl.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">Tidak ada traffic control terdeteksi</p>
            ) : (
              <div className="space-y-2">
                {trafficControl.map((t, idx) => (
                  <div key={idx} className="p-2 bg-muted/30 rounded text-xs">
                    {typeof t === 'object' ? JSON.stringify(t) : String(t)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Access Infrastructure */}
          <div>
            <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Access Infrastructure</h5>
            {accessInfra.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">Tidak ada access infrastructure terdeteksi</p>
            ) : (
              <div className="space-y-2">
                {accessInfra.map((a, idx) => (
                  <div key={idx} className="p-2 bg-muted/30 rounded text-xs">
                    {typeof a === 'object' ? JSON.stringify(a) : String(a)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export const ExtractionTab = () => {
  const [viewMode, setViewMode] = useState<"table" | "json">("table");

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(extractionData, null, 2));
    toast.success("JSON copied to clipboard");
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex items-start justify-between pb-3 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Information Extraction</h3>
          <p className="text-xs text-muted-foreground mt-1">Source: Extraction engine v1</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">View as</span>
          <Select value={viewMode} onValueChange={(value: "table" | "json") => setViewMode(value)}>
            <SelectTrigger className="w-32 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="table">Table</SelectItem>
              <SelectItem value="json">JSON Raw</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content Area */}
      <Card className="p-4 bg-card border-border shadow-sm">
        {viewMode === "table" ? (
          <div className="space-y-3">
            {/* Image Properties */}
            <CollapsibleSection 
              title="Image Properties" 
              icon={Image} 
              data={extractionData.image_properties}
              defaultOpen={true}
            />

            {/* Composition */}
            <CollapsibleSection 
              title="Composition" 
              icon={Layers} 
              data={extractionData.composition}
              defaultOpen={true}
            />

            {/* People & PPE - Special rendering */}
            <PPESection data={extractionData.people_ppe} />

            {/* Vehicles / Traffic Control / Access Infra - Combined */}
            <VehiclesTrafficAccessSection 
              vehicles={extractionData.vehicles}
              trafficControl={extractionData.traffic_control}
              accessInfra={extractionData.access_infra}
            />

            {/* Environment */}
            <CollapsibleSection 
              title="Environment" 
              icon={TreePine} 
              data={extractionData.environment}
              defaultOpen={false}
            />
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-foreground">JSON Raw (Extraction Result)</h4>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopyJSON}
                className="h-7 text-xs gap-1.5"
              >
                <Copy className="h-3 w-3" />
                Copy JSON
              </Button>
            </div>
            <pre className="bg-muted p-4 rounded-md text-xs overflow-auto max-h-[600px] border border-border">
              <code className="text-foreground">{JSON.stringify(extractionData, null, 2)}</code>
            </pre>
          </div>
        )}
      </Card>
    </div>
  );
};
