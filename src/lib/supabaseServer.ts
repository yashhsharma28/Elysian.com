import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { OrderDetails, ReturnRequest, CartItem, OrderStatus, PaymentStatus, PaymentMethod } from "../types.ts";

export const SUPABASE_PROJECT_ID = "sjnxaulevdjdwcxwcyho";
export const DEFAULT_SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";
  return {
    projectId: SUPABASE_PROJECT_ID,
    url,
    hasKey: Boolean(key && !key.startsWith("MY_")),
    key,
  };
}

export function getSupabaseClient(): SupabaseClient | null {
  const { url, hasKey, key } = getSupabaseConfig();
  if (!hasKey) {
    return null;
  }
  if (!supabaseClient) {
    supabaseClient = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return supabaseClient;
}

interface OrderRow {
  order_id: string;
  order_date: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  billing_address?: string | null;
  payment_method: string;
  payment_status: string;
  upi_id?: string | null;
  subtotal: number | string;
  discount: number | string;
  coupon_code?: string | null;
  shipping: number | string;
  gst_amount: number | string;
  total: number | string;
  status: string;
  courier_partner: string;
  tracking_number: string;
  estimated_delivery?: string | null;
  delivery_instructions?: string | null;
  tracking_timeline?: any;
  can_cancel: boolean;
  can_return: boolean;
}

interface OrderItemRow {
  order_id: string;
  product_id: string;
  product_name: string;
  product_image?: string | null;
  selected_size: string;
  unit_price: number | string;
  quantity: number;
  line_total: number | string;
  product_snapshot?: any;
}

interface ReturnRequestRow {
  return_id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_image?: string | null;
  reason: string;
  comments?: string | null;
  request_type: string;
  exchange_target_product?: string | null;
  status: string;
  images?: any;
  refund_amount: number | string;
  requested_at: string;
  updated_at: string;
}

function mapRowsToOrderDetails(
  row: OrderRow,
  itemRows: OrderItemRow[],
  returnRows: ReturnRequestRow[]
): OrderDetails {
  const items: CartItem[] = itemRows.map((item) => {
    const snapshot = item.product_snapshot || {
      id: item.product_id,
      name: item.product_name,
      subTitle: "Extrait de Parfum",
      tagline: "Crafted for the Extraordinary",
      gender: "Unisex",
      collection: "Signature",
      defaultPrice: Number(item.unit_price),
      originalPrice: Number(item.unit_price),
      volumeOptions: [{ size: item.selected_size, price: Number(item.unit_price) }],
      rating: 4.9,
      reviewsCount: 0,
      image: item.product_image || "",
      gallery: [],
      topNotes: [],
      heartNotes: [],
      baseNotes: [],
      accords: [],
      description: "",
      story: "",
      longevity: "12 - 16 Hours",
      sillage: "Strong",
      intensity: "Extrait Strength",
      bestFor: "All Occasions",
    };

    return {
      product: snapshot,
      selectedSize: item.selected_size,
      price: Number(item.unit_price),
      quantity: Number(item.quantity),
    };
  });

  const latestReturn = returnRows[0];
  const mappedReturn: ReturnRequest | undefined = latestReturn
    ? {
        id: latestReturn.return_id,
        orderId: latestReturn.order_id,
        productId: latestReturn.product_id,
        productName: latestReturn.product_name,
        productImage: latestReturn.product_image || "",
        reason: latestReturn.reason as ReturnRequest["reason"],
        comments: latestReturn.comments || "",
        requestType: latestReturn.request_type as ReturnRequest["requestType"],
        exchangeTargetProduct: latestReturn.exchange_target_product || undefined,
        status: latestReturn.status as ReturnRequest["status"],
        images: Array.isArray(latestReturn.images) ? latestReturn.images : [],
        refundAmount: Number(latestReturn.refund_amount),
        requestedAt: latestReturn.requested_at,
        updatedAt: latestReturn.updated_at,
      }
    : undefined;

  return {
    orderId: row.order_id,
    orderDate: row.order_date,
    customerName: row.customer_name,
    email: row.email,
    phone: row.phone,
    address: row.address,
    city: row.city,
    state: row.state,
    pincode: row.pincode,
    billingAddress: row.billing_address || undefined,
    paymentMethod: row.payment_method as PaymentMethod,
    paymentStatus: row.payment_status as PaymentStatus,
    items,
    subtotal: Number(row.subtotal),
    discount: Number(row.discount),
    couponCode: row.coupon_code || undefined,
    shipping: Number(row.shipping),
    gstAmount: Number(row.gst_amount),
    total: Number(row.total),
    status: row.status as OrderStatus,
    courierPartner: row.courier_partner,
    trackingNumber: row.tracking_number,
    estimatedDelivery: row.estimated_delivery || "3 - 5 Business Days",
    deliveryInstructions: row.delivery_instructions || undefined,
    trackingTimeline: Array.isArray(row.tracking_timeline) ? row.tracking_timeline : [],
    returnRequest: mappedReturn,
    canCancel: Boolean(row.can_cancel),
    canReturn: Boolean(row.can_return),
  };
}

export async function createOrderInSupabase(
  order: OrderDetails,
  upiId?: string
): Promise<OrderDetails> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error(
      "Supabase API key is not configured. Add SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) to your Secrets."
    );
  }

  const orderInsert: OrderRow = {
    order_id: order.orderId,
    order_date: order.orderDate,
    customer_name: order.customerName,
    email: order.email,
    phone: order.phone,
    address: order.address,
    city: order.city,
    state: order.state,
    pincode: order.pincode,
    billing_address: order.billingAddress || null,
    payment_method: order.paymentMethod,
    payment_status: order.paymentStatus,
    upi_id: upiId || null,
    subtotal: order.subtotal,
    discount: order.discount,
    coupon_code: order.couponCode || null,
    shipping: order.shipping,
    gst_amount: order.gstAmount,
    total: order.total,
    status: order.status,
    courier_partner: order.courierPartner,
    tracking_number: order.trackingNumber,
    estimated_delivery: order.estimatedDelivery,
    delivery_instructions: order.deliveryInstructions || null,
    tracking_timeline: order.trackingTimeline || [],
    can_cancel: order.canCancel,
    can_return: order.canReturn,
  };

  const { error: orderError } = await client.from("orders").insert(orderInsert);
  if (orderError) {
    throw new Error(`Failed to save order in Supabase: ${orderError.message}`);
  }

  if (order.items && order.items.length > 0) {
    const itemsToInsert: OrderItemRow[] = order.items.map((item) => ({
      order_id: order.orderId,
      product_id: item.product.id,
      product_name: item.product.name,
      product_image: item.product.image || null,
      selected_size: item.selectedSize,
      unit_price: item.price,
      quantity: item.quantity,
      line_total: item.price * item.quantity,
      product_snapshot: item.product,
    }));

    const { error: itemsError } = await client.from("order_items").insert(itemsToInsert);
    if (itemsError) {
      // Roll back order row if items insert fails so partial orders aren't orphaned
      await client.from("orders").delete().eq("order_id", order.orderId);
      throw new Error(`Failed to save order items in Supabase: ${itemsError.message}`);
    }
  }

  return order;
}

