"use client";

import React, { useEffect } from "react";
import { Volume2, VolumeX, Music2, Play, Pause, AlertCircle } from "lucide-react";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useAudio } from "../hooks/useAudio";

export const TRACKS = [
	{ id: "silence", name: "Silence (No Music)", url: "" },
	{ id: "om-chant", name: "Om Chant (Ambient)", url: "/audio/om-chant.mp3" },
	{ id: "ram-dhun", name: "Ram Dhun (Ambient)", url: "/audio/ram-dhun.mp3" },
	{ id: "radhe-chant", name: "Radhe Radhe (Ambient)", url: "/audio/radhe-chant.mp3" },
	{ id: "hanuman", name: "Hanuman Chalisa (Ambient)", url: "/audio/hanuman.mp3" },
	{ id: "bansuri", name: "Bansuri / Flute Meditation", url: "/audio/bansuri.mp3" },
	{ id: "shiv-tandav", name: "Shiv Tandav (Ambient)", url: "/audio/shiv-tandav.mp3" },
	{ id: "gayatri", name: "Gayatri Mantra (Ambient)", url: "/audio/gayatri.mp3" },
	{ id: "krishna-flute", name: "Krishna Flute Meditation", url: "/audio/krishna-flute.mp3" }
];

const Equalizer = () => (
	<span
		className="inline-flex items-end gap-[2px] h-4 ml-2"
		aria-hidden="true"
	>
		{[0, 1, 2].map((i) => (
			<span
				key={i}
				className="w-[3px] bg-[#FF6B00] rounded-sm origin-bottom"
				style={{ animation: `eqbar 0.9s ease-in-out infinite ${i * 0.15}s`, height: "14px" }}
			/>
		))}
		<style>{`@keyframes eqbar { 0%,100%{transform:scaleY(0.35)} 50%{transform:scaleY(1)} }`}</style>
	</span>
);

export const AudioPlayer = ({ defaultTrack = "silence", clickSoundEnabled, setClickSoundEnabled }) => {
	const { isPlaying, volume, setVolume, muted, setMuted, error, currentSrc, toggle, switchTrack } = useAudio({ initialVolume: 0.6, loop: true });
	const [trackId, setTrackId] = React.useState(defaultTrack);
	const track = TRACKS.find((t) => t.id === trackId) || TRACKS[0];

	// Whenever defaultTrack prop changes (different page), update local state
	useEffect(() => {
		setTrackId(defaultTrack);
	}, [defaultTrack]);

	const onTrackChange = (newId) => {
		setTrackId(newId);
		const next = TRACKS.find((t) => t.id === newId);
		if (!next || !next.url) {
			switchTrack("", false);
		} else {
			switchTrack(next.url, true);
		}
	};

	const onPlayToggle = () => {
		if (!currentSrc && track.url) {
			switchTrack(track.url, true);
			return;
		}
		toggle();
	};

	return (
		<div
			className="bg-white border border-[#D4AF37]/30 rounded-2xl p-5 shadow-sm"
			data-testid="audio-player"
		>
			<div className="flex items-center gap-2 mb-3">
				<Music2 className="w-4 h-4 text-[#7B1C1C]" />
				<h3 className="font-serif text-lg text-[#7B1C1C]">Background Music</h3>
				{isPlaying && <Equalizer />}
			</div>

			<Select
				value={trackId}
				onValueChange={onTrackChange}
			>
				<SelectTrigger
					className="border-[#D4AF37]/40 bg-[#FFF8EE]"
					data-testid="audio-track-select"
				>
					<SelectValue />
				</SelectTrigger>
				<SelectContent className="bg-[#FFF8EE] border-[#D4AF37]/40">
					{TRACKS.map((t) => (
						<SelectItem
							key={t.id}
							value={t.id}
							data-testid={`audio-track-${t.id}`}
						>
							{t.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<div className="mt-4 flex items-center gap-3">
				<button
					onClick={() => setMuted((m) => !m)}
					className="p-2 rounded-full hover:bg-[#FFF3DD] text-[#7B1C1C]"
					aria-label={muted ? "Unmute" : "Mute"}
					data-testid="mute-toggle-btn"
				>
					{muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
				</button>
				<Slider
					value={[Math.round(volume * 100)]}
					max={100}
					step={1}
					onValueChange={(v) => setVolume(v[0] / 100)}
					className="flex-1"
					data-testid="volume-slider"
				/>
				<span className="text-xs w-10 text-right text-[#7B1C1C]">{Math.round(volume * 100)}%</span>
			</div>

			<div className="mt-3 flex items-center sm:justify-between text-sm flex-wrap justify-center gap-2">
				<span className="text-[#7B1C1C]/80 truncate pr-2">
					Now playing: <span className="font-medium">{track.name}</span>
				</span>
				<button
					onClick={onPlayToggle}
					disabled={!track.url}
					className="px-4 py-1.5 rounded-full bg-[#FF6B00] hover:bg-[#7B1C1C] text-white text-xs font-medium disabled:opacity-40 inline-flex items-center gap-1"
					data-testid="audio-play-toggle"
				>
					{isPlaying ? (
						<>
							<Pause className="w-3 h-3" />
							Pause
						</>
					) : (
						<>
							<Play className="w-3 h-3" />
							Play
						</>
					)}
				</button>
			</div>

			{error && (
				<p
					className="mt-2 text-xs text-amber-700 inline-flex items-center gap-1"
					data-testid="audio-error"
				>
					<AlertCircle className="w-3 h-3" /> {error}
				</p>
			)}

			<div className="mt-4 flex items-center justify-between border-t border-[#D4AF37]/20 pt-3">
				<label
					className="text-sm text-[#1A1A1A]"
					htmlFor="click-sound"
				>
					Tap click sound
				</label>
				<Switch
					id="click-sound"
					checked={clickSoundEnabled}
					onCheckedChange={setClickSoundEnabled}
					data-testid="click-sound-toggle"
				/>
			</div>
		</div>
	);
};

export default AudioPlayer;
