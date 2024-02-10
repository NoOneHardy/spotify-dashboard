import {RecommendationSeed} from "../helper/recommendation-seed";
import {Track} from "../track";

export interface Recommendations {
  seeds: RecommendationSeed[]
  tracks: Track[]
}
