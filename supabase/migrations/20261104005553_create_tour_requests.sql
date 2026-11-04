/*
# Create tour_requests table

1. New Tables
- `tour_requests`: one row per sign-up request sent from the landing page form.
  - `id` (uuid, primary key)
  - `name` (text, required)
  - `phone` (text, required)
  - `email` (text, optional)
  - `plan` (text, required; one of Лайт, Стандарт, Комфорт)
  - `comment` (text, optional)
  - `created_at` (timestamp)

2. Security
- Row level security is enabled on `tour_requests`.
- Visitors (anon role) can only INSERT new requests. They cannot read, change, or delete anyone's requests.
- No SELECT policy is granted, so submitted contact details stay private. The owner reads them in the Supabase dashboard.
*/

CREATE TABLE IF NOT EXISTS tour_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 5 AND 40),
  email text CHECK (email IS NULL OR char_length(email) <= 320),
  plan text NOT NULL CHECK (plan IN ('Лайт', 'Стандарт', 'Комфорт')),
  comment text CHECK (comment IS NULL OR char_length(comment) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE tour_requests ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON tour_requests TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_tour_requests" ON tour_requests;
CREATE POLICY "anon_insert_tour_requests" ON tour_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
