# Graph Report - .  (2026-04-28)

## Corpus Check
- 90 files · ~188,599 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 257 nodes · 280 edges · 24 communities detected
- Extraction: 82% EXTRACTED · 18% INFERRED · 0% AMBIGUOUS · INFERRED: 51 edges (avg confidence: 0.8)
- Token cost: 2,852 input · 1,823 output

## Community Hubs (Navigation)
- [[_COMMUNITY_UI Utilities|UI Utilities]]
- [[_COMMUNITY_Site Config|Site Config]]
- [[_COMMUNITY_Sitemap Gen|Sitemap Gen]]
- [[_COMMUNITY_Toast Notif|Toast Notif]]
- [[_COMMUNITY_Audio Player|Audio Player]]
- [[_COMMUNITY_Mantras Data|Mantras Data]]
- [[_COMMUNITY_App Docs|App Docs]]
- [[_COMMUNITY_Menubar UI|Menubar UI]]
- [[_COMMUNITY_Unicode Canvas|Unicode Canvas]]
- [[_COMMUNITY_Layout|Layout]]
- [[_COMMUNITY_App Router|App Router]]
- [[_COMMUNITY_Mantra Library|Mantra Library]]
- [[_COMMUNITY_Japa Counter|Japa Counter]]
- [[_COMMUNITY_SEO Head|SEO Head]]
- [[_COMMUNITY_Command UI|Command UI]]
- [[_COMMUNITY_Dialog UI|Dialog UI]]
- [[_COMMUNITY_Form UI|Form UI]]
- [[_COMMUNITY_Resizable UI|Resizable UI]]
- [[_COMMUNITY_Sheet UI|Sheet UI]]
- [[_COMMUNITY_Logo|Logo]]
- [[_COMMUNITY_Mandala Tap|Mandala Tap]]
- [[_COMMUNITY_Carousel UI|Carousel UI]]
- [[_COMMUNITY_Sonner UI|Sonner UI]]
- [[_COMMUNITY_Graphify Tool|Graphify Tool]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 26 edges
2. `siteUrl()` - 17 edges
3. `getSiteOrigin()` - 9 edges
4. `MantraCounterPage()` - 7 edges
5. `lastmodForRoute()` - 6 edges
6. `SeoHead()` - 5 edges
7. `siteHostname()` - 5 edges
8. `toUtcW3c()` - 4 edges
9. `Footer()` - 4 edges
10. `ShareButtons()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Footer()` --calls--> `siteUrl()`  [INFERRED]
  src/components/Layout.jsx → src/lib/siteConfig.js
- `Footer()` --calls--> `siteHostname()`  [INFERRED]
  src/components/Layout.jsx → src/lib/siteConfig.js
- `SeoHead()` --calls--> `getSiteOrigin()`  [INFERRED]
  src/components/SeoHead.jsx → src/lib/siteConfig.js
- `SeoHead()` --calls--> `siteUrl()`  [INFERRED]
  src/components/SeoHead.jsx → src/lib/siteConfig.js
- `CommandShortcut()` --calls--> `cn()`  [INFERRED]
  src/components/ui/command.jsx → src/lib/utils.js

## Communities

### Community 0 - "UI Utilities"
Cohesion: 0.07
Nodes (18): cn(), AlertDialogFooter(), AlertDialogHeader(), Badge(), BreadcrumbEllipsis(), BreadcrumbSeparator(), Calendar(), ContextMenuShortcut() (+10 more)

### Community 1 - "Site Config"
Cohesion: 0.12
Nodes (18): GlobalJsonLd(), ShareButtons(), contactEmail(), getSiteOrigin(), normalizeOrigin(), siteHostname(), siteUrl(), Home() (+10 more)

### Community 2 - "Sitemap Gen"
Cohesion: 0.42
Nodes (9): filesForRoute(), gitLastCommitIso(), isAllowCrawl(), lastmodForRoute(), loadRoutes(), maxMtimeMs(), pad2(), priorityForRoute() (+1 more)

### Community 3 - "Toast Notif"
Cohesion: 0.35
Nodes (7): addToRemoveQueue(), dispatch(), genId(), reducer(), toast(), useToast(), Toaster()

### Community 4 - "Audio Player"
Cohesion: 0.33
Nodes (6): AudioPlayer(), Equalizer(), onFirstGesture(), playOneShot(), unlockAudioContext(), useAudio()

### Community 5 - "Mantras Data"
Cohesion: 0.39
Nodes (5): getMantraById(), getMantrasByCategory(), buildFAQ(), MantraCounterPage(), ScriptFontClass()

### Community 6 - "App Docs"
Cohesion: 0.22
Nodes (9): Japa Counter Digital Mala Application, Japa Counter Web Application Entry, Create React App Getting Started Guide, SEO Robots Configuration, Decorative Mandala Background Texture, Mala Bead Tap Indicator Visual, Social Media Share Preview Image, Sacred Parchment Background Visual (+1 more)

### Community 7 - "Menubar UI"
Cohesion: 0.43
Nodes (6): MenubarGroup(), MenubarMenu(), MenubarPortal(), MenubarRadioGroup(), MenubarShortcut(), MenubarSub()

### Community 8 - "Unicode Canvas"
Cohesion: 0.48
Nodes (5): isDevanagari(), isGujarati(), isGurmukhi(), isMalayalam(), isTamil()

### Community 9 - "Layout"
Cohesion: 0.53
Nodes (4): CookieBanner(), Footer(), Header(), Layout()

### Community 10 - "App Router"
Cohesion: 0.6
Nodes (3): App(), BlogPostRoute(), LegacyRedirect()

### Community 11 - "Mantra Library"
Cohesion: 0.6
Nodes (3): MantraLibrary(), ScriptFontClass(), Section()

### Community 12 - "Japa Counter"
Cohesion: 0.83
Nodes (2): fmtTime(), JapaCounter()

### Community 13 - "SEO Head"
Cohesion: 0.83
Nodes (2): SeoHead(), toJsonLd()

### Community 14 - "Command UI"
Cohesion: 0.67
Nodes (2): CommandDialog(), CommandShortcut()

### Community 15 - "Dialog UI"
Cohesion: 0.67
Nodes (2): DialogFooter(), DialogHeader()

### Community 16 - "Form UI"
Cohesion: 0.67
Nodes (2): FormField(), useFormField()

### Community 17 - "Resizable UI"
Cohesion: 0.67
Nodes (2): ResizableHandle(), ResizablePanelGroup()

### Community 18 - "Sheet UI"
Cohesion: 0.67
Nodes (2): SheetFooter(), SheetHeader()

### Community 19 - "Logo"
Cohesion: 0.67
Nodes (1): Logo()

### Community 20 - "Mandala Tap"
Cohesion: 0.67
Nodes (1): MandalaTapButton()

### Community 21 - "Carousel UI"
Cohesion: 0.67
Nodes (1): useCarousel()

### Community 22 - "Sonner UI"
Cohesion: 0.67
Nodes (1): Toaster()

### Community 23 - "Graphify Tool"
Cohesion: 1.0
Nodes (2): Graphify Knowledge Graph Configuration, Graphify Knowledge Graph Tool

## Knowledge Gaps
- **7 isolated node(s):** `Graphify Knowledge Graph Configuration`, `Create React App Getting Started Guide`, `SEO Robots Configuration`, `Decorative Mandala Background Texture`, `Mala Bead Tap Indicator Visual` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Japa Counter`** (4 nodes): `fmtTime()`, `JapaCounter()`, `JapaCounter.jsx`, `JapaCounter.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `SEO Head`** (4 nodes): `SeoHead()`, `toJsonLd()`, `SeoHead.jsx`, `SeoHead.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Command UI`** (4 nodes): `command.jsx`, `command.jsx`, `CommandDialog()`, `CommandShortcut()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Dialog UI`** (4 nodes): `dialog.jsx`, `dialog.jsx`, `DialogFooter()`, `DialogHeader()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Form UI`** (4 nodes): `form.jsx`, `form.jsx`, `FormField()`, `useFormField()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Resizable UI`** (4 nodes): `resizable.jsx`, `resizable.jsx`, `ResizableHandle()`, `ResizablePanelGroup()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Sheet UI`** (4 nodes): `sheet.jsx`, `sheet.jsx`, `SheetFooter()`, `SheetHeader()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Logo`** (3 nodes): `Logo()`, `Logo.jsx`, `Logo.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Mandala Tap`** (3 nodes): `MandalaTapButton()`, `MandalaTapButton.jsx`, `MandalaTapButton.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Carousel UI`** (3 nodes): `carousel.jsx`, `carousel.jsx`, `useCarousel()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Sonner UI`** (3 nodes): `sonner.jsx`, `sonner.jsx`, `Toaster()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Graphify Tool`** (2 nodes): `Graphify Knowledge Graph Configuration`, `Graphify Knowledge Graph Tool`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `UI Utilities` to `Menubar UI`, `Command UI`, `Dialog UI`, `Resizable UI`, `Sheet UI`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `siteUrl()` connect `Site Config` to `Layout`, `Mantras Data`, `Mantra Library`, `SEO Head`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `MenubarShortcut()` connect `Menubar UI` to `UI Utilities`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Are the 24 inferred relationships involving `cn()` (e.g. with `DropdownMenuShortcut()` and `AlertDialogHeader()`) actually correct?**
  _`cn()` has 24 INFERRED edges - model-reasoned connections that need verification._
- **Are the 14 inferred relationships involving `siteUrl()` (e.g. with `Footer()` and `SeoHead()`) actually correct?**
  _`siteUrl()` has 14 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `getSiteOrigin()` (e.g. with `GlobalJsonLd()` and `SeoHead()`) actually correct?**
  _`getSiteOrigin()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `MantraCounterPage()` (e.g. with `getMantraById()` and `getMantrasByCategory()`) actually correct?**
  _`MantraCounterPage()` has 3 INFERRED edges - model-reasoned connections that need verification._