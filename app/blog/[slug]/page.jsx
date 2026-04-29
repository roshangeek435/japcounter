import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blogPosts";
import { configuredSiteUrl, getConfiguredSiteOrigin } from "@/lib/siteConfig";
import { BlogPost } from "@/views/StaticPages";

export async function generateStaticParams() {
	return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const post = getBlogPostBySlug(slug);

	if (!post) {
		return buildMetadata({
			title: "Post not found — Japa Counter",
			description: "This journal entry could not be found.",
			canonical: "/blog",
			robots: {
				index: false,
				follow: true
			}
		});
	}

	return buildMetadata({
		title: `${post.title} — Japa Counter`,
		description: post.excerpt,
		canonical: `/blog/${post.slug}`,
		openGraphType: "article"
	});
}

export default async function BlogPostPage({ params }) {
	const { slug } = await params;
	const post = getBlogPostBySlug(slug);
	const origin = getConfiguredSiteOrigin();

	const articleSchema = post
		? {
				"@context": "https://schema.org",
				"@type": "BlogPosting",
				headline: post.title,
				description: post.excerpt,
				url: configuredSiteUrl(`/blog/${post.slug}`),
				mainEntityOfPage: {
					"@type": "WebPage",
					"@id": configuredSiteUrl(`/blog/${post.slug}`)
				},
				...(origin
					? {
							publisher: {
								"@id": `${origin}/#organization`
							}
						}
					: {})
			}
		: null;

	return (
		<>
			<JsonLd
				id="blog-post-jsonld"
				data={articleSchema}
			/>
			<BlogPost
				slug={slug}
				post={post}
			/>
		</>
	);
}
