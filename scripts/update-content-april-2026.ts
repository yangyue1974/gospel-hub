/**
 * Content update: April 9, 2026
 * Adds verified new gospel/worship releases (past 3 months) and future concerts.
 *
 * Run: npx tsx update-content-april-2026.ts
 */
import { addAlbum, addSingle, addConcert } from "./add-releases.ts";

async function updateContent() {
  // =========================================================================
  // ALBUMS & EPs (released Jan 10 – Apr 9, 2026)
  // =========================================================================
  console.log("=== Adding New Albums & EPs ===");

  await addAlbum("Chris Tomlin", {
    title: "Jesus Saves - EP",
    release_date: "2026-01-09",
    url_spotify: "https://open.spotify.com/album/0lKO6cHTJi27Quuz0yn6Io",
    url_apple_music: "https://music.apple.com/us/album/jesus-saves-ep/1838862906",
    is_new: true,
  });

  await addAlbum("Hillsong Worship", {
    title: "Great I AM",
    release_date: "2026-02-20",
    url_spotify: "https://open.spotify.com/album/7LaFsl3nY6e3xZblexnIo4",
    url_apple_music: "https://music.apple.com/us/album/great-i-am/1867166174",
    is_new: true,
  });

  await addAlbum("Maverick City Music", {
    title: "I Was Made To Glorify Your Name",
    release_date: "2026-02-26",
    url_spotify: "https://open.spotify.com/album/75ZLRCeZi1lDDvGgiaBmCB",
    url_apple_music: "https://music.apple.com/ca/album/i-was-made-to-glorify-your-name/1877198349",
    is_new: true,
  });

  await addAlbum("Tommee Profitt", {
    title: "The Resurrection of a King",
    release_date: "2026-03-27",
    url_spotify: "https://open.spotify.com/album/4wLFc5K7ODnAYiFD9bXOfK",
    url_apple_music: "https://music.apple.com/us/album/the-resurrection-of-a-king/1874142349",
    is_new: true,
  });

  await addAlbum("Meredith Andrews", {
    title: "Live From Liberty University",
    release_date: "2026-04-03",
    url_spotify: "https://open.spotify.com/artist/6qk2W9h3eE5UtPJlIatzsY",
    url_apple_music: "https://music.apple.com/us/artist/meredith-andrews/200726237",
    is_new: true,
  });

  // =========================================================================
  // SINGLES (released Jan 10 – Apr 9, 2026)
  // =========================================================================
  console.log("\n=== Adding New Singles ===");

  await addSingle("CeCe Winans", {
    title: "For Your Glory",
    release_date: "2026-01-09",
    url_spotify: "https://open.spotify.com/track/70VJujLz2uUo28xWNuc7ID",
    url_apple_music: "https://music.apple.com/us/album/for-your-glory-from-the-original-series-house-of/1859693404",
    is_new: true,
  });

  await addSingle("Maverick City Music", {
    title: "RUN 2 U",
    release_date: "2026-01-16",
    url_spotify: "https://open.spotify.com/track/5B3uTi8bmc6nNf9q76eVdq",
    url_apple_music: "https://music.apple.com/us/artist/maverick-city-music/1474458790",
    is_new: true,
  });

  await addSingle("Tauren Wells", {
    title: "Breathe On It",
    release_date: "2026-01-21",
    url_spotify: "https://open.spotify.com/track/3sd2kvWWh7T2M6N64LOGSV",
    url_apple_music: "https://music.apple.com/us/album/breathe-on-it-single/1862938798",
    is_new: true,
  });

  await addSingle("Elevation Worship", {
    title: "I Know A Name",
    release_date: "2026-01-23",
    url_spotify: "https://open.spotify.com/track/2HRuGsdbODLOS0Yr5vpUi6",
    url_apple_music: "https://music.apple.com/us/album/i-know-a-name-single/1793586884",
    is_new: true,
  });

  await addSingle("CeCe Winans", {
    title: "Worthy of It All (Worthy)",
    release_date: "2026-01-23",
    url_spotify: "https://open.spotify.com/track/2OtaCE4UY3qxy5l1rGqClP",
    is_new: true,
  });

  await addSingle("Brooke Ligertwood", {
    title: "Even Death On A Cross!",
    release_date: "2026-02-18",
    url_spotify: "https://open.spotify.com/artist/7iETGaxJ4crz3qaljDPCKC",
    url_apple_music: "https://music.apple.com/us/artist/brooke-ligertwood/312711773",
    is_new: true,
  });

  await addSingle("Tauren Wells", {
    title: "Bless Your Name",
    release_date: "2026-03-13",
    url_spotify: "https://open.spotify.com/artist/433402803",
    url_apple_music: "https://music.apple.com/us/artist/tauren-wells/433402803",
    is_new: true,
  });

  await addSingle("Brooke Ligertwood", {
    title: "The Water",
    release_date: "2026-03-20",
    url_spotify: "https://open.spotify.com/artist/7iETGaxJ4crz3qaljDPCKC",
    url_apple_music: "https://music.apple.com/us/artist/brooke-ligertwood/312711773",
    is_new: true,
  });

  await addSingle("Lauren Daigle", {
    title: "You Lead Me",
    release_date: "2026-03-27",
    url_spotify: "https://open.spotify.com/album/26XQGLcx9C4eJYP4rezkXY",
    url_apple_music: "https://music.apple.com/us/album/you-lead-me-from-the-original-series-house-of-david-single/1885589732",
    is_new: true,
  });

  await addSingle("Brandon Lake", {
    title: "The Jesus I Know Now",
    release_date: "2026-04-03",
    url_spotify: "https://open.spotify.com/track/5b1kZLzylm4PWvlX6DEklE",
    url_apple_music: "https://music.apple.com/us/album/the-jesus-i-know-now-single/1887978263",
    is_new: true,
  });

  // =========================================================================
  // CONCERTS (future dates only — after April 9, 2026)
  // =========================================================================
  console.log("\n=== Adding New Concerts ===");

  // --- Bethel Music Tour 2026 (new dates not in seed) ---
  const newBethelDates = [
    { venue: "Marquee Theatre", city: "Phoenix", date: "2026-04-27" },
    { venue: "Emo's", city: "Austin", date: "2026-04-30" },
    { venue: "House of Blues Orlando", city: "Orlando", date: "2026-10-10" },
    { venue: "The Fillmore", city: "Miami", date: "2026-10-11" },
    { venue: "The Fillmore Charlotte", city: "Charlotte", date: "2026-10-14" },
    { venue: "The NorVa", city: "Norfolk", date: "2026-10-16" },
    { venue: "Royale Boston", city: "Boston", date: "2026-10-19" },
    { venue: "Royal Oak Music Theatre", city: "Royal Oak", date: "2026-10-24" },
    { venue: "Brooklyn Bowl Nashville", city: "Nashville", date: "2026-10-25" },
  ];
  for (const d of newBethelDates) {
    await addConcert("Bethel Music", {
      title: "Bethel Music Tour 2026",
      venue: d.venue,
      city: d.city,
      country: "USA",
      event_date: d.date,
      url_tickets: "https://bethelmusic.com/tour",
    });
  }

  // --- CeCe Winans - More Than This Tour (new dates not in seed) ---
  const newCeceDates = [
    { venue: "Prairie Home Alliance Theater", city: "Peoria", date: "2026-04-22" },
    { venue: "Lincoln Berean Church", city: "Lincoln", date: "2026-04-24" },
    { venue: "The Naz Church", city: "Grove City", date: "2026-04-30" },
    { venue: "Abba's House", city: "Chattanooga", date: "2026-05-01" },
    { venue: "Toyota Oakdale Theatre", city: "Wallingford", date: "2026-05-07" },
    { venue: "Landmark Theatre", city: "Syracuse", date: "2026-05-08" },
  ];
  for (const d of newCeceDates) {
    await addConcert("CeCe Winans", {
      title: "More Than This Tour",
      venue: d.venue,
      city: d.city,
      country: "USA",
      event_date: d.date,
      url_tickets: "https://morethanthistour.com/",
    });
  }

  // --- Phil Wickham - Song of the Saints Tour (new dates not in seed) ---
  const newPhilDates = [
    { venue: "George Gervin GameAbove Center", city: "Ypsilanti", date: "2026-04-16" },
    { venue: "Lawrence Joel Veterans Memorial Coliseum", city: "Winston-Salem", date: "2026-04-25" },
    { venue: "UW-Milwaukee Panther Arena", city: "Milwaukee", date: "2026-05-14" },
    { venue: "Rupp Arena", city: "Lexington", date: "2026-05-16" },
  ];
  for (const d of newPhilDates) {
    await addConcert("Phil Wickham", {
      title: "Song of the Saints Tour",
      venue: d.venue,
      city: d.city,
      country: "USA",
      event_date: d.date,
      url_tickets: "https://www.ticketmaster.com/phil-wickham-tickets/artist/1482838",
    });
  }

  // --- MercyMe - Wonder + Awe Tour (new dates not in seed) ---
  const newMercymeDates = [
    { venue: "Isleta Amphitheater", city: "Albuquerque", date: "2026-04-09" },
    { venue: "Oceanside Pier Amphitheatre", city: "Oceanside", date: "2026-04-16" },
    { venue: "Stockton Arena", city: "Stockton", date: "2026-04-18" },
    { venue: "Abbotsford Centre", city: "Abbotsford", date: "2026-04-23", country: "Canada" },
    { venue: "Spokane Arena", city: "Spokane", date: "2026-04-25" },
  ];
  for (const d of newMercymeDates) {
    await addConcert("MercyMe", {
      title: "Wonder + Awe Tour",
      venue: d.venue,
      city: d.city,
      country: (d as any).country || "USA",
      event_date: d.date,
      url_tickets: "https://www.ticketmaster.com/mercyme-tickets/artist/873854",
    });
  }

  // --- Kirk Franklin - The Reunion Tour (future dates) ---
  const kirkDates = [
    { venue: "The Venue at Thunder Valley Casino Resort", city: "Lincoln", date: "2026-05-02" },
    { venue: "Hampton Coliseum", city: "Hampton", date: "2026-06-27" },
    { venue: "Crystal Palace Bowl", city: "London", date: "2026-08-02", country: "United Kingdom" },
    { venue: "Barclays Center", city: "New York", date: "2026-11-03" },
    { venue: "Wells Fargo Center", city: "Philadelphia", date: "2026-11-05" },
    { venue: "TD Garden", city: "Boston", date: "2026-11-06" },
    { venue: "State Farm Arena", city: "Atlanta", date: "2026-11-15" },
    { venue: "FLA Live Arena", city: "Sunrise", date: "2026-11-18" },
    { venue: "UNO Lakefront Arena", city: "New Orleans", date: "2026-11-20" },
  ];
  for (const d of kirkDates) {
    await addConcert("Kirk Franklin", {
      title: "The Reunion Tour 2026",
      venue: d.venue,
      city: d.city,
      country: (d as any).country || "USA",
      event_date: d.date,
      url_tickets: "https://www.ticketmaster.com/kirk-franklin-tickets/artist/768850",
    });
  }

  // --- Elevation Worship - Elevation Nights (new fall dates) ---
  const newElevationDates = [
    { venue: "Van Andel Arena", city: "Grand Rapids", date: "2026-10-22" },
    { venue: "Thompson-Boling Arena", city: "Knoxville", date: "2026-10-24" },
  ];
  for (const d of newElevationDates) {
    await addConcert("Elevation Worship", {
      title: "Elevation Nights 2026",
      venue: d.venue,
      city: d.city,
      country: "USA",
      event_date: d.date,
      url_tickets: "https://www.ticketmaster.com/elevation-worship-tickets/artist/2248014",
    });
  }

  console.log("\nContent update complete!");
}

updateContent();
