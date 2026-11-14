export type Urgency = "high" | "medium" | "low" | string;

export interface CareRequest {
  id: number;
  ref: string;
  category: string;
  category_label: string;
  district: string;
  urgency: Urgency;
  urgency_label: string;
  needs: string[];
  household: string[];
  summary: string;
  /** WhatsApp number, only when the person agreed to show it. */
  contact_phone: string;
  contact_link: string;
  helpers_wanted: number;
  offers_count: number;
  still_needed: number;
  created_at: string;
}

export interface Category {
  value: string;
  label: string;
}

export interface BoardResponse {
  requests: CareRequest[];
  categories: Category[];
  districts: string[];
}

export type FieldErrors = Partial<Record<string, string[]>>;

export interface Offering {
  id: number;
  ref: string;
  category: string;
  category_label: string;
  district: string;
  offers: string[];
  availability: string;
  contact_phone: string;
  contact_link: string;
  summary: string;
  created_at: string;
}

export interface OfferingsResponse {
  offerings: Offering[];
  categories: Category[];
  districts: string[];
}

export interface BoardFilters {
  category?: string;
  district?: string;
}
