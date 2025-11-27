import { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const extractionData = {
  "image_category": {
    "scale": "normal",
    "source": "handheld_hp_portable_begesit",
    "quality": {
      "exposure_condition": "normal",
      "low_light_level": "none",
      "motion_blur_level": "mild",
      "noise_level": "none",
      "quality_notes": "Detail pekerja dan unit masih terbaca. Motion blur ringan membuat detail tangan kurang tajam."
    }
  },
  "need_additional_information": false,
  "recommended_additional_information": [],
  "ie_strategy": "Fokus pada people/ppe dan hubungan pekerja dengan alat lift. Analisis mikro masih memungkinkan, namun detail HP/seatbelt kurang pasti karena blur ringan.",
  "information_extraction": {
    "composition": {
      "central_object": {
        "name": "boom arm excavator",
        "shape": "lengan logam memanjang dengan attachment di ujungnya",
        "material": "metal",
        "estimated_size": "besar (≈3–4 m)",
        "contextual_function": "komponen utama proses lifting/pergerakan material"
      },
      "surrounding_objects": [
        "lifting sling",
        "chain hook",
        "toolbox kecil",
        "drum plastik biru",
        "platform kerja dengan railing",
        "kabel di lantai"
      ],
      "composition_interpretation": "Frame menunjukkan konteks pekerjaan maintenance/lifting. Ada beberapa pekerja dekat zona pergerakan boom arm. Area berisi objek-objek kecil yang menciptakan ruang kerja agak padat."
    },
    "people_ppe": {
      "person_count": 3,
      "people_distribution": "small_group",
      "ppe_equipment": {
        "helm": {
          "status": "terdeteksi",
          "colors": ["kuning", "putih"]
        },
        "hi_vis_vest": {
          "status": "terdeteksi",
          "pattern": "strip reflektif terlihat"
        },
        "pakaian_kerja": {
          "lengan": "panjang",
          "warna": "oranye dan biru"
        },
        "sarung_tangan": "tidak_jelas",
        "safety_boots": "terlihat dipakai",
        "fall_protection": {
          "harness": "tidak_terlihat",
          "lanyard": "tidak_terlihat"
        },
        "apd_khusus": []
      },
      "behavior_and_body_position": {
        "body_positions": [
          "dua pekerja berdiri di dekat boom arm",
          "satu pekerja membungkuk sedikit memeriksa sling"
        ],
        "hand_activity": [
          "pekerja kiri memegang sling",
          "pekerja kanan tampak memegang alat kecil (tidak jelas)"
        ],
        "orientation": [
          "sebagian menghadap ke boom arm",
          "satu pekerja menghadap samping"
        ],
        "location_context": [
          "semua berada di platform kerja",
          "radius dekat area lifting"
        ]
      }
    },
    "vehicles": {
      "vehicle_types": ["excavator"],
      "vehicle_attributes": [
        {
          "type": "excavator",
          "lampu": "tidak_jelas",
          "beacon": "tidak_terlihat",
          "buggy_whip": "tidak_ada",
          "posisi_lajur": "tidak_relevan (area kerja statis)",
          "arah_hadap": "menyamping"
        }
      ],
      "vehicle_operational_status": "maintenance_or_repair"
    },
    "traffic_control": {
      "traffic_signs": [],
      "barriers_and_road_infrastructure": [
        "cone oranye (1)",
        "water barrier putih (di belakang area)"
      ],
      "key_geographical_elements": []
    },
    "access_infra": {
      "access_types": ["platform_kerja", "railing", "tangga_logam"],
      "access_condition": "aman (railing utuh, akses tidak terhalang)"
    },
    "environment": {
      "surface_condition": "kering dan padat",
      "water_proximity": [],
      "geotechnical_indicators": [],
      "spatial_composition": {
        "field_of_view": "sedang",
        "clutter_level": "mixed",
        "hazard_spatial_relation": [
          "pekerja berada dekat boom arm yang sedang diatur posisinya",
          "platform cukup sempit dengan beberapa objek di lantai"
        ]
      }
    }
  }
};

const SectionTable = ({ title, rows }: { title: string; rows: { field: string; value: any }[] }) => (
  <div className="mb-6">
    <h4 className="text-sm font-semibold text-foreground mb-3 pb-2 border-b border-border">{title}</h4>
    <Table>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow key={idx} className="border-border hover:bg-muted/30">
            <TableCell className="text-xs py-2.5 font-medium text-muted-foreground w-1/3">{row.field}</TableCell>
            <TableCell className="text-xs py-2.5 text-foreground">
              {Array.isArray(row.value) ? (
                row.value.length > 0 ? row.value.join("; ") : <span className="text-muted-foreground italic">(kosong)</span>
              ) : row.value === null || row.value === undefined || row.value === "" ? (
                <span className="text-muted-foreground italic">(kosong)</span>
              ) : typeof row.value === "object" ? (
                JSON.stringify(row.value)
              ) : (
                String(row.value)
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export const ExtractionTab = () => {
  const [viewMode, setViewMode] = useState<"table" | "json">("table");

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(extractionData, null, 2));
    toast.success("JSON copied to clipboard");
  };

  const tableViewSections = [
    {
      title: "Image Category",
      rows: [
        { field: "Scale", value: extractionData.image_category.scale },
        { field: "Source", value: extractionData.image_category.source },
        { field: "Exposure", value: extractionData.image_category.quality.exposure_condition },
        { field: "Low light", value: extractionData.image_category.quality.low_light_level },
        { field: "Motion blur", value: extractionData.image_category.quality.motion_blur_level },
        { field: "Noise", value: extractionData.image_category.quality.noise_level },
        { field: "Quality notes", value: extractionData.image_category.quality.quality_notes },
      ]
    },
    {
      title: "Analysis Strategy",
      rows: [
        { field: "Need additional information", value: String(extractionData.need_additional_information) },
        { field: "Recommended additional information", value: extractionData.recommended_additional_information },
        { field: "IE Strategy", value: extractionData.ie_strategy },
      ]
    },
    {
      title: "Composition",
      rows: [
        { field: "Central object – name", value: extractionData.information_extraction.composition.central_object.name },
        { field: "Central object – shape", value: extractionData.information_extraction.composition.central_object.shape },
        { field: "Central object – material", value: extractionData.information_extraction.composition.central_object.material },
        { field: "Central object – estimated size", value: extractionData.information_extraction.composition.central_object.estimated_size },
        { field: "Central object – function", value: extractionData.information_extraction.composition.central_object.contextual_function },
        { field: "Surrounding objects", value: extractionData.information_extraction.composition.surrounding_objects },
        { field: "Composition interpretation", value: extractionData.information_extraction.composition.composition_interpretation },
      ]
    },
    {
      title: "People / PPE",
      rows: [
        { field: "Person count", value: extractionData.information_extraction.people_ppe.person_count },
        { field: "People distribution", value: extractionData.information_extraction.people_ppe.people_distribution },
        { field: "Helm", value: `${extractionData.information_extraction.people_ppe.ppe_equipment.helm.status} (${extractionData.information_extraction.people_ppe.ppe_equipment.helm.colors.join(", ")})` },
        { field: "Hi-vis vest", value: `${extractionData.information_extraction.people_ppe.ppe_equipment.hi_vis_vest.status}, ${extractionData.information_extraction.people_ppe.ppe_equipment.hi_vis_vest.pattern}` },
        { field: "Pakaian kerja", value: `${extractionData.information_extraction.people_ppe.ppe_equipment.pakaian_kerja.lengan}, ${extractionData.information_extraction.people_ppe.ppe_equipment.pakaian_kerja.warna}` },
        { field: "Sarung tangan", value: extractionData.information_extraction.people_ppe.ppe_equipment.sarung_tangan },
        { field: "Safety boots", value: extractionData.information_extraction.people_ppe.ppe_equipment.safety_boots },
        { field: "Fall protection – harness", value: extractionData.information_extraction.people_ppe.ppe_equipment.fall_protection.harness },
        { field: "Fall protection – lanyard", value: extractionData.information_extraction.people_ppe.ppe_equipment.fall_protection.lanyard },
        { field: "APD khusus", value: extractionData.information_extraction.people_ppe.ppe_equipment.apd_khusus },
        { field: "Body positions", value: extractionData.information_extraction.people_ppe.behavior_and_body_position.body_positions },
        { field: "Hand activity", value: extractionData.information_extraction.people_ppe.behavior_and_body_position.hand_activity },
        { field: "Orientation", value: extractionData.information_extraction.people_ppe.behavior_and_body_position.orientation },
        { field: "Location context", value: extractionData.information_extraction.people_ppe.behavior_and_body_position.location_context },
      ]
    },
    {
      title: "Vehicles",
      rows: [
        { field: "Vehicle types", value: extractionData.information_extraction.vehicles.vehicle_types },
        { field: "Vehicle attributes", value: extractionData.information_extraction.vehicles.vehicle_attributes.map(v => 
          `type: ${v.type}; lampu: ${v.lampu}; beacon: ${v.beacon}; buggy_whip: ${v.buggy_whip}; posisi_lajur: ${v.posisi_lajur}; arah_hadap: ${v.arah_hadap}`
        ).join(" | ") },
        { field: "Vehicle operational status", value: extractionData.information_extraction.vehicles.vehicle_operational_status },
      ]
    },
    {
      title: "Traffic Control",
      rows: [
        { field: "Traffic signs", value: extractionData.information_extraction.traffic_control.traffic_signs },
        { field: "Barriers & road infrastructure", value: extractionData.information_extraction.traffic_control.barriers_and_road_infrastructure },
        { field: "Key geographical elements", value: extractionData.information_extraction.traffic_control.key_geographical_elements },
      ]
    },
    {
      title: "Access & Infrastructure",
      rows: [
        { field: "Access types", value: extractionData.information_extraction.access_infra.access_types },
        { field: "Access condition", value: extractionData.information_extraction.access_infra.access_condition },
      ]
    },
    {
      title: "Environment",
      rows: [
        { field: "Surface condition", value: extractionData.information_extraction.environment.surface_condition },
        { field: "Water proximity", value: extractionData.information_extraction.environment.water_proximity },
        { field: "Geotechnical indicators", value: extractionData.information_extraction.environment.geotechnical_indicators },
        { field: "Field of view", value: extractionData.information_extraction.environment.spatial_composition.field_of_view },
        { field: "Clutter level", value: extractionData.information_extraction.environment.spatial_composition.clutter_level },
        { field: "Hazard spatial relation", value: extractionData.information_extraction.environment.spatial_composition.hazard_spatial_relation },
      ]
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex items-start justify-between pb-3 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Extraction Result</h3>
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
      <Card className="p-6 bg-card border-border shadow-sm">
        {viewMode === "table" ? (
          <div className="space-y-6">
            {tableViewSections.map((section, idx) => (
              <SectionTable key={idx} title={section.title} rows={section.rows} />
            ))}
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