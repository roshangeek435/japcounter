import { Blog } from "@/views/StaticPages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
	title: "Blog — Japa Counter",
	description: "Articles on mantra meditation, japa traditions, and the spiritual significance of 108.",
	canonical: "/blog"
});

export default function BlogPage() {
	return <Blog />;
}
