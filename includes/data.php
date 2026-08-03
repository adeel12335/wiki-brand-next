<?php
/**
 * Single source of truth for site content.
 *
 * Pages, the services listing, the sitemap, and the JSON-LD schema all read from
 * these arrays, so adding a service in one place updates the nav, cards, detail
 * page, sitemap, and structured data together.
 */

declare(strict_types=1);

/**
 * Service catalogue. Each entry drives a card on /services/ and a full detail
 * page at /services/<slug>/ with its own title, description, and keywords.
 *
 * @return array<string, array<string, mixed>>
 */
function services(): array
{
    return [
        'wikipedia-page-creation' => [
            'name'        => 'Wikipedia Page Creation',
            'icon'        => 'i-page',
            'card'        => 'From research to publication, we create fully referenced, notability-compliant Wikipedia pages.',
            'eyebrow'     => 'Wikipedia Page Creation Services',
            'h1'          => 'Wikipedia page creation built on <span>notability</span> and reliable sources.',
            'lede'        => 'A new Wikipedia page only survives if the subject is genuinely notable and every claim is backed by independent, reliable coverage. We assess that first, then build the article to the standard reviewers expect.',
            'meta_title'  => 'Wikipedia Page Creation Services | Professional Wikipedia Writers',
            'meta_desc'   => 'Professional Wikipedia page creation: notability assessment, independent sourcing, neutral writing, and full guideline compliance.',
            'keywords'    => 'wikipedia page creation, create a wikipedia page, wikipedia page creation services, professional wikipedia writers, wikipedia notability assessment, wikipedia article creation',
            'og_image'    => 'assets/og/portfolio-business-leader.jpg',
            'includes'    => [
                'Notability assessment against Wikipedia\'s GNG and subject-specific guidelines',
                'Independent source research, verification, and citation mapping',
                'Neutral, encyclopedic drafting with a clear structure and lead section',
                'Full reference formatting with archived links where sources may rot',
                'Draft submission handling and reviewer-feedback revisions',
                'Post-publication monitoring for the first stabilisation period',
            ],
            'deliverables' => [
                ['title' => 'Notability report', 'copy' => 'A written verdict on whether the subject currently meets Wikipedia\'s notability bar, and what coverage is missing if not.'],
                ['title' => 'Sourced draft', 'copy' => 'A complete, neutrally written article with every substantive statement tied to an independent reliable source.'],
                ['title' => 'Reference pack', 'copy' => 'An organised list of every source used, assessed for independence, reliability, and depth of coverage.'],
                ['title' => 'Review support', 'copy' => 'Responses to reviewer comments and guideline-driven revisions until the article is accepted or a clear blocker is documented.'],
            ],
        ],

        'wikipedia-page-editing' => [
            'name'        => 'Page Editing & Expansion',
            'icon'        => 'i-edit',
            'card'        => 'Improve, expand, and enhance existing pages with accurate content and strong citations.',
            'eyebrow'     => 'Wikipedia Page Editing & Expansion',
            'h1'          => 'Editing and expansion that <span>strengthens</span> an existing page.',
            'lede'        => 'Existing articles often carry outdated facts, thin sourcing, maintenance tags, or gaps in coverage. We audit the page, fix what verifiably needs fixing, and expand it with properly cited material.',
            'meta_title'  => 'Wikipedia Page Editing & Expansion Services | Expert Editors',
            'meta_desc'   => 'Wikipedia page editing and expansion: source audits, maintenance-tag fixes, content updates, neutral rewrites, and cited expansion.',
            'keywords'    => 'wikipedia page editing, wikipedia article expansion, edit wikipedia page, wikipedia page improvement, remove wikipedia maintenance tags, wikipedia citation cleanup',
            'og_image'    => 'assets/og/portfolio-author.jpg',
            'includes'    => [
                'Full audit of structure, tone, sourcing, and maintenance tags',
                'Correction of outdated, unsourced, or misattributed statements',
                'Expansion of thin sections with independent, verifiable coverage',
                'Neutral point-of-view rewrites of promotional or unbalanced passages',
                'Citation repair: dead links, incomplete references, unreliable sources',
                'Talk-page documentation of substantive changes and conflicts of interest',
            ],
            'deliverables' => [
                ['title' => 'Page audit', 'copy' => 'A section-by-section report on what is inaccurate, unsourced, outdated, or non-compliant, with severity noted.'],
                ['title' => 'Edit plan', 'copy' => 'A prioritised list of proposed changes, each mapped to the guideline and source that justifies it.'],
                ['title' => 'Implemented edits', 'copy' => 'The approved changes made transparently, with edit summaries and talk-page notes where the guidelines require them.'],
                ['title' => 'Source refresh', 'copy' => 'Replaced dead links, upgraded weak citations, and archived references so the page holds up over time.'],
            ],
        ],

        'wikipedia-content-writing' => [
            'name'        => 'Content Writing & Research',
            'icon'        => 'i-search',
            'card'        => 'In-depth research and expert writing that meets Wikipedia’s strict editorial guidelines.',
            'eyebrow'     => 'Wikipedia Content Writing & Research',
            'h1'          => 'Research-first writing in a genuinely <span>encyclopedic</span> voice.',
            'lede'        => 'Wikipedia writing is a research discipline before it is a writing one. We locate and assess the coverage that exists, then write to what the sources actually support — no promotional framing, no unverifiable claims.',
            'meta_title'  => 'Wikipedia Content Writing & Research Services | Cited Copy',
            'meta_desc'   => 'Wikipedia content writing and research: independent source discovery, reliability grading, neutral drafting, and citation-complete copy.',
            'keywords'    => 'wikipedia content writing, wikipedia research services, wikipedia writers for hire, neutral point of view writing, wikipedia citation research, encyclopedic content writing',
            'og_image'    => 'assets/og/portfolio-entrepreneur.jpg',
            'includes'    => [
                'Systematic source discovery across news archives, books, journals, and databases',
                'Reliability and independence grading for every source found',
                'Neutral point-of-view drafting with balanced weight across topics',
                'Lead sections written to summarise the article, not to sell the subject',
                'Inline citations formatted to Wikipedia\'s reference templates',
                'Plagiarism and close-paraphrasing checks before delivery',
            ],
            'deliverables' => [
                ['title' => 'Research dossier', 'copy' => 'Every usable source, graded and annotated with what it can and cannot support.'],
                ['title' => 'Structured draft', 'copy' => 'Article copy organised into the sections readers and reviewers expect for the subject type.'],
                ['title' => 'Citation map', 'copy' => 'A statement-to-source index so any claim in the draft can be traced to its reference.'],
                ['title' => 'Coverage gap notes', 'copy' => 'A clear record of the claims that no reliable source currently supports, and what coverage would be needed.'],
            ],
        ],

        'wikipedia-page-management' => [
            'name'        => 'Ongoing Page Management',
            'icon'        => 'i-manage',
            'card'        => 'Updates, monitoring, and maintenance to keep your page accurate and up to date.',
            'eyebrow'     => 'Ongoing Wikipedia Page Management',
            'h1'          => 'Monitoring and maintenance that keeps a page <span>accurate.</span>',
            'lede'        => 'A published article is never finished. Anyone can edit it, facts go stale, and sources disappear. Ongoing management keeps the page current and catches problem edits before they settle in.',
            'meta_title'  => 'Wikipedia Page Management & Monitoring Services',
            'meta_desc'   => 'Ongoing Wikipedia page management: edit monitoring, vandalism response, milestone updates, dead-link repair, and accuracy reviews.',
            'keywords'    => 'wikipedia page management, wikipedia page monitoring, wikipedia maintenance services, wikipedia vandalism response, update wikipedia page, wikipedia page updates',
            'og_image'    => 'assets/og/portfolio-organisation.jpg',
            'includes'    => [
                'Watchlist monitoring with review of every incoming edit',
                'Assessment and appropriate response to vandalism or unsourced changes',
                'Scheduled updates for milestones, appointments, and new coverage',
                'Dead-link detection and archived-reference replacement',
                'Periodic accuracy and neutrality reviews of the full article',
                'Plain-language reporting on what changed and why',
            ],
            'deliverables' => [
                ['title' => 'Monitoring log', 'copy' => 'A running record of every edit made to the page, who made it, and how it was assessed.'],
                ['title' => 'Update cycles', 'copy' => 'Agreed refresh windows where new, properly sourced developments are added to the article.'],
                ['title' => 'Issue escalations', 'copy' => 'Fast notice when an edit, tag, or deletion discussion needs a decision from you.'],
                ['title' => 'Health reports', 'copy' => 'Periodic summaries of sourcing quality, dead links, tags, and overall article condition.'],
            ],
        ],

        'wikipedia-reputation-management' => [
            'name'        => 'Reputation & Entity Building',
            'icon'        => 'i-network',
            'card'        => 'Strengthen your brand’s digital footprint across credible knowledge platforms.',
            'eyebrow'     => 'Reputation & Entity Building',
            'h1'          => 'A consistent <span>entity</span> across the platforms that answer engines read.',
            'lede'        => 'Search engines and AI assistants build their understanding of a subject from structured, cross-referenced knowledge sources. Consistency across those sources is what makes an entity legible — and Wikipedia sits at the centre of it.',
            'meta_title'  => 'Wikipedia Reputation & Entity Building Services',
            'meta_desc'   => 'Entity and reputation building across Wikipedia and Wikidata: consistent naming, cross-referenced identifiers, and accurate structured data.',
            'keywords'    => 'wikipedia reputation management, entity building, wikidata services, knowledge panel optimisation, online reputation management, digital footprint wikipedia',
            'og_image'    => 'assets/og/portfolio-public-figure.jpg',
            'includes'    => [
                'Entity audit across Wikipedia, Wikidata, and other knowledge sources',
                'Consistent naming, descriptions, and identifiers across platforms',
                'Wikidata statement and identifier maintenance with proper references',
                'Alignment between your owned properties and third-party knowledge records',
                'Correction of factual errors in structured data records',
                'Guidance on the independent coverage that would strengthen the entity',
            ],
            'deliverables' => [
                ['title' => 'Entity map', 'copy' => 'Every place the subject currently appears as a structured record, and how those records disagree.'],
                ['title' => 'Consistency fixes', 'copy' => 'Corrected names, dates, roles, and descriptions so the same facts appear everywhere.'],
                ['title' => 'Wikidata work', 'copy' => 'Properly referenced statements and external identifiers linking the entity across databases.'],
                ['title' => 'Coverage roadmap', 'copy' => 'An honest assessment of what independent coverage is missing, and the realistic path to earning it.'],
            ],
        ],
    ];
}

