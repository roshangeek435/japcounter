export const BLOG_POSTS = [
	{
		slug: "why-108",
		title: "Why Are There 108 Beads in a Mala?",
		excerpt: "The cosmic significance of the sacred number — from astronomy to Vedic mathematics.",
		body: [
			"The number 108 appears across nearly every Indic spiritual tradition. A traditional mala has 108 beads. Sun namaskars are often performed in cycles of 108. Many temples have 108 steps.",
			"Some say 108 reflects the average ratio of distances from the Earth to the Sun and Moon. Others note that the human body has 108 marma points. In numerology, 1 stands for higher truth, 0 for emptiness/completeness, 8 for infinity.",
			"Whatever the source, the practice of completing 108 chants creates a contained, deliberate spiritual unit. It is not too few to be casual, nor too many to be unsustainable. It is a perfect circle."
		]
	},
	{
		slug: "beginners-guide",
		title: "Beginner's Guide to Japa Meditation",
		excerpt: "How to choose a mantra, sit, and begin your daily practice — without overcomplicating it.",
		body: [
			"Start small. One mala (108 repetitions) takes roughly 8–12 minutes depending on your pace. That is enough.",
			"Choose any mantra that resonates. There is no hierarchy. The mantra you can return to daily is the right one for you.",
			"Sit comfortably with spine erect. Eyes can be open softly or closed. Move from one bead (or tap) to the next with each repetition. When the mind wanders — and it will — gently return to the sound."
		]
	},
	{
		slug: "mantra-vs-affirmation",
		title: "Mantra vs. Affirmation: What's the Difference?",
		excerpt: "Understanding the energetic distinction between these two related practices.",
		body: [
			"An affirmation is a self-directed positive statement chosen to reshape thought patterns. A mantra is a sound-form, often Sanskrit, whose vibration itself is considered transformative — independent of literal meaning.",
			"Both have value. Affirmations work primarily through the conscious mind. Mantras are said to act on subtler levels — pranic, energetic.",
			"The Freestyle counter on this site supports both equally. Type whatever your heart needs to hear today."
		]
	}
];

export function getBlogPostBySlug(slug) {
	return BLOG_POSTS.find((post) => post.slug === slug) || null;
}
