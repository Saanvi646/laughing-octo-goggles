-- Security Policy Revisions for 'images' storage bucket

-- 1. Enable RLS on storage.objects (if not already enabled)
alter table storage.objects enable row level security;

-- 2. Drop potentially conflicting policies (to ensure clean slate for 'images' bucket)
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Authenticated Uploads" on storage.objects;
drop policy if exists "Authenticated Deletes" on storage.objects;
drop policy if exists "Give me access" on storage.objects;
drop policy if exists "Allow all uploads" on storage.objects;

-- 3. Define Refined Policies

-- A. PUBLIC READ ACCESS
-- Allow anyone (authenticated or anon) to VIEW files in the 'images' bucket.
create policy "Public Access"
on storage.objects for select
to public
using ( bucket_id = 'images' );

-- B. AUTHENTICATED UPLOAD ACCESS
-- Allow only authenticated users to UPLOAD files to the 'images' bucket.
create policy "Authenticated Uploads"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'images' );

-- C. AUTHENTICATED DELETE ACCESS
-- Allow only authenticated users to DELETE files in the 'images' bucket.
create policy "Authenticated Deletes"
on storage.objects for delete
to authenticated
using ( bucket_id = 'images' );
