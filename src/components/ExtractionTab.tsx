import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Copy, ChevronDown, ChevronRight, Image, Layers, Users, Car, TreePine, TrafficCone, Building } from "lucide-react";
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
  "vehicles": [
    {
      "type": "Dump Truck",
      "attributes": ["HD785-7", "Yellow", "100 Ton Capacity"],
      "position": "Hauling Road - Pit 3",
      "operation_status": "Operating",
      "inter_unit_distance": "50 meters"
    },
    {
      "type": "Excavator",
      "attributes": ["PC2000-8", "Yellow", "20m³ Bucket"],
      "position": "Loading Point - Pit 3",
      "operation_status": "Loading",
      "inter_unit_distance": "15 meters"
    },
    {
      "type": "Light Vehicle",
      "attributes": ["Toyota Hilux", "White", "Supervision"],
      "position": "Pit Access Road",
      "operation_status": "Parked",
      "inter_unit_distance": "100 meters"
    }
  ],
  "traffic_control": [
    "Speed limit sign - 40 km/h",
    "Stop sign at intersection",
    "Traffic cone - road marking",
    "Flagman present at loading area",
    "Radio communication required"
  ],
  "access_infra": [
    "Main haul road - gravel surface",
    "Pit ramp - 10% gradient",
    "Safety berm - 1.5m height",
    "Drainage culvert",
    "Emergency assembly point signage"
  ],
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
  const [isOpen, setIsOpen] = useState(false);

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

// Vehicles Section with special rendering for vehicle objects
const VehiclesSection = ({ vehicles }: { vehicles: any[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isEmpty = vehicles.length === 0;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between p-3 bg-muted/50 hover:bg-muted/70 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-primary/10 rounded">
              <Car className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">Vehicles</span>
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
            <p className="text-xs text-muted-foreground italic text-center py-4">Tidak ada kendaraan terdeteksi</p>
          ) : (
            <div className="space-y-3">
              {vehicles.map((v, idx) => (
                <div key={idx} className="p-3 bg-muted/30 rounded-lg border border-border/50">
                  {typeof v === 'object' ? (
                    <div className="space-y-0">
                      <KeyValueRow label="Type" value={v.type} />
                      <KeyValueRow label="Attributes" value={v.attributes} />
                      <KeyValueRow label="Position" value={v.position} />
                      <KeyValueRow label="Operation Status" value={v.operation_status} />
                      <KeyValueRow label="Inter Unit Distance" value={v.inter_unit_distance} />
                    </div>
                  ) : (
                    <span className="text-xs text-foreground">{String(v)}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

// Traffic Control Section
const TrafficControlSection = ({ trafficControl }: { trafficControl: any[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isEmpty = trafficControl.length === 0;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between p-3 bg-muted/50 hover:bg-muted/70 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-primary/10 rounded">
              <TrafficCone className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">Traffic Control</span>
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
            <p className="text-xs text-muted-foreground italic text-center py-4">Tidak ada traffic control terdeteksi</p>
          ) : (
            <ul className="space-y-2">
              {trafficControl.map((t, idx) => (
                <li key={idx} className="text-xs text-foreground flex items-start gap-2 p-2 bg-muted/30 rounded">
                  <span className="text-muted-foreground">•</span>
                  <span>{typeof t === 'object' ? JSON.stringify(t) : String(t)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

// Access Infrastructure Section
const AccessInfraSection = ({ accessInfra }: { accessInfra: any[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isEmpty = accessInfra.length === 0;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between p-3 bg-muted/50 hover:bg-muted/70 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-primary/10 rounded">
              <Building className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">Access Infrastructure</span>
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
            <p className="text-xs text-muted-foreground italic text-center py-4">Tidak ada access infrastructure terdeteksi</p>
          ) : (
            <ul className="space-y-2">
              {accessInfra.map((a, idx) => (
                <li key={idx} className="text-xs text-foreground flex items-start gap-2 p-2 bg-muted/30 rounded">
                  <span className="text-muted-foreground">•</span>
                  <span>{typeof a === 'object' ? JSON.stringify(a) : String(a)}</span>
                </li>
              ))}
            </ul>
          )}
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
              defaultOpen={false}
            />

            {/* Composition */}
            <CollapsibleSection 
              title="Composition" 
              icon={Layers} 
              data={extractionData.composition}
              defaultOpen={false}
            />

            {/* People & PPE - Special rendering */}
            <PPESection data={extractionData.people_ppe} />

            {/* Vehicles */}
            <VehiclesSection vehicles={extractionData.vehicles} />

            {/* Traffic Control */}
            <TrafficControlSection trafficControl={extractionData.traffic_control} />

            {/* Access Infrastructure */}
            <AccessInfraSection accessInfra={extractionData.access_infra} />

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
