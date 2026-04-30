import { Blog } from "@/views/StaticPages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
	title: "Japa Counter Blog | Mantra & Meditation Wisdom",
	description: "Read articles on mantra chanting, daily japa practice, the meaning of 108, and timeless wisdom for modern devotees. From the Japa Counter team.",
	canonical: "/blog"
});

export default function BlogPage() {
	return <Blog />;
}
