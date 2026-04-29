import { Contact } from "@/views/StaticPages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
	title: "Contact — Japa Counter",
	description: "Reach out with feedback, suggestions, or mantra requests.",
	canonical: "/contact"
});

export default function ContactPage() {
	return <Contact />;
}