/**
 * The five-step editorial process, shared by the home page and /our-process/.
 *
 * @return array<int, array<string, string>>
 */
function process_steps(): array
{
    return [
        [
            'icon'  => 'i-research',
            'title' => 'Research',
            'card'  => 'We conduct in-depth research and assess notability.',
            'copy'  => 'We start by searching for independent coverage of the subject across news archives, books, journals, and databases. That search decides everything that follows: if the coverage is not there, no amount of writing will carry an article through review, and we say so before any work is commissioned.',
        ],
        [
            'icon'  => 'i-plan',
            'title' => 'Planning',
            'card'  => 'We plan the content strategy and gather reliable sources.',
            'copy'  => 'Usable sources are graded for independence, reliability, and depth, then mapped to the sections they can support. You see the outline and the source list before drafting begins, so the scope of the article is agreed up front.',
        ],
        [
            'icon'  => 'i-write',
            'title' => 'Writing',
            'card'  => 'Our editors write and structure content as per guidelines.',
            'copy'  => 'Drafting follows Wikipedia\'s neutral point of view: claims are attributed, weight is balanced across topics, and promotional framing is left out. Every substantive statement carries an inline citation to the source that supports it.',
        ],
        [
            'icon'  => 'i-review',
            'title' => 'Review',
            'card'  => 'Rigorous editorial review ensures accuracy and quality.',
            'copy'  => 'A second editor checks the draft against the sources line by line, looking for unsupported claims, close paraphrasing, tone problems, and structural gaps. Anything that cannot be verified is cut or flagged.',
        ],
        [
            'icon'  => 'i-publish',
            'title' => 'Publishing',
            'card'  => 'We publish and monitor for long-term success.',
            'copy'  => 'Submission is handled transparently, with conflict-of-interest disclosure where the guidelines require it. Reviewer feedback is addressed on its merits, and the page is monitored through its first stabilisation period after acceptance.',
        ],
    ];
}

