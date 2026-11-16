-- ELYSIAN Supabase Schema for Project: sjnxaulevdjdwcxwcyho
-- Run this SQL in your Supabase Dashboard -> SQL Editor

create extension if not exists pgcrypto;

-- 1. Orders Table (stores checkout shipping, billing, payment, and tracking details)
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_id text unique not null,
  order_date text not null,
  customer_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  city text not null,
  state text not null,
  pincode text not null,
  billing_address text,
  payment_method text not null,
  payment_status text not null default 'Pending',
  upi_id text,
  subtotal numeric(10, 2) not null default 0,
  discount numeric(10, 2) not null default 0,
  coupon_code text,
  shipping numeric(10, 2) not null default 0,
  gst_amount numeric(10, 2) not null default 0,
  total numeric(10, 2) not null default 0,
  status text not null default 'Confirmed',
  courier_partner text not null default 'Delhivery Express Air',
  tracking_number text not null,
  estimated_delivery text,
  delivery_instructions text,
  tracking_timeline jsonb not null default '[]'::jsonb,
  can_cancel boolean not null default true,
  can_return boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Order Items Table (stores each fragrance line item in an order)
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id text not null references public.orders(order_id) on delete cascade,
  product_id text not null,
  product_name text not null,
  product_image text,
  selected_size text not null,
  unit_price numeric(10, 2) not null,
  quantity integer not null check (quantity > 0),
  line_total numeric(10, 2) not null,
  product_snapshot jsonb,
  created_at timestamptz not null default now()
);

-- 3. Return & Exchange Requests Table
create table if not exists public.return_requests (
  id uuid primary key default gen_random_uuid(),
  return_id text unique not null,
  order_id text not null references public.orders(order_id) on delete cascade,
  product_id text not null,
  product_name text not null,
  product_image text,
  reason text not null,
  comments text,
  request_type text not null,
  exchange_target_product text,
  status text not null default 'Requested',
  images jsonb not null default '[]'::jsonb,
  refund_amount numeric(10, 2) not null default 0,
  requested_at text not null,
  updated_at text not null,
  created_at timestamptz not null default now()
);

-- Indexes for fast queries
create index if not exists idx_orders_order_id on public.orders (order_id);
create index if not exists idx_orders_email on public.orders (email);
create index if not exists idx_orders_created_at on public.orders (created_at desc);
create index if not exists idx_order_items_order_id on public.order_items (order_id);
create index if not exists idx_return_requests_order_id on public.return_requests (order_id);

-- Auto-update updated_at timestamp trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_orders_updated_at on public.orders;
create trigger trg_orders_updated_at
before update on public.orders
for each row
execute function public.set_updated_at();

-- Enable Row Level Security
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.return_requests enable row level security;

-- Policies for backend/API access (Note: service_role key bypasses RLS automatically;
-- these policies also permit server-side access if using SUPABASE_ANON_KEY)
drop policy if exists "Allow API read orders" on public.orders;
create policy "Allow API read orders" on public.orders for select using (true);

drop policy if exists "Allow API insert orders" on public.orders;
create policy "Allow API insert orders" on public.orders for insert with check (true);

drop policy if exists "Allow API update orders" on public.orders;
create policy "Allow API update orders" on public.orders for update using (true);

drop policy if exists "Allow API read order_items" on public.order_items;
create policy "Allow API read order_items" on public.order_items for select using (true);

drop policy if exists "Allow API insert order_items" on public.order_items;
create policy "Allow API insert order_items" on public.order_items for insert with check (true);

drop policy if exists "Allow API read return_requests" on public.return_requests;
create policy "Allow API read return_requests" on public.return_requests for select using (true);

drop policy if exists "Allow API insert return_requests" on public.return_requests;
create policy "Allow API insert return_requests" on public.return_requests for insert with check (true);

drop policy if exists "Allow API update return_requests" on public.return_requests;
create policy "Allow API update return_requests" on public.return_requests for update using (true);
