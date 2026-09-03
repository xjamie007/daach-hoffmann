-- Enquiries. Schema from section 11 of the brief.
--
-- Only what is genuinely dynamic lives in the database. Services, projects,
-- municipalities and all translations are typed files in the repository — see
-- section 10. This table holds enquiries and nothing else.

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  name text not null,
  email text not null,
  phone text,

  locale text not null check (locale in ('de', 'fr', 'en')),

  service text,
  roof_type text,
  urgency text check (urgency in ('emergency', 'soon', 'planning')),

  postal_code text,
  locality text,
  message text not null,

  photo_paths text[] default '{}',

  -- Section 14.2: consent has to be evidenced, not assumed.
  consent_at timestamptz not null,

  source_page text,

  status text not null default 'new'
    check (status in ('new', 'contacted', 'quoted', 'won', 'lost')),

  -- Section 14.3: hashed, never in clear text. Used only for rate limiting
  -- and abuse investigation, and it cannot be reversed to an address.
  ip_hash text
);

-- Emergencies first, then newest. This is the order the business reads them in.
create index if not exists inquiries_triage_idx
  on inquiries (
    (case urgency when 'emergency' then 0 when 'soon' then 1 else 2 end),
    created_at desc
  );

create index if not exists inquiries_status_idx on inquiries (status, created_at desc);

alter table inquiries enable row level security;

-- No policies are defined, and that is deliberate.
--
-- With RLS enabled and no policy, the anon and authenticated roles can neither
-- read nor write. Inserts happen exclusively through the service role, from a
-- server action or an edge function that has already validated the payload.
-- The service role bypasses RLS by design.
--
-- The consequence worth stating plainly: the service-role key must never reach
-- the browser. It belongs in SUPABASE_SERVICE_ROLE_KEY, without the
-- NEXT_PUBLIC_ prefix, and any variable carrying that prefix is compiled into
-- the client bundle.

-- Private bucket for enquiry photographs. Signed URLs with a short lifetime are
-- generated for the notification mail; the objects are never publicly readable.
insert into storage.buckets (id, name, public)
values ('inquiry-photos', 'inquiry-photos', false)
on conflict (id) do nothing;
