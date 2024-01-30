import {AddedByUser} from "./added-by-user";
import {Track} from "../track";

export interface PlaylistTrack {
  added_at: string | null
  added_by: AddedByUser
  is_local: boolean
  track: Track
}
