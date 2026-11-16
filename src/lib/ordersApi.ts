import type { OrderDetails, OrderStatus, PaymentStatus, ReturnRequest } from "../types";

export interface CreateOrderResponse {
  order: OrderDetails;
  persisted: boolean;
  message?: string;
}

export interface FetchOrdersResponse {
  orders: OrderDetails[];
  configured: boolean;
}

export async function createOrderApi(
  order: OrderDetails,
  upiId?: string
): Promise<CreateOrderResponse> {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order, upiId }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Unable to save order to backend database.");
  }
  return data as CreateOrderResponse;
}

export async function fetchOrdersApi(): Promise<FetchOrdersResponse> {
  const res = await fetch("/api/orders");
  const data = await res.json().catch(() => ({ orders: [], configured: false }));
  if (!res.ok) {
    throw new Error(data.error || "Failed to load orders.");
  }
  return data as FetchOrdersResponse;
}

export async function updateOrderApi(
  orderId: string,
  patch: Partial<{
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    canCancel: boolean;
    canReturn: boolean;
    deliveryInstructions: string;
    courierPartner: string;
    trackingNumber: string;
    trackingTimeline: any[];
  }>
): Promise<void> {
  const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to update order.");
  }
}

export async function submitReturnRequestApi(
  orderId: string,
  returnRequest: ReturnRequest
): Promise<void> {
  const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}/returns`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ returnRequest }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to submit return request.");
  }
}

export async function approveReturnApi(orderId: string): Promise<void> {
  const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}/returns/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to approve return.");
  }
}
