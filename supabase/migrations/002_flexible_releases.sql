-- Make artist_id optional for albums, singles, concerts
-- Add artist_name field so releases can exist without a matching artist record

ALTER TABLE albums
  ALTER COLUMN artist_id DROP NOT NULL,
  ADD COLUMN artist_name text;

ALTER TABLE singles
  ALTER COLUMN artist_id DROP NOT NULL,
  ADD COLUMN artist_name text;

ALTER TABLE concerts
  ALTER COLUMN artist_id DROP NOT NULL,
  ADD COLUMN artist_name text;

-- Update existing records: fill artist_name from artists table
UPDATE albums SET artist_name = artists.name
  FROM artists WHERE albums.artist_id = artists.id AND albums.artist_name IS NULL;

UPDATE singles SET artist_name = artists.name
  FROM artists WHERE singles.artist_id = artists.id AND singles.artist_name IS NULL;

UPDATE concerts SET artist_name = artists.name
  FROM artists WHERE concerts.artist_id = artists.id AND concerts.artist_name IS NULL;

-- Update RLS: allow public read for all albums/singles (not just those linked to published artists)
DROP POLICY IF EXISTS "Public can read albums" ON albums;
CREATE POLICY "Public can read albums" ON albums
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read singles" ON singles;
CREATE POLICY "Public can read singles" ON singles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read future concerts" ON concerts;
CREATE POLICY "Public can read future concerts" ON concerts
  FOR SELECT USING (event_date >= current_date);
