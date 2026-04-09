import { addAlbum, addSingle, addConcert } from "./add-releases.ts";

async function seedContent() {
  console.log("=== Adding Albums ===");

  await addAlbum("Bethel Music", { title: "Moments: Wait (Live)", release_date: "2024-03-15", url_spotify: "https://open.spotify.com/album/7rNKbK8wratEtlqtVeGvVL", url_apple_music: "https://music.apple.com/us/album/moments-wait-live/1729838730" });
  await addAlbum("Bethel Music", { title: "We Must Respond (Live)", release_date: "2025-01-10", url_spotify: "https://open.spotify.com/album/4SkbfeWMHz58YzZQ5vThTH", url_apple_music: "https://music.apple.com/us/album/we-must-respond-live/1770688604", is_new: true });
  await addAlbum("Elevation Worship", { title: "When Wind Meets Fire", release_date: "2024-07-12", url_spotify: "https://open.spotify.com/album/2uwzangKgtBdy6Q1rPYqC0", url_apple_music: "https://music.apple.com/us/album/when-wind-meets-fire/1750583027" });
  await addAlbum("Elevation Worship", { title: "So Be It (Live)", release_date: "2026-02-20", url_spotify: "https://open.spotify.com/album/6OF8Psf3BjjHnBIfUpOYHp", url_apple_music: "https://music.apple.com/us/album/so-be-it-live/1870678481", is_new: true });
  await addAlbum("Maverick City Music", { title: "Love Made A Way", release_date: "2025-01-01", url_spotify: "https://open.spotify.com/album/3JiUEjyUFgfp4FR21Z9f7q", url_apple_music: "https://music.apple.com/us/album/love-made-a-way/1854571657", is_new: true });
  await addAlbum("Chris Tomlin", { title: "The King Is Still The King", release_date: "2025-09-26", url_spotify: "https://open.spotify.com/album/2ieE6Mqwu3aMWflIdIbNkS", url_apple_music: "https://music.apple.com/us/album/the-king-is-still-the-king/1822580562", is_new: true });
  await addAlbum("Lauren Daigle", { title: "Sessions", release_date: "2024-08-16", url_spotify: "https://open.spotify.com/album/4Y4ntagypPMlqa71YLaDsA", url_apple_music: "https://music.apple.com/us/album/sessions/1760605342" });
  await addAlbum("Phil Wickham", { title: "Song of the Saints", release_date: "2025-09-12", url_spotify: "https://open.spotify.com/album/2EENECQqPyRT1fsKVn5fbK", url_apple_music: "https://music.apple.com/us/album/song-of-the-saints/1825427371", is_new: true });
  await addAlbum("Phil Wickham", { title: "Song of the Saints (Deluxe)", release_date: "2026-03-13", url_spotify: "https://open.spotify.com/album/5shcL77IqPmZPBRbfl0cHT", url_apple_music: "https://music.apple.com/us/album/song-of-the-saints-deluxe/1876056894", is_new: true });
  await addAlbum("Brandon Lake", { title: "King of Hearts", release_date: "2025-06-13", url_spotify: "https://open.spotify.com/album/39sqUPX1iGhkoubpTi9ORw", url_apple_music: "https://music.apple.com/us/album/king-of-hearts/1804395857", is_new: true });
  await addAlbum("Kari Jobe", { title: "Live From Europe", release_date: "2024-08-02", url_spotify: "https://open.spotify.com/album/5htXe6Yr7XvTglqWJs2JBB", url_apple_music: "https://music.apple.com/us/album/live-from-europe/1764157377" });
  await addAlbum("CeCe Winans", { title: "More Than This", release_date: "2024-04-26", url_spotify: "https://open.spotify.com/album/0zvZ25UkgLXQDZLQDxpwPw", url_apple_music: "https://music.apple.com/us/album/more-than-this/1733885318" });
  await addAlbum("Casting Crowns", { title: "A 20 Year Celebration Live at The Ryman", release_date: "2024-08-09", url_spotify: "https://open.spotify.com/album/2FWQYj9oGl7f857rQEt4Wc", url_apple_music: "https://music.apple.com/us/album/casting-crowns-a-20-year-celebration-live-at-the-ryman/1752528437" });
  await addAlbum("MercyMe", { title: "Wonder & Awe", release_date: "2025-08-08", url_spotify: "https://open.spotify.com/album/1QH5MBBdnm2CYYPVPRSjoS", url_apple_music: "https://music.apple.com/us/album/wonder-awe/1819596892", is_new: true });
  await addAlbum("Cory Asbury", { title: "Cover To Cover", release_date: "2025-01-17", url_spotify: "https://open.spotify.com/album/28faqIm7qR9x4HHYEBrP5p", url_apple_music: "https://music.apple.com/us/album/cover-to-cover/1792084465", is_new: true });
  await addAlbum("Pat Barrett", { title: "I've Got A Fire", release_date: "2025-10-03", url_spotify: "https://open.spotify.com/album/1TQQSpRadfiF6FUBEv9HOe", url_apple_music: "https://music.apple.com/us/album/ive-got-a-fire/1834723422", is_new: true });
  await addAlbum("Jesus Culture", { title: "Send The Fire: Live From London", release_date: "2025-10-10", url_spotify: "https://open.spotify.com/album/6w4bFrC2X53TxpflpRI2SE", url_apple_music: "https://music.apple.com/us/album/send-the-fire-live-from-london/1834975655", is_new: true });
  await addAlbum("Naomi Raine", { title: "Jesus Over Everything (Live In Las Vegas)", release_date: "2025-08-29", url_spotify: "https://open.spotify.com/album/0ipgHKNQF4HtAqVeIxEDcp", url_apple_music: "https://music.apple.com/us/album/jesus-over-everything-live-in-las-vegas/1834510124", is_new: true });
  await addAlbum("Ellie Holcomb", { title: "All Of My Days", release_date: "2024-04-12", url_spotify: "https://open.spotify.com/album/1w18hePhR6H40r1bvhegck", url_apple_music: "https://music.apple.com/us/album/all-of-my-days/1732105184" });
  await addAlbum("Ellie Holcomb", { title: "Far Country", release_date: "2025-09-12", url_spotify: "https://open.spotify.com/album/27jThL2BVBZJHQSAubMwms", url_apple_music: "https://music.apple.com/us/album/far-country/1833088326", is_new: true });
  await addAlbum("Josh Baldwin", { title: "Made For More (Live)", release_date: "2024-03-01", url_spotify: "https://open.spotify.com/album/0TchDjWSD1zqYTJcYbcBZA", url_apple_music: "https://music.apple.com/us/album/made-for-more-live/1748014409" });

  console.log("\n=== Adding Concerts ===");

  // Phil Wickham - Song of the Saints Tour
  const philDates = [
    { venue: "Ford Center", city: "Evansville", date: "2026-04-15" },
    { venue: "Schottenstein Center", city: "Columbus", date: "2026-04-17" },
    { venue: "Chesapeake Employers Insurance Arena", city: "Baltimore", date: "2026-04-18" },
    { venue: "Hertz Arena", city: "Estero", date: "2026-04-23" },
    { venue: "VyStar Veterans Memorial Arena", city: "Jacksonville", date: "2026-04-24" },
    { venue: "Bojangles' Coliseum", city: "Charlotte", date: "2026-04-26" },
    { venue: "Target Center", city: "Minneapolis", date: "2026-05-13" },
    { venue: "Van Andel Arena", city: "Grand Rapids", date: "2026-05-15" },
    { venue: "Broadmoor World Arena", city: "Colorado Springs", date: "2026-05-21" },
    { venue: "Chaifetz Arena", city: "St. Louis", date: "2026-05-23" },
    { venue: "Beacon Theatre", city: "New York", date: "2026-08-13" },
    { venue: "Honda Center", city: "Anaheim", date: "2026-10-15" },
    { venue: "Desert Diamond Arena", city: "Glendale", date: "2026-10-17" },
  ];
  for (const d of philDates) {
    await addConcert("Phil Wickham", { title: "Song of the Saints Tour", venue: d.venue, city: d.city, country: "USA", event_date: d.date, url_tickets: "https://www.ticketmaster.com/phil-wickham-tickets/artist/1482838" });
  }

  // Brandon Lake - King of Hearts Tour
  const brandonDates = [
    { venue: "Paycom Center", city: "Oklahoma City", date: "2026-04-10" },
    { venue: "CHI Health Center", city: "Omaha", date: "2026-04-11" },
    { venue: "Enterprise Center", city: "St. Louis", date: "2026-04-12" },
    { venue: "Simmons Bank Arena", city: "North Little Rock", date: "2026-04-16" },
    { venue: "Pensacola Bay Center", city: "Pensacola", date: "2026-04-18" },
    { venue: "Spectrum Center", city: "Charlotte", date: "2026-04-19" },
    { venue: "KFC Yum! Center", city: "Louisville", date: "2026-04-24" },
  ];
  for (const d of brandonDates) {
    await addConcert("Brandon Lake", { title: "King of Hearts Tour", venue: d.venue, city: d.city, country: "USA", event_date: d.date, url_tickets: "https://brandonlake.co/tour" });
  }

  // MercyMe - Wonder + Awe Tour
  const mercymeDates = [
    { venue: "Desert Diamond Arena", city: "Glendale", date: "2026-04-10" },
    { venue: "Honda Center", city: "Anaheim", date: "2026-04-11" },
    { venue: "The Orleans Arena", city: "Las Vegas", date: "2026-04-12" },
    { venue: "Save Mart Center", city: "Fresno", date: "2026-04-17" },
    { venue: "Toyota Arena", city: "Ontario", date: "2026-04-19" },
    { venue: "Angel of the Winds Arena", city: "Everett", date: "2026-04-24" },
    { venue: "Red Rocks Amphitheatre", city: "Morrison", date: "2026-08-05" },
  ];
  for (const d of mercymeDates) {
    await addConcert("MercyMe", { title: "Wonder + Awe Tour", venue: d.venue, city: d.city, country: "USA", event_date: d.date, url_tickets: "https://www.ticketmaster.com/mercyme-tickets/artist/873854" });
  }

  // Lauren Daigle
  const laurenDates = [
    { venue: "Koka Booth Amphitheatre", city: "Cary", date: "2026-06-10" },
    { venue: "Wolf Trap", city: "Vienna", date: "2026-06-11" },
    { venue: "Mohegan Sun Arena", city: "Uncasville", date: "2026-06-18" },
    { venue: "Pacific Amphitheatre", city: "Costa Mesa", date: "2026-07-23" },
  ];
  for (const d of laurenDates) {
    await addConcert("Lauren Daigle", { title: "Lauren Daigle 2026 Tour", venue: d.venue, city: d.city, country: "USA", event_date: d.date, url_tickets: "https://www.ticketmaster.com/lauren-daigle-tickets/artist/2117442" });
  }

  // CeCe Winans - More Than This Tour
  const ceceDates = [
    { venue: "Embassy Theatre", city: "Fort Wayne", date: "2026-04-15" },
    { venue: "Louisville Palace Theatre", city: "Louisville", date: "2026-04-16" },
    { venue: "Orpheum Theatre", city: "Memphis", date: "2026-04-17" },
    { venue: "Stephens Auditorium", city: "Ames", date: "2026-04-23" },
    { venue: "The Riverside Theater", city: "Milwaukee", date: "2026-04-29" },
    { venue: "Palace Theatre", city: "Albany", date: "2026-05-06" },
    { venue: "The Chicago Theatre", city: "Chicago", date: "2026-08-16" },
    { venue: "Rotterdam Ahoy", city: "Rotterdam", date: "2026-08-26" },
  ];
  for (const d of ceceDates) {
    await addConcert("CeCe Winans", { title: "More Than This Tour", venue: d.venue, city: d.city, country: d.city === "Rotterdam" ? "Netherlands" : "USA", event_date: d.date, url_tickets: "https://morethanthistour.com/" });
  }

  // Bethel Music Tour
  const bethelDates = [
    { venue: "The Showbox", city: "Seattle", date: "2026-04-19" },
    { venue: "The Magnolia", city: "San Diego", date: "2026-04-22" },
    { venue: "The Wiltern", city: "Los Angeles", date: "2026-04-26" },
    { venue: "House of Blues", city: "Dallas", date: "2026-04-29" },
    { venue: "Buckhead Theatre", city: "Atlanta", date: "2026-10-09" },
    { venue: "Irving Plaza", city: "New York", date: "2026-10-17" },
  ];
  for (const d of bethelDates) {
    await addConcert("Bethel Music", { title: "Bethel Music Tour 2026", venue: d.venue, city: d.city, country: "USA", event_date: d.date, url_tickets: "https://bethelmusic.com/tour" });
  }

  // Elevation Worship
  await addConcert("Elevation Worship", { title: "Elevation Nights 2026", venue: "Greek Theatre", city: "Los Angeles", country: "USA", event_date: "2026-07-15", url_tickets: "https://www.ticketmaster.com/elevation-worship-tickets/artist/2248014" });
  await addConcert("Elevation Worship", { title: "Elevation Nights 2026", venue: "Xcel Energy Center", city: "Saint Paul", country: "USA", event_date: "2026-10-21", url_tickets: "https://www.ticketmaster.com/elevation-worship-tickets/artist/2248014" });
  await addConcert("Elevation Worship", { title: "Elevation Nights 2026", venue: "Kia Center", city: "Orlando", country: "USA", event_date: "2026-10-30", url_tickets: "https://www.ticketmaster.com/elevation-worship-tickets/artist/2248014" });

  console.log("\nDone!");
}

seedContent();
