import {TrackAudioAnalysisMeta} from "./track-audio-analysis-meta";
import {TrackAudioAnalysisTrack} from "./track-audio-analysis-track";
import {TrackAudioAnalysisBar} from "./track-audio-analysis-bar";
import {TrackAudioAnalysisBeat} from "./track-audio-analysis-beat";
import {TrackAudioAnalysisSection} from "./track-audio-analysis-section";
import {TrackAudioAnalysisSegment} from "./track-audio-analysis-segment";
import {TrackAudioAnalysisTatum} from "./track-audio-analysis-tatum";

export interface TrackAudioAnalysis {
  meta: TrackAudioAnalysisMeta
  track: TrackAudioAnalysisTrack
  bars: TrackAudioAnalysisBar[]
  beats: TrackAudioAnalysisBeat[]
  sections: TrackAudioAnalysisSection[]
  segments: TrackAudioAnalysisSegment[]
  tatums: TrackAudioAnalysisTatum[]
}
