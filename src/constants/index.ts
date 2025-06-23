import { Info, FileText, MapPin, CheckCircle } from "lucide-react";

export interface Page {
  id: string;
  name: string;
  formType: string;
}

export const INITIAL_PAGES: Page[] = [
  { id: "1", name: "Info", formType: "info" },
  { id: "2", name: "Details", formType: "details" },
  { id: "3", name: "Other", formType: "other" },
  { id: "4", name: "Ending", formType: "ending" },
];

export const FORM_TYPES = [
  { type: "info", label: "Basic Information", icon: Info, color: "blue" },
  {
    type: "details",
    label: "Professional Details",
    icon: FileText,
    color: "green",
  },
  {
    type: "other",
    label: "Additional Information",
    icon: MapPin,
    color: "purple",
  },
  { type: "ending", label: "Final Steps", icon: CheckCircle, color: "orange" },
] as const;

export const COLOR_SCHEMES = {
  blue: {
    icon: "#3B82F6",
    border: "#DBEAFE",
    background: "#EFF6FF",
  },
  green: {
    icon: "#10B981",
    border: "#D1FAE5",
    background: "#ECFDF5",
  },
  purple: {
    icon: "#8B5CF6",
    border: "#EDE9FE",
    background: "#F5F3FF",
  },
  orange: {
    icon: "#F59E0B",
    border: "#FED7AA",
    background: "#FFFBEB",
  },
} as const;
