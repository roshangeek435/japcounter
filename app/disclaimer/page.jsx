import { Disclaimer } from "@/views/StaticPages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
	title: "Disclaimer | Japa Counter",
	description: "Read our disclaimer. Japa Counter is a digital tool for tracking mantra chanting and is not a replacement for spiritual guidance from a guru.",
	canonical: "/disclaimer"
});

export default function DisclaimerPage() {
	return <Disclaimer />;
}