/**
 * Portfolio categories. Deliberately anonymised — client work is confidential.
 *
 * @return array<int, array<string, string>>
 */
function portfolio_items(): array
{
    return [
        [
            'image' => 'assets/portfolio-business-leader.jpg',
            'alt'   => 'Business leader editorial portrait',
            'title' => 'Business Leader',
            'copy'  => 'A new article for a senior executive, built from sustained independent business-press coverage.',
        ],
        [
            'image' => 'assets/portfolio-author.jpg',
            'alt'   => 'Author editorial portrait',
            'title' => 'Author',
            'copy'  => 'A published author\'s page, sourced from reviews in independent literary and national press.',
        ],
        [
            'image' => 'assets/portfolio-organisation.jpg',
            'alt'   => 'Organisation headquarters',
            'title' => 'Organisation',
            'copy'  => 'An organisational article expanded with history, structure, and independently reported milestones.',
        ],
        [
            'image' => 'assets/portfolio-entrepreneur.jpg',
            'alt'   => 'Entrepreneur editorial portrait',
            'title' => 'Entrepreneur',
            'copy'  => 'A founder\'s page rewritten to a neutral voice after removal of promotional material.',
        ],
        [
            'image' => 'assets/portfolio-public-figure.jpg',
            'alt'   => 'Public figure speaking at an event',
            'title' => 'Public Figure',
            'copy'  => 'A public figure\'s article maintained through a period of heavy news coverage.',
        ],
    ];
}

