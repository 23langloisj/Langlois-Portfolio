// ---------------------------------------------------------------------------
// TRAVEL DATA
// ---------------------------------------------------------------------------
// Edit this file to update the Travel page. Two things live here:
//   1. `stateStatus` — the color of every state on the US map.
//   2. `travelSections` — the photo blurbs below the map.
// ---------------------------------------------------------------------------

// 'visited'  -> spent real time there   (bright green)
// 'driven'   -> just passed through      (deep green)
// 'missing'  -> haven't been yet         (muted surface)
export type StateStatus = 'visited' | 'driven' | 'missing'

// Every state + DC, keyed by its lowercase 2-letter postal code.
// Flip a value to 'visited' or 'driven' as you tick states off. That's it.
export const stateStatus: Record<string, StateStatus> = {
  ak: 'missing',
  al: 'missing',
  ar: 'missing',
  az: 'visited',
  ca: 'missing',
  co: 'visited',
  ct: 'driven',
  dc: 'visited',
  de: 'missing',
  fl: 'visited',
  ga: 'visited',
  hi: 'missing',
  ia: 'driven',
  id: 'missing',
  il: 'visited',
  in: 'driven',
  ks: 'driven',
  ky: 'missing',
  la: 'missing',
  ma: 'visited',
  md: 'visited',
  me: 'visited',
  mi: 'driven',
  mn: 'driven',
  mo: 'driven',
  ms: 'missing',
  mt: 'driven',
  nc: 'visited',
  nd: 'missing',
  ne: 'missing',
  nh: 'visited',
  nj: 'visited',
  nm: 'visited',
  nv: 'visited',
  ny: 'visited',
  oh: 'visited',
  ok: 'missing',
  or: 'missing',
  pa: 'visited',
  ri: 'visited',
  sc: 'visited',
  sd: 'visited',
  tn: 'visited',
  tx: 'missing',
  ut: 'visited',
  va: 'visited',
  vt: 'visited',
  wa: 'missing',
  wi: 'missing',
  wv: 'visited',
  wy: 'visited',
}

// ---------------------------------------------------------------------------
// PHOTO SECTIONS
// ---------------------------------------------------------------------------
// Each section is a place/trip with a short blurb and a set of photos.
//
// To add a real photo: drop the file in src/assets/travel/, import it at the
// top of this file, and set `image` on the photo. Leave `image` undefined to
// render a styled "coming soon" placeholder tile.
//
//   import acadia1 from '../assets/travel/acadia1.jpg'
//   ...
//   photos: [{ caption: 'Cadillac Mountain sunrise', image: acadia1 }]
// ---------------------------------------------------------------------------

export interface TravelPhoto {
  caption: string
  image?: string
}

export interface TravelSection {
  title: string
  location: string
  blurb: string
  photos: TravelPhoto[]
}

export const travelSections: TravelSection[] = [
  {
    title: 'Acadia National Park',
    location: 'Maine',
    blurb:
      'Sunrise on Cadillac Mountain is the first place the sun hits the U.S. — worth every 4am alarm. Rocky coastline, pine, and cold Atlantic air.',
    photos: [
      { caption: 'Cadillac Mountain sunrise' },
      { caption: 'The rocky shoreline' },
      { caption: 'Jordan Pond' },
    ],
  },
  {
    title: 'The Blue Ridge',
    location: 'North Carolina',
    blurb:
      'Endless ridgelines fading into haze. The kind of drive where you pull over every ten minutes because the next overlook is somehow better.',
    photos: [
      { caption: 'Overlook at golden hour' },
      { caption: 'Winding parkway' },
    ],
  },
  {
    title: 'Pacific Coast',
    location: 'California',
    blurb:
      "Cliffs dropping straight into the ocean and fog rolling over the hills. A reminder of how much beautiful ground there still is to cover.",
    photos: [
      { caption: 'Big Sur cliffs' },
      { caption: 'Sunset over the Pacific' },
      { caption: 'Coastal fog' },
    ],
  },
]
