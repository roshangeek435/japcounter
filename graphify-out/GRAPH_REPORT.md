# Graph Report - japcounter  (2026-04-29)

## Corpus Check
- 78 files · ~191,883 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 277 nodes · 392 edges · 15 communities detected
- Extraction: 85% EXTRACTED · 15% INFERRED · 0% AMBIGUOUS · INFERRED: 59 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 21|Community 21]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 25 edges
2. `siteUrl()` - 16 edges
3. `it()` - 15 edges
4. `e` - 14 edges
5. `X()` - 14 edges
6. `c()` - 13 edges
7. `M()` - 11 edges
8. `z()` - 11 edges
9. `J()` - 11 edges
10. `Q()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `test()` --calls--> `isDevanagari()`  [INFERRED]
  scripts/test-jsdom.js → src/components/WritingCanvas.jsx
- `test()` --calls--> `isGujarati()`  [INFERRED]
  scripts/test-jsdom.js → src/components/WritingCanvas.jsx
- `test()` --calls--> `isGurmukhi()`  [INFERRED]
  scripts/test-jsdom.js → src/components/WritingCanvas.jsx
- `test()` --calls--> `isTamil()`  [INFERRED]
  scripts/test-jsdom.js → src/components/WritingCanvas.jsx
- `test()` --calls--> `isMalayalam()`  [INFERRED]
  scripts/test-jsdom.js → src/components/WritingCanvas.jsx

## Communities

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (24): cn(), AlertDialogFooter(), AlertDialogHeader(), Badge(), BreadcrumbEllipsis(), BreadcrumbSeparator(), Calendar(), CommandShortcut() (+16 more)

### Community 1 - "Community 1"
Cohesion: 0.15
Nodes (27): a(), at(), bt(), c(), Ct(), d(), ee(), f() (+19 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (19): GlobalJsonLd(), Footer(), SeoHead(), toJsonLd(), ShareButtons(), contactEmail(), getSiteOrigin(), normalizeOrigin() (+11 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (2): e, it()

### Community 4 - "Community 4"
Cohesion: 0.15
Nodes (13): isDevanagari(), isGujarati(), isGurmukhi(), isMalayalam(), isTamil(), getMantraById(), getMantrasByCategory(), buildFAQ() (+5 more)

### Community 5 - "Community 5"
Cohesion: 0.3
Nodes (18): $(), et(), g(), J(), K(), l(), n(), o() (+10 more)

### Community 6 - "Community 6"
Cohesion: 0.31
Nodes (6): filesForRoute(), gitLastCommitIso(), lastmodForRoute(), maxMtimeMs(), pad2(), toUtcW3c()

### Community 7 - "Community 7"
Cohesion: 0.33
Nodes (7): addToRemoveQueue(), dispatch(), genId(), reducer(), toast(), useToast(), Toaster()

### Community 8 - "Community 8"
Cohesion: 0.22
Nodes (9): Jap Counter Digital Mala Application, Jap Counter Web Application Entry, Create React App Getting Started Guide, SEO Robots Configuration, Decorative Mandala Background Texture, Mala Bead Tap Indicator Visual, Social Media Share Preview Image, Sacred Parchment Background Visual (+1 more)

### Community 9 - "Community 9"
Cohesion: 0.32
Nodes (5): AudioPlayer(), onFirstGesture(), playOneShot(), unlockAudioContext(), useAudio()

### Community 10 - "Community 10"
Cohesion: 0.29
Nodes (1): dt()

### Community 11 - "Community 11"
Cohesion: 0.29
Nodes (1): MenubarShortcut()

### Community 13 - "Community 13"
Cohesion: 1.0
Nodes (2): findSystemChrome(), prerender()

### Community 14 - "Community 14"
Cohesion: 1.0
Nodes (2): fmtTime(), JapaCounter()

### Community 21 - "Community 21"
Cohesion: 1.0
Nodes (2): Graphify Knowledge Graph Configuration, Graphify Knowledge Graph Tool

## Knowledge Gaps
- **7 isolated node(s):** `Graphify Knowledge Graph Configuration`, `Create React App Getting Started Guide`, `SEO Robots Configuration`, `Decorative Mandala Background Texture`, `Mala Bead Tap Indicator Visual` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 3`** (25 nodes): `e`, `.constructor()`, `.context()`, `.dispatch()`, `.document()`, `.eventHasCtrlOrMeta()`, `.install()`, `.installed()`, `.reset()`, `.resetCanvas()`, `.setCanvas()`, `.setPlatform()`, `.uninstall()`, `.window()`, `it()`, `.drawContainerQueryHighlight()`, `.drawFlexContainerHighlight()`, `.drawGreenDevFloatyAnchors()`, `.drawGridHighlight()`, `.install()`, `.isPointInDraggablePath()`, `.renderGridMarkup()`, `.reset()`, `.setGreenDevAnchorsOverlay()`, `.uninstall()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (7 nodes): `dt()`, `.constructor()`, `.install()`, `.onDrag()`, `.onMousedown()`, `.onMousemove()`, `.uninstall()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (7 nodes): `menubar.jsx`, `MenubarGroup()`, `MenubarMenu()`, `MenubarPortal()`, `MenubarRadioGroup()`, `MenubarShortcut()`, `MenubarSub()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (3 nodes): `findSystemChrome()`, `prerender.js`, `prerender()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (3 nodes): `fmtTime()`, `JapaCounter()`, `JapaCounter.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (2 nodes): `Graphify Knowledge Graph Configuration`, `Graphify Knowledge Graph Tool`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 0` to `Community 11`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `e` connect `Community 3` to `Community 1`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `siteUrl()` connect `Community 2` to `Community 4`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 24 inferred relationships involving `cn()` (e.g. with `DropdownMenuShortcut()` and `AlertDialogHeader()`) actually correct?**
  _`cn()` has 24 INFERRED edges - model-reasoned connections that need verification._
- **Are the 14 inferred relationships involving `siteUrl()` (e.g. with `Footer()` and `SeoHead()`) actually correct?**
  _`siteUrl()` has 14 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Graphify Knowledge Graph Configuration`, `Create React App Getting Started Guide`, `SEO Robots Configuration` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._