/**
 * Client testimonials. Mirrored in script.js for the home-page carousel; this
 * copy is what renders server-side so the words are always in the HTML source.
 *
 * @return array<int, array<string, string>>
 */
function testimonials(): array
{
    return [
        [
            'quote' => 'The Wikipedia Studio delivered beyond my expectations. Their professionalism, attention to detail, and knowledge of Wikipedia guidelines are truly commendable.',
            'name'  => 'Dr. Sarah Mitchell',
            'role'  => 'Author & Speaker',
        ],
        [
            'quote' => 'Their research-first approach made the entire process clear. Every source was assessed carefully, and the finished page felt balanced and authoritative.',
            'name'  => 'Daniel Mercer',
            'role'  => 'Business Leader',
        ],
        [
            'quote' => 'We valued the transparent communication and thoughtful editorial guidance. The team understood both our history and Wikipedia’s standards.',
            'name'  => 'Elena Brooks',
            'role'  => 'Communications Director',
        ],
    ];
}

/**
 * Frequently asked questions. Rendered on /faq/ and used to build the FAQPage
 * structured data, so the schema and the visible answers never drift apart.
 *
 * @return array<int, array<string, string>>
 */
function faqs(): array
{
    return [
        [
            'q' => 'How long does it take to get a Wikipedia page published?',
            'a' => 'Timelines depend on research depth, source quality, and the subject\'s readiness. Drafting typically takes a few weeks; the review queue that follows is controlled by volunteer reviewers, not by us. A clear assessment at the start gives the most reliable estimate.',
        ],
        [
            'q' => 'Do you guarantee page approval?',
            'a' => 'No ethical editor can guarantee approval. Wikipedia is maintained by independent volunteers, and no agency controls their decisions. We focus on notability, reliable sourcing, neutral writing, and full compliance with editorial standards — the factors that actually determine outcomes.',
        ],
        [
            'q' => 'What information do you need to get started?',
            'a' => 'A biography or company profile, key milestones with dates, links to independent media coverage, and any existing Wikipedia or Wikidata link. Independent coverage matters most: press releases and self-published material cannot establish notability.',
        ],
        [
            'q' => 'Can you help improve an existing Wikipedia page?',
            'a' => 'Yes. We review structure, sourcing, tone, coverage gaps, and maintenance needs, then propose an edit plan where each change is tied to a guideline and a source. Edits are made transparently, with talk-page disclosure where the guidelines require it.',
        ],
        [
            'q' => 'Do you offer ongoing page maintenance?',
            'a' => 'Yes. Ongoing support can include watchlist monitoring, source updates, content improvements, dead-link repair, and assessment of problem edits, with regular reporting on what changed.',
        ],
        [
            'q' => 'Is paid Wikipedia editing allowed?',
            'a' => 'Paid editing is permitted provided it is disclosed. Wikipedia\'s terms of use require paid contributors to declare their employer, client, and affiliation, and we make that disclosure as a matter of course rather than editing covertly.',
        ],
        [
            'q' => 'What makes a subject notable enough for Wikipedia?',
            'a' => 'Notability comes from significant coverage in multiple reliable sources that are independent of the subject. Revenue, follower counts, and industry awards do not substitute for that coverage. Where it is missing, we say so before any work begins.',
        ],
        [
            'q' => 'Do you work with clients outside the United States?',
            'a' => 'Yes. We work with individuals, businesses, and organisations worldwide, including on non-English Wikipedia editions where reliable sources exist in the relevant language.',
        ],
    ];
}

