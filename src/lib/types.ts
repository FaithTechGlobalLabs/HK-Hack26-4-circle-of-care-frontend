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

/** One board post of either kind, as returned by /api/posts/<id>. Never includes the chat messages. */
export interface Post {
  id: number;
  ref: string;
  kind: "need" | "offer";
  kind_label: string;
  category: string;
  category_label: string;
  district: string;
  urgency: Urgency;
  urgency_label: string;
  status: string;
  status_label: string;
  /** What would help (needs) or what they can give (offers). */
  needs: string[];
  household: string[];
  availability: string;
  summary: string;
  /** Fuller anonymous write-up; may be empty on older posts. */
  details: string;
  helpers_wanted: number;
  contact_phone: string;
  contact_link: string;
  language: string;
  message_count: number;
  started_at: string | null;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
}
