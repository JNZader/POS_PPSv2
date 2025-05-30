export interface IOrder {
  id: string;
  customer_id: string;
  driver_id?: string;
  status: "pending" | "in_progress" | "delivered" | "canceled";
  order_date: string;
  delivery_date?: string;
  bottles_delivered: number;
  bottles_returned: number;
  payment_status: "pending" | "paid" | "failed";
  payment_method?: "cash" | "mercado_pago";
  total_amount: number;
  created_at: string;
  deleted_at?: string;
}

export interface ICustomer {
  id: string;
  user_id: string;
  address: string;
  phone: string;
  bottle_balance: number;
  created_at: string;
  deleted_at?: string;
}

export interface IProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  type: "water_bottle" | "empty_bottle" | "accessory";
  created_at: string;
  deleted_at?: string;
}

export interface IInventory {
  id: string;
  product_id: string;
  quantity: number;
  warehouse_id?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IRoute {
  id: string;
  driver_id: string;
  name: string;
  stops: { latitude: number; longitude: number }[];
  created_at: string;
  deleted_at?: string;
}

export interface IDriverLocation {
  id: string;
  driver_id: string;
  latitude: number;
  longitude: number;
  updated_at: string;
  deleted_at?: string;
}

export interface IInvoice {
  id: string;
  order_id: string;
  invoice_number: string;
  amount: number;
  status: "pending" | "issued" | "paid" | "canceled";
  issue_date: string;
  created_at: string;
  deleted_at?: string;
}

export interface INotification {
  id: string;
  user_id: string;
  message: string;
  type: "order_update" | "payment" | "delivery" | "system";
  is_read: boolean;
  created_at: string;
  deleted_at?: string;
}

export interface IOrderAudit {
  id: string;
  order_id: string;
  old_status: string;
  new_status: string;
  changes: Record<string, any>;
  changed_at: string;
  deleted_at?: string;
}