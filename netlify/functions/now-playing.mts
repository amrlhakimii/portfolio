import type { Config } from '@netlify/functions'

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing Spotify credentials in environment')
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  })

  if (!res.ok) {
    throw new Error(`Failed to refresh Spotify token: ${res.status}`)
  }

  const data = await res.json()
  return data.access_token as string
}

function trackPayload(track: any, isPlaying: boolean) {
  return {
    isPlaying,
    title: track.name,
    artist: track.artists.map((a: any) => a.name).join(', '),
    album: track.album?.name ?? null,
    albumArt: track.album?.images?.[0]?.url ?? null,
    songUrl: track.external_urls?.spotify ?? null,
  }
}

export default async () => {
  try {
    const accessToken = await getAccessToken()
    const authHeader = { Authorization: `Bearer ${accessToken}` }

    const nowRes = await fetch(NOW_PLAYING_URL, { headers: authHeader })

    if (nowRes.status === 200) {
      const nowData = await nowRes.json()
      if (nowData && nowData.item && nowData.is_playing) {
        return Response.json(trackPayload(nowData.item, true), {
          headers: { 'Cache-Control': 'public, max-age=0, s-maxage=15' },
        })
      }
    }

    // Nothing currently playing — fall back to most recently played track
    const recentRes = await fetch(RECENTLY_PLAYED_URL, { headers: authHeader })
    if (recentRes.ok) {
      const recentData = await recentRes.json()
      const track = recentData?.items?.[0]?.track
      if (track) {
        return Response.json(trackPayload(track, false), {
          headers: { 'Cache-Control': 'public, max-age=0, s-maxage=30' },
        })
      }
    }

    return Response.json({ isPlaying: false }, { status: 200 })
  } catch (err) {
    return Response.json({ isPlaying: false, error: (err as Error).message }, { status: 200 })
  }
}

export const config: Config = {
  path: '/api/now-playing',
}
