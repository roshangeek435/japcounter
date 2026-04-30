export function normalizeOrigin(url) {
	if (!url || typeof url !== "string") {
		return "";
	}
	return url.trim().replace(/\/$/, "");
}

export function getConfiguredSiteOrigin() {
	return normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL || "");
}

/**
 * Public site origin (no trailing slash).
 * Prefer env configuration for SSR/metadata. In the browser, fall back to
 * `window.location.origin` for local development and share URLs.
 */
export function getSiteOrigin() {
	const envOrigin = getConfiguredSiteOrigin();
	if (envOrigin) {
		return envOrigin;
	}
	if (typeof window !== "undefined" && window.location?.origin) {
		return normalizeOrigin(window.location.origin);
	}
	return "";
}

/** Hostname for UI copy (footer, canvas tagline, share text). */
export function siteHostname() {
	const origin = getConfiguredSiteOrigin();
	try {
		const host = new URL(origin).hostname.replace(/^www\./i, "");
		return host || "japachantingcounter";
	} catch {
		return "japachantingcounter";
	}
}

export function siteUrl(pathname = "/") {
	const origin = getSiteOrigin();
	const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
	if (!origin) {
		return path === "/" ? "/" : path;
	}
	return path === "/" ? `${origin}/` : `${origin}${path}`;
}

export function configuredSiteUrl(pathname = "/") {
	const origin = getConfiguredSiteOrigin();
	const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
	if (!origin) {
		return path === "/" ? "/" : path;
	}
	return path === "/" ? `${origin}/` : `${origin}${path}`;
}

export function contactEmail() {
	if (process.env.NEXT_PUBLIC_CONTACT_EMAIL) {
		return process.env.NEXT_PUBLIC_CONTACT_EMAIL;
	}

	const origin = getConfiguredSiteOrigin();
	try {
		const host = new URL(origin).hostname;
		if (host && host !== "localhost" && !/^127\./.test(host)) {
			return `support@${host}`;
		}
	} catch {
		/* ignore */
	}

	return "support@japachantingcounter.coms";
}

export function isAllowCrawl() {
	const raw = (process.env.NEXT_PUBLIC_ALLOW_CRAWL ?? "true").toString().trim().toLowerCase();

	if (["false", "0", "no", "off"].includes(raw)) {
		return false;
	}
	return true;
}
