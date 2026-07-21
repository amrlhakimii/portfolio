import type { Config } from '@netlify/functions'
import { getAccessToken, authHeader } from './lib/spotify.ts'

const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'

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
    const headers = authHeader(accessToken)

    const nowRes = await fetch(NOW_PLAYING_URL, { headers })

    if (nowRes.status === 200) {
      const nowData = await nowRes.json()
      if (nowData && nowData.item && nowData.is_playing) {
        return Response.json(trackPayload(nowData.item, true), {
          headers: { 'Cache-Control': 'public, max-age=0, s-maxage=15' },
        })
      }
    }

    // Nothing currently playing — fall back to most recently played track
    const recentRes = await fetch(RECENTLY_PLAYED_URL, { headers })
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