export async function listOrdersFromSupabase(): Promise<OrderDetails[]> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error("Supabase API key is not configured.");
  }

  const { data: ordersData, error: ordersError } = await client
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (ordersError) {
    throw new Error(`Failed to fetch orders from Supabase: ${ordersError.message}`);
  }

  const orderRows = (ordersData || []) as OrderRow[];
  if (orderRows.length === 0) {
    return [];
  }

  const orderIds = orderRows.map((o) => o.order_id);

  const [{ data: itemsData, error: itemsError }, { data: returnsData, error: returnsError }] =
    await Promise.all([
      client.from("order_items").select("*").in("order_id", orderIds),
      client
        .from("return_requests")
        .select("*")
        .in("order_id", orderIds)
        .order("created_at", { ascending: false }),
    ]);

  if (itemsError) {
    throw new Error(`Failed to fetch order items from Supabase: ${itemsError.message}`);
  }
  if (returnsError) {
    throw new Error(`Failed to fetch return requests from Supabase: ${returnsError.message}`);
  }

  const itemsByOrder = new Map<string, OrderItemRow[]>();
  for (const item of (itemsData || []) as OrderItemRow[]) {
    const arr = itemsByOrder.get(item.order_id) || [];
    arr.push(item);
    itemsByOrder.set(item.order_id, arr);
  }

  const returnsByOrder = new Map<string, ReturnRequestRow[]>();
  for (const ret of (returnsData || []) as ReturnRequestRow[]) {
    const arr = returnsByOrder.get(ret.order_id) || [];
    arr.push(ret);
    returnsByOrder.set(ret.order_id, arr);
  }

  return orderRows.map((row) =>
    mapRowsToOrderDetails(
      row,
      itemsByOrder.get(row.order_id) || [],
      returnsByOrder.get(row.order_id) || []
    )
  );
}

