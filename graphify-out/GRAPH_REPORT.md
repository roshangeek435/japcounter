# Graph Report - /media/data/Product/japcounter  (2026-04-30)

## Corpus Check
- 73 files · ~229,941 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 444 nodes · 621 edges · 37 communities detected
- Extraction: 85% EXTRACTED · 15% INFERRED · 0% AMBIGUOUS · INFERRED: 92 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Inspector Overlay Minified|Inspector Overlay Minified]]
- [[_COMMUNITY_Inspector Overlay Minified|Inspector Overlay Minified]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Script Detection|Script Detection]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Mantra Library|Mantra Library]]
- [[_COMMUNITY_Toast Notifications|Toast Notifications]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Inspector DT Module|Inspector DT Module]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Devotional Audio|Devotional Audio]]
- [[_COMMUNITY_Script Detection|Script Detection]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_Devotional Audio|Devotional Audio]]
- [[_COMMUNITY_Fragment 38|Fragment 38]]
- [[_COMMUNITY_Devotional Audio|Devotional Audio]]
- [[_COMMUNITY_Devotional Audio|Devotional Audio]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 26 edges
2. `siteUrl()` - 17 edges
3. `it()` - 15 edges
4. `e` - 14 edges
5. `X()` - 14 edges
6. `c()` - 13 edges
7. `M()` - 11 edges
8. `z()` - 11 edges
9. `J()` - 11 edges
10. `Q()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `test()` --calls--> `contactEmail()`  [INFERRED]
  scripts/test-jsdom.js → src/lib/siteConfig.js
- `test()` --calls--> `ScriptFontClass()`  [INFERRED]
  scripts/test-jsdom.js → src/pages/MantraCounterPage.jsx
- `test()` --calls--> `ScriptFontClass()`  [INFERRED]
  scripts/test-jsdom.js → src/pages/MantraLibrary.jsx
- `generateMetadata()` --calls--> `buildMetadata()`  [INFERRED]
  app/counter/[slug]/page.jsx → src/lib/metadata.js
- `BlogPostPage()` --calls--> `getConfiguredSiteOrigin()`  [INFERRED]
  app/blog/[slug]/page.jsx → src/lib/siteConfig.js

## Hyperedges (group relationships)
- **Devotional Audio Collection** — audio_bansuri_flute, audio_gayatri, audio_gaytri_sanskrit, audio_hanuman_chalisa, audio_krishna_flute, audio_om_chant, audio_radhe_chant, audio_ram_dhun, audio_shiv_tandav [EXTRACTED 1.00]
- **UI Sound Effects** — audio_bell_click, audio_mala_bell [INFERRED 0.80]
- **Sanskrit Mantra Texts** — gayatri_mantra_text, hanuman_chalisa_text, radhe_chant_text, ram_dhun_text [EXTRACTED 1.00]

## Communities

### Community 0 - "Japa Counter"
Cohesion: 0.06
Nodes (31): RootLayout(), HomePage(), robots(), GlobalJsonLd(), JsonLd(), Footer(), Logo(), SeoHead() (+23 more)

### Community 1 - "Japa Counter"
Cohesion: 0.05
Nodes (25): cn(), AlertDialogFooter(), AlertDialogHeader(), Badge(), BreadcrumbEllipsis(), BreadcrumbSeparator(), Calendar(), CommandShortcut() (+17 more)

### Community 2 - "Inspector Overlay Minified"
Cohesion: 0.13
Nodes (45): $(), a(), at(), bt(), c(), Ct(), d(), ee() (+37 more)

### Community 3 - "Inspector Overlay Minified"
Cohesion: 0.09
Nodes (2): e, it()

### Community 4 - "Japa Counter"
Cohesion: 0.14
Nodes (13): getBlogPostBySlug(), getMantraById(), getMantrasByCategory(), buildFAQ(), MantraCounterPage(), ScriptFontClass(), BlogPostPage(), CounterPage() (+5 more)

### Community 5 - "Japa Counter"
Cohesion: 0.37
Nodes (10): getAllPublicRoutes(), getBlogRoutes(), getCounterRoutes(), assert(), expectIncludes(), expectRedirect(), expectStatus(), fetchRoute() (+2 more)

### Community 6 - "Japa Counter"
Cohesion: 0.27
Nodes (10): sitemap(), filesForRoute(), getFileLastmod(), getSitemapEntries(), gitLastCommitIso(), lastmodForRoute(), maxMtimeMs(), pad2() (+2 more)

### Community 7 - "Japa Counter"
Cohesion: 0.26
Nodes (8): isDevanagari(), isGujarati(), isGurmukhi(), isMalayalam(), isTamil(), MantraLibrary(), ScriptFontClass(), test()

### Community 8 - "Japa Counter"
Cohesion: 0.33
Nodes (9): About(), Blog(), BlogPost(), Contact(), Disclaimer(), Legal(), Privacy(), Section() (+1 more)

### Community 9 - "Script Detection"
Cohesion: 0.31
Nodes (6): filesForRoute(), gitLastCommitIso(), lastmodForRoute(), maxMtimeMs(), pad2(), toUtcW3c()

### Community 10 - "Japa Counter"
Cohesion: 0.33
Nodes (6): AudioPlayer(), Equalizer(), onFirstGesture(), playOneShot(), unlockAudioContext(), useAudio()

### Community 11 - "Mantra Library"
Cohesion: 0.2
Nodes (10): Gayatri Mantra Audio, Hanuman Chalisa Chant, Om Chant Audio, Radhe Krishna Chant, Ram Dhun (Shri Ram Jai Ram), Shiv Tandav Stotram Audio, Gayatri Mantra Sanskrit Text, Hanuman Chalisa Text (+2 more)

### Community 12 - "Toast Notifications"
Cohesion: 0.33
Nodes (7): addToRemoveQueue(), dispatch(), genId(), reducer(), toast(), useToast(), Toaster()

### Community 13 - "Japa Counter"
Cohesion: 0.22
Nodes (9): Japa Counter Digital Mala Application, Japa Counter Web Application Entry, Create React App Getting Started Guide, SEO Robots Configuration, Decorative Mandala Background Texture, Mala Bead Tap Indicator Visual, Social Media Share Preview Image, Sacred Parchment Background Visual (+1 more)

### Community 14 - "Inspector DT Module"
Cohesion: 0.29
Nodes (1): dt()

### Community 15 - "Japa Counter"
Cohesion: 0.53
Nodes (4): CookieBanner(), CountersDropdown(), Header(), Layout()

### Community 16 - "Japa Counter"
Cohesion: 0.6
Nodes (3): MantraLibrary(), ScriptFontClass(), Section()

### Community 18 - "Japa Counter"
Cohesion: 0.83
Nodes (2): fmtTime(), JapaCounter()

### Community 19 - "Devotional Audio"
Cohesion: 0.5
Nodes (4): Development Commands, Environment Variables, Next.js Migration, REACT_APP Fallback Compatibility

### Community 20 - "Script Detection"
Cohesion: 1.0
Nodes (2): findSystemChrome(), prerender()

### Community 21 - "Japa Counter"
Cohesion: 0.67
Nodes (1): MandalaTapButton()

### Community 23 - "Japa Counter"
Cohesion: 0.67
Nodes (1): Toaster()

### Community 24 - "Japa Counter"
Cohesion: 0.67
Nodes (1): AboutPage()

### Community 25 - "Japa Counter"
Cohesion: 0.67
Nodes (1): BlogPage()

### Community 26 - "Japa Counter"
Cohesion: 0.67
Nodes (1): ContactPage()

### Community 27 - "Japa Counter"
Cohesion: 0.67
Nodes (1): DisclaimerPage()

### Community 28 - "Japa Counter"
Cohesion: 0.67
Nodes (1): MantraLibraryPage()

### Community 29 - "Japa Counter"
Cohesion: 0.67
Nodes (1): MeditationTimerPage()

### Community 30 - "Japa Counter"
Cohesion: 0.67
Nodes (1): PrivacyPage()

### Community 31 - "Japa Counter"
Cohesion: 0.67
Nodes (1): TermsPage()

### Community 32 - "Japa Counter"
Cohesion: 0.67
Nodes (1): AppToaster()

### Community 33 - "Japa Counter"
Cohesion: 0.67
Nodes (1): Home()

### Community 34 - "Japa Counter"
Cohesion: 0.67
Nodes (1): MeditationTimer()

### Community 35 - "Devotional Audio"
Cohesion: 0.67
Nodes (3): Bell Click Sound Effect, Mala Bell Sound Effect, OG Image - Singing Bowl & Rudraksha Mala

### Community 38 - "Fragment 38"
Cohesion: 1.0
Nodes (2): Graphify Knowledge Graph Configuration, Graphify Knowledge Graph Tool

### Community 39 - "Devotional Audio"
Cohesion: 1.0
Nodes (2): Bansuri (Bamboo Flute) Audio, Krishna Flute Music

### Community 91 - "Devotional Audio"
Cohesion: 1.0
Nodes (1): Gayatri Mantra (Sanskrit Transcription)

## Knowledge Gaps
- **18 isolated node(s):** `Graphify Knowledge Graph Configuration`, `Create React App Getting Started Guide`, `SEO Robots Configuration`, `Decorative Mandala Background Texture`, `Mala Bead Tap Indicator Visual` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Inspector Overlay Minified`** (26 nodes): `e`, `.constructor()`, `.context()`, `.dispatch()`, `.document()`, `.eventHasCtrlOrMeta()`, `.install()`, `.installed()`, `.reset()`, `.resetCanvas()`, `.setCanvas()`, `.setPlatform()`, `.uninstall()`, `.window()`, `it()`, `.drawContainerQueryHighlight()`, `.drawFlexContainerHighlight()`, `.drawGreenDevFloatyAnchors()`, `.drawGridHighlight()`, `.drawScrollSnapHighlight()`, `.install()`, `.isPointInDraggablePath()`, `.renderGridMarkup()`, `.reset()`, `.setGreenDevAnchorsOverlay()`, `.uninstall()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Inspector DT Module`** (7 nodes): `dt()`, `.constructor()`, `.install()`, `.onDrag()`, `.onMousedown()`, `.onMousemove()`, `.uninstall()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Japa Counter`** (4 nodes): `fmtTime()`, `JapaCounter()`, `JapaCounter.jsx`, `JapaCounter.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Script Detection`** (3 nodes): `findSystemChrome()`, `prerender.js`, `prerender()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Japa Counter`** (3 nodes): `MandalaTapButton()`, `MandalaTapButton.jsx`, `MandalaTapButton.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Japa Counter`** (3 nodes): `sonner.jsx`, `sonner.jsx`, `Toaster()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Japa Counter`** (3 nodes): `AboutPage()`, `page.jsx`, `page.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Japa Counter`** (3 nodes): `page.jsx`, `BlogPage()`, `page.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Japa Counter`** (3 nodes): `page.jsx`, `ContactPage()`, `page.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Japa Counter`** (3 nodes): `page.jsx`, `DisclaimerPage()`, `page.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Japa Counter`** (3 nodes): `page.jsx`, `MantraLibraryPage()`, `page.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Japa Counter`** (3 nodes): `page.jsx`, `page.jsx`, `MeditationTimerPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Japa Counter`** (3 nodes): `page.jsx`, `page.jsx`, `PrivacyPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Japa Counter`** (3 nodes): `page.jsx`, `page.jsx`, `TermsPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Japa Counter`** (3 nodes): `AppToaster()`, `AppToaster.jsx`, `AppToaster.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Japa Counter`** (3 nodes): `Home.jsx`, `Home.jsx`, `Home()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Japa Counter`** (3 nodes): `MeditationTimer.jsx`, `MeditationTimer.jsx`, `MeditationTimer()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Fragment 38`** (2 nodes): `Graphify Knowledge Graph Configuration`, `Graphify Knowledge Graph Tool`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Devotional Audio`** (2 nodes): `Bansuri (Bamboo Flute) Audio`, `Krishna Flute Music`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Devotional Audio`** (1 nodes): `Gayatri Mantra (Sanskrit Transcription)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `contactEmail()` connect `Japa Counter` to `Japa Counter`, `Japa Counter`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `siteUrl()` connect `Japa Counter` to `Japa Counter`, `Japa Counter`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `configuredSiteUrl()` connect `Japa Counter` to `Japa Counter`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 24 inferred relationships involving `cn()` (e.g. with `DropdownMenuShortcut()` and `AlertDialogHeader()`) actually correct?**
  _`cn()` has 24 INFERRED edges - model-reasoned connections that need verification._
- **Are the 14 inferred relationships involving `siteUrl()` (e.g. with `Footer()` and `SeoHead()`) actually correct?**
  _`siteUrl()` has 14 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Graphify Knowledge Graph Configuration`, `Create React App Getting Started Guide`, `SEO Robots Configuration` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Japa Counter` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._