import { siteHostname } from "@/lib/siteConfig";
import Link from "next/link";

export const Logo = ({ size = "md" }) => {
	const sizes = { sm: "text-xl", md: "text-2xl", lg: "text-3xl" };
	return (
		<Link
			href="/"
			className="flex items-center gap-2 group"
			data-testid="brand-logo"
			title={`${siteHostname()}`}
		>
			<span
				className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#D4AF37] text-white font-serif text-xl shadow-md group-hover:scale-105 transition-transform"
				aria-hidden="true"
			>
				ॐ
			</span>
			<span className={`font-serif font-semibold text-[#7B1C1C] ${sizes[size]} leading-tight`}>
				Japa Counter
				<span className="block text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-sans font-medium">Online · Digital Mala</span>
			</span>
		</Link>
	);
};

export default Logo;