/**
 * Headline metrics for the hero rail.
 *
 * @return array<int, array<string, string>>
 */
function metrics(): array
{
    return [
        ['icon' => 'i-page',     'value' => '500+',   'label' => 'Pages Created'],
        ['icon' => 'i-shield',   'value' => '100%',   'label' => 'Editorial Standards'],
        ['icon' => 'i-users',    'value' => 'Expert', 'label' => 'Wikipedia Editors'],
        ['icon' => 'i-globe',    'value' => 'Global', 'label' => 'Global Clientele'],
        ['icon' => 'i-building', 'value' => '10+',    'label' => 'Industries Served'],
    ];
}

/**
 * Every indexable URL, in sitemap priority order.
 *
 * @return array<int, array{slug: string, priority: string, changefreq: string}>
 */
function sitemap_routes(): array
{
    $routes = [
        ['slug' => '',             'priority' => '1.0', 'changefreq' => 'weekly'],
        ['slug' => 'services',     'priority' => '0.9', 'changefreq' => 'monthly'],
        ['slug' => 'about-us',     'priority' => '0.8', 'changefreq' => 'monthly'],
        ['slug' => 'our-process',  'priority' => '0.8', 'changefreq' => 'monthly'],
        ['slug' => 'portfolio',    'priority' => '0.7', 'changefreq' => 'monthly'],
        ['slug' => 'faq',          'priority' => '0.7', 'changefreq' => 'monthly'],
        ['slug' => 'contact',      'priority' => '0.9', 'changefreq' => 'yearly'],
    ];

    foreach (array_keys(services()) as $slug) {
        $routes[] = ['slug' => 'services/' . $slug, 'priority' => '0.8', 'changefreq' => 'monthly'];
    }

    $routes[] = ['slug' => 'privacy-policy',    'priority' => '0.3', 'changefreq' => 'yearly'];
    $routes[] = ['slug' => 'terms-conditions',  'priority' => '0.3', 'changefreq' => 'yearly'];

    return $routes;
}
