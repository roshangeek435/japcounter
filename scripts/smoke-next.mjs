import { LEGACY_REDIRECTS, getAllPublicRoutes } from "../src/lib/routes.js";

const baseUrl = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000";

function routeUrl(route) {
	return new URL(route, baseUrl);
}

async function fetchRoute(route, init = {}) {
	const response = await fetch(routeUrl(route), {
		redirect: "manual",
		...init
	});

	return response;
}

function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

async function expectStatus(route, status = 200) {
	const response = await fetchRoute(route);
	assert(response.status === status, `Expected ${route} to return ${status}, got ${response.status}`);
	return response;
}

async function expectRedirect(source, destination) {
	const response = await fetchRoute(source);
	assert(response.status === 308, `Expected ${source} to return 308, got ${response.status}`);

	const location = response.headers.get("location");
	assert(location === destination || location === routeUrl(destination).toString(), `Expected ${source} to redirect to ${destination}, got ${location}`);
}

function expectIncludes(haystack, needle, label) {
	assert(haystack.includes(needle), `Expected ${label} to include "${needle}"`);
}

async function main() {
	const primaryRoutes = ["/", "/mantra-library", "/meditation-timer", "/about", "/contact", "/blog", "/blog/why-108", "/privacy", "/terms", "/disclaimer", "/counter/om-namah-shivaya"];

	for (const route of primaryRoutes) {
		await expectStatus(route, 200);
	}

	for (const redirectEntry of LEGACY_REDIRECTS) {
		await expectRedirect(redirectEntry.source, redirectEntry.destination);
	}

	const homeHtml = await (await expectStatus("/", 200)).text();
	expectIncludes(homeHtml, "<title>Japa Counter — Free Digital Mala for Mantra Meditation</title>", "home HTML");
	expectIncludes(homeHtml, 'rel="canonical"', "home HTML");

	const counterHtml = await (await expectStatus("/counter/om-namah-shivaya", 200)).text();
	expectIncludes(counterHtml, "Om Namah Shivaya Japa Counter", "counter HTML");
	expectIncludes(counterHtml, "application/ld+json", "counter JSON-LD");

	const blogHtml = await (await expectStatus("/blog", 200)).text();
	expectIncludes(blogHtml, "<title>Blog — Japa Counter</title>", "blog HTML");

	const blogPostHtml = await (await expectStatus("/blog/why-108", 200)).text();
	expectIncludes(blogPostHtml, "<title>Why Are There 108 Beads in a Mala? — Japa Counter</title>", "blog post HTML");

	const privacyHtml = await (await expectStatus("/privacy", 200)).text();
	expectIncludes(privacyHtml, "<title>Privacy Policy — Japa Counter</title>", "privacy HTML");

	const sitemapXml = await (await expectStatus("/sitemap.xml", 200)).text();
	const urlCount = (sitemapXml.match(/<url>/g) || []).length;
	assert(urlCount === getAllPublicRoutes().length, `Expected sitemap.xml to contain ${getAllPublicRoutes().length} urls, got ${urlCount}`);

	const robotsTxt = await (await expectStatus("/robots.txt", 200)).text();
	expectIncludes(robotsTxt, "User-Agent: *", "robots.txt");
	expectIncludes(robotsTxt, "Sitemap:", "robots.txt");

	console.log("Smoke checks passed for", baseUrl);
}

main().catch((error) => {
	console.error(error.message);
	process.exit(1);
});