export async function getOrderByIdFromSupabase(orderId: string): Promise<OrderDetails | null> {
  const client = getSupabaseClient();
  if (!client) {
    return null;
  }

  const normalizedId = orderId.trim().toUpperCase();
  const { data: orderData, error: orderError } = await client
    .from("orders")
    .select("*")
    .eq("order_id", normalizedId)
    .maybeSingle();

  if (orderError || !orderData) {
    return null;
  }

  const [{ data: itemsData }, { data: returnsData }] = await Promise.all([
    client.from("order_items").select("*").eq("order_id", normalizedId),
    client
      .from("return_requests")
      .select("*")
      .eq("order_id", normalizedId)
      .order("created_at", { ascending: false }),
  ]);

  return mapRowsToOrderDetails(
    orderData as OrderRow,
    (itemsData || []) as OrderItemRow[],
    (returnsData || []) as ReturnRequestRow[]
  );
}

export async function updateOrderInSupabase(
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
  const client = getSupabaseClient();
  if (!client) {
    throw new Error("Supabase API key is not configured.");
  }

  const updatePayload: Record<string, any> = {};
  if (patch.status !== undefined) updatePayload.status = patch.status;
  if (patch.paymentStatus !== undefined) updatePayload.payment_status = patch.paymentStatus;
  if (patch.canCancel !== undefined) updatePayload.can_cancel = patch.canCancel;
  if (patch.canReturn !== undefined) updatePayload.can_return = patch.canReturn;
  if (patch.deliveryInstructions !== undefined) updatePayload.delivery_instructions = patch.deliveryInstructions;
  if (patch.courierPartner !== undefined) updatePayload.courier_partner = patch.courierPartner;
  if (patch.trackingNumber !== undefined) updatePayload.tracking_number = patch.trackingNumber;
  if (patch.trackingTimeline !== undefined) updatePayload.tracking_timeline = patch.trackingTimeline;

  if (Object.keys(updatePayload).length === 0) return;

  const { error } = await client
    .from("orders")
    .update(updatePayload)
    .eq("order_id", orderId);

  if (error) {
    throw new Error(`Failed to update order in Supabase: ${error.message}`);
  }
}

export async function createReturnRequestInSupabase(returnReq: ReturnRequest): Promise<void> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error("Supabase API key is not configured.");
  }

  const insertPayload: ReturnRequestRow = {
    return_id: returnReq.id,
    order_id: returnReq.orderId,
    product_id: returnReq.productId,
    product_name: returnReq.productName,
    product_image: returnReq.productImage || null,
    reason: returnReq.reason,
    comments: returnReq.comments || null,
    request_type: returnReq.requestType,
    exchange_target_product: returnReq.exchangeTargetProduct || null,
    status: returnReq.status,
    images: returnReq.images || [],
    refund_amount: returnReq.refundAmount,
    requested_at: returnReq.requestedAt,
    updated_at: returnReq.updatedAt,
  };

  const { error: returnError } = await client.from("return_requests").insert(insertPayload);
  if (returnError) {
    throw new Error(`Failed to save return request in Supabase: ${returnError.message}`);
  }

  const { error: orderError } = await client
    .from("orders")
    .update({ status: "Returned", can_return: false })
    .eq("order_id", returnReq.orderId);

  if (orderError) {
    throw new Error(`Failed to update order status for return: ${orderError.message}`);
  }
}

export async function approveReturnInSupabase(orderId: string): Promise<void> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error("Supabase API key is not configured.");
  }

  const today = new Date().toISOString().split("T")[0];

  const { error: retError } = await client
    .from("return_requests")
    .update({ status: "Completed", updated_at: today })
    .eq("order_id", orderId);

  if (retError) {
    throw new Error(`Failed to update return request in Supabase: ${retError.message}`);
  }

  const { error: orderError } = await client
    .from("orders")
    .update({ status: "Refunded", payment_status: "Refunded", can_return: false })
    .eq("order_id", orderId);

  if (orderError) {
    throw new Error(`Failed to update order refund status in Supabase: ${orderError.message}`);
  }
}
