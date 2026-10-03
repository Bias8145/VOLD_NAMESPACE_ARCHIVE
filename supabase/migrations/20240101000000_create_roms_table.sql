/*
# Create ROMs Table
This migration creates the roms table for storing custom Android ROM information.

## Query Description:
This operation creates a new table to store custom ROM data including name, description, download links, device support, and version information. This is a safe operation that adds new functionality.

## Metadata:
- Schema-Category: Structural
- Impact-Level: Medium
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Table: roms
- Columns: id, name, description, android_version, download_url, device_support, developer, github_url, features, status, size_mb, changelog, created_at, updated_at

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes
- Auth Requirements: Public read, authenticated write

## Performance Impact:
- Indexes: None added
- Triggers: None
- Estimated Impact: Minimal - standard table creation
*/

CREATE TABLE IF NOT EXISTS roms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  android_version TEXT NOT NULL,
  download_url TEXT NOT NULL,
  device_support TEXT[] DEFAULT '{}',
  developer TEXT NOT NULL,
  github_url TEXT,
  features TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'stable' CHECK (status IN ('stable', 'beta', 'alpha')),
  size_mb INTEGER,
  changelog TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE roms ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read access on roms" ON roms FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert roms" ON roms FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update roms" ON roms FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete roms" ON roms FOR DELETE USING (auth.role() = 'authenticated');

-- Create index for faster searches
CREATE INDEX idx_roms_name ON roms(name);
CREATE INDEX idx_roms_status ON roms(status);
CREATE INDEX idx_roms_android_version ON roms(android_version);
