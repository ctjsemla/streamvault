export type DealStatus =
  | "pending"
  | "in_progress"
  | "live"
  | "completed"
  | "invoiced";

export type Deal = {
  id: string;
  name: string;
  brand: string;
  deadline: string;
  status: DealStatus;
};
