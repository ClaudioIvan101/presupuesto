export type QuoteModel = "hour" | "feature" | "fixed" | "implementation" | "retainer" | "custom";

export type QuoteStatus = "accepted" | "viewed" | "sent" | "draft" | "rejected";

export interface ClientItem {
  id: string;
  name: string;
  avatar: string;
  company?: string;
  email: string;
  phone?: string;
  quotesCount: number;
  acceptedCount: number;
  totalValue: string;
  lastActivity: string;
  notes?: string;
}

export interface ActivityItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  time: string;
}

export interface FunnelItem {
  label: string;
  count: number;
  percentage: number;
}

export interface MetricItem {
  title: string;
  badge: string;
  value: string;
  subtext: string;
}

export interface QuoteItem {
  id: string;
  number: string;
  title: string;
  client: string;
  clientUrl?: string;
  avatar: string;
  model: QuoteModel;
  modelLabel: string;
  totalDisplay: string;
  total: number;
  currency: "ARS" | "USD" | "EUR";
  status: QuoteStatus;
  statusLabel: string;
  updatedAt: string;
  scope?: string;
  deliverables?: string[];
  time?: string;
}

export interface BuilderState {
  step: number;
  model: QuoteModel;
  project: string;
  client: string;
  scope: string;
  deliverables: string[];
  total: number;
  currency: "ARS" | "USD" | "EUR";
  time: string;
  validity: string;
}

export interface BudgetItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface BudgetClient {
  id: string;
  name: string;
  email: string;
  company?: string;
  createdAt?: string;
}

export interface Budget {
  id: string;
  number: string;
  title: string;
  client: BudgetClient;
  items: BudgetItem[];
  status: "draft" | "sent" | "approved" | "rejected" | "expired" | string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discount: number;
  total: number;
  currency: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

