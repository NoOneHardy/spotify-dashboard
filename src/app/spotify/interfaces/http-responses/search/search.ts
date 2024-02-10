import {SearchTracks} from "./search-tracks";
import {SearchArtists} from "./search-artists";
import {SearchAlbums} from "./search-albums";
import {SearchPlaylists} from "./search-playlists";
import {SearchShows} from "./search-shows";
import {SearchEpisodes} from "./search-episodes";
import {SearchAudiobooks} from "./search-audiobooks";

export interface Search {
  tracks: SearchTracks
  artists: SearchArtists
  albums: SearchAlbums
  playlists: SearchPlaylists
  shows: SearchShows
  episodes: SearchEpisodes
  audiobooks: SearchAudiobooks
}
