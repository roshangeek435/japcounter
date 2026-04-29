"use client";

import { motion } from "framer-motion";
import mandalaTap from "../assets/images/mandala-tap.png";
import Image from "next/image";

export const MandalaTapButton = ({ count, total = 108, onTap, label = "Tap to chant", sparkle = false }) => {
	const radius = 100;
	const stroke = 10;
	const norm = radius - stroke;
	const circ = norm * 2 * Math.PI;
	const progress = (count % total) / total;
	const offset = circ - progress * circ;

	return (
		<div
			className="relative inline-block"
			data-testid="tap-button-wrapper"
		>
			<svg
				width={radius * 2}
				height={radius * 2}
				className="rotate-[-90deg]"
			>
				<defs>
					<linearGradient
						id="ringGrad"
						x1="0"
						y1="0"
						x2="1"
						y2="1"
					>
						<stop
							offset="0%"
							stopColor="#FF6B00"
						/>
						<stop
							offset="100%"
							stopColor="#D4AF37"
						/>
					</linearGradient>
				</defs>
				<circle
					cx={radius}
					cy={radius}
					r={norm}
					stroke="#FFE7BE"
					strokeWidth={stroke}
					fill="transparent"
				/>
				<circle
					cx={radius}
					cy={radius}
					r={norm}
					stroke="url(#ringGrad)"
					strokeWidth={stroke}
					strokeLinecap="round"
					strokeDasharray={circ}
					strokeDashoffset={offset}
					fill="transparent"
					style={{ transition: "stroke-dashoffset 0.4s ease" }}
				/>
			</svg>
			<motion.button
				onClick={onTap}
				whileTap={{ scale: 0.92 }}
				className="lotus-pulse absolute inset-0 m-auto w-[175px] h-[175px] rounded-full bg-gradient-to-br from-[#FFF3DD] via-[#FFE7BE] to-[#FFD699] border-4 border-[#D4AF37]/50 flex items-center justify-center overflow-hidden"
				aria-label={label}
				data-testid="japa-tap-button"
			>
				<Image
					src={mandalaTap}
					alt="Lotus mandala"
					width={170}
					height={170}
					className="object-contain pointer-events-none select-none"
				/>
				<span className="sr-only">{label}</span>
			</motion.button>
			{sparkle && (
				<div
					className="sparkle absolute inset-0 m-auto w-[260px] h-[260px] rounded-full pointer-events-none"
					style={{
						background: "radial-gradient(circle, rgba(212,175,55,0.6) 0%, transparent 65%)"
					}}
				/>
			)}
		</div>
	);
};

export default MandalaTapButton;
