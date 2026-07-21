import type { Config } from '@netlify/functions'
import { getAccessToken, authHeader } from './lib/spotify.ts'

const TOP_TRACKS_URL = 'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50'
const TOP_ARTISTS_URL = 'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50'
const MAX_ALBUMS = 8

export default async () => {
  try {
    const accessToken = await getAccessToken()
    const headers = authHeader(accessToken)

    const [tracksRes, artistsRes] = await Promise.all([
      fetch(TOP_TRACKS_URL, { headers }),
      fetch(TOP_ARTISTS_URL, { headers }),
    ])

    if (!tracksRes.ok) {
      throw new Error(`Failed to fetch top tracks: ${tracksRes.status}`)
    }

    const tracksData = await tracksRes.json()
    const genreByArtistId = new Map<string, string>()

    if (artistsRes.ok) {
      const artistsData = await artistsRes.json()
      for (const artist of artistsData.items ?? []) {
        if (artist.genres?.[0]) genreByArtistId.set(artist.id, artist.genres[0])
      }
    }

    const seenAlbums = new Set<string>()
    const albums: Array<{ artist: string; album: string; year: string; genre: string; cover: string }> = []

    for (const track of tracksData.items ?? []) {
      const albumId = track.album?.id
      if (!albumId || seenAlbums.has(albumId)) continue
      seenAlbums.add(albumId)

      const primaryArtist = track.artists?.[0]
      albums.push({
        artist: primaryArtist?.name ?? 'Unknown',
        album: track.album.name,
        year: (track.album.release_date ?? '').slice(0, 4),
        genre: genreByArtistId.get(primaryArtist?.id) ?? 'top mix',
        cover: track.album.images?.[0]?.url ?? '',
      })

      if (albums.length >= MAX_ALBUMS) break
    }

    return Response.json({ albums }, {
      headers: { 'Cache-Control': 'public, max-age=0, s-maxage=3600' },
    })
  } catch (err) {
    return Response.json({ albums: [], error: (err as Error).message }, { status: 200 })
  }
}

export const config: Config = {
  path: '/api/top-albums',
}
