-- Allow authenticated users to upload to storage buckets
-- and allow public read access

-- For album-covers bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('album-covers', 'album-covers', true) ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Public read album covers" ON storage.objects FOR SELECT USING (bucket_id = 'album-covers');
CREATE POLICY "Auth upload album covers" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'album-covers' AND auth.role() = 'authenticated');
CREATE POLICY "Auth update album covers" ON storage.objects FOR UPDATE USING (bucket_id = 'album-covers' AND auth.role() = 'authenticated');

-- For artist-photos bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('artist-photos', 'artist-photos', true) ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Public read artist photos" ON storage.objects FOR SELECT USING (bucket_id = 'artist-photos');
CREATE POLICY "Auth upload artist photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'artist-photos' AND auth.role() = 'authenticated');
CREATE POLICY "Auth update artist photos" ON storage.objects FOR UPDATE USING (bucket_id = 'artist-photos' AND auth.role() = 'authenticated');
