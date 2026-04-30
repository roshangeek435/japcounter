import { Contact } from "@/views/StaticPages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
	title: "Contact Japa Counter | Get in Touch With Us",
	description: "Have a question, feedback, or mantra request? Contact the Japa Counter team. We respond to every message with care and attention.",
	canonical: "/contact"
});

export default function ContactPage() {
	return <Contact />;
}
