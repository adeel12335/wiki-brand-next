import type { BlogPost } from "@/types";
import { moreBlogPosts } from "./blog-posts-more";

/**
 * Editorial posts grounded in Wikipedia policy pages and common client questions.
 * Bodies are trusted site HTML (not user input).
 */
const coreBlogPosts: BlogPost[] = [
  {
    slug: "wikipedia-notability-requirements-explained",
    title: "Wikipedia Notability Requirements, Explained Without the Myths",
    metaTitle: "Wikipedia Notability Requirements Explained (2026 Guide)",
    metaDescription:
      "What Wikipedia notability actually requires: significant coverage in reliable, independent sources — and which press clips do not count.",
    keywords:
      "wikipedia notability requirements, general notability guideline, significant coverage wikipedia, independent sources wikipedia",
    excerpt:
      "Notability is not fame, follower count, or a polished bio. It is a sourcing test. Here is how reviewers actually apply it.",
    category: "Eligibility",
    publishedAt: "2026-08-12",
    modifiedAt: "2026-09-03",
    readingMinutes: 8,
    ogImage: "/assets/og/reference-dark.jpg",
    relatedService: "wikipedia-page-creation",
    body: `
<p>Most people who ask for a Wikipedia page start in the wrong place. They draft a biography, polish a company history, or gather testimonials. Reviewers start somewhere else: the sources.</p>
<p>Wikipedia’s <a href="https://en.wikipedia.org/wiki/Wikipedia:Notability" target="_blank" rel="noopener noreferrer">general notability guideline</a> asks a narrow question. Has the subject received <em>significant coverage</em> in <em>reliable</em> sources that are <em>independent</em> of the subject? Every word in that sentence does work. Skip any one of them and the draft usually fails, no matter how carefully it is written.</p>

<h2>Significant coverage is not a mention</h2>
<p>A name in a list, a quote in someone else’s profile, or a one-line award note is not enough. Significant coverage means the source spends real attention on the subject — typically multiple paragraphs that discuss who they are, what they did, or why it mattered.</p>
<p>Trade directories, conference speaker pages, and “top 40 under 40” roundups often look impressive in a pitch deck. On Wikipedia they rarely clear the bar unless the write-up itself is substantial and independent.</p>

<h2>Independence rules out your own material</h2>
<p>Your website, press releases, sponsored features, and company blogs do not establish notability. They can sometimes support basic facts later, but they do not prove the world has noticed the subject on its own terms. Wikipedia’s guidance on <a href="https://en.wikipedia.org/wiki/Wikipedia:Independent_sources" target="_blank" rel="noopener noreferrer">independent sources</a> is blunt about this for a reason: the encyclopedia summarizes what others have already published, not what a subject wants published.</p>

<h2>Reliability is about editorial control</h2>
<p>Major newspapers, established magazines, academic presses, and serious trade journals with identifiable editors usually qualify. Personal blogs, social posts, most podcasts without strong editorial process, and user-edited sites usually do not. Borderline outlets exist; when they do, reviewers look at reputation, corrections policy, and whether the piece shows original reporting.</p>

<h2>Subject-specific guidelines sit on top of the GNG</h2>
<p>Academics, athletes, companies, and creative professionals have additional notability essays. Those guides refine the test. They do not replace the need for solid secondary coverage. A company that fails the general test will not be saved by a clever reading of the corporate notability page.</p>

<h2>What a useful notability assessment looks like</h2>
<p>Before anyone opens the editor, list the strongest independent pieces you can find. For each source, note the outlet, date, depth, and whether the subject is the focus. If you cannot name several substantial pieces, the honest answer is to wait — or to strengthen real-world coverage first — rather than force a draft into the review queue.</p>
<p>That early verdict is the difference between a durable article and months of declines. If you want a structured read on your own source pile, our <a href="/services/wikipedia-page-creation/">Wikipedia page creation</a> work begins with that assessment, not with a promise of publication.</p>
`,
  },
  {
    slug: "how-long-does-it-take-to-create-a-wikipedia-page",
    title: "How Long Does It Take to Create a Wikipedia Page?",
    metaTitle: "How Long Does It Take to Create a Wikipedia Page?",
    metaDescription:
      "Realistic timelines for Wikipedia page creation: research and drafting vs Articles for Creation review backlog, and what actually speeds things up.",
    keywords:
      "how long wikipedia page creation, wikipedia articles for creation timeline, AfC backlog, wikipedia review time",
    excerpt:
      "Drafting can take weeks. Volunteer review can take months. Here is what controls the clock — and what does not.",
    category: "Process",
    publishedAt: "2026-08-18",
    modifiedAt: "2026-09-03",
    readingMinutes: 7,
    ogImage: "/assets/og/globe.jpg",
    relatedService: "wikipedia-page-creation",
    body: `
<p>Clients often ask for a date. Wikipedia does not work on delivery calendars the way a website launch does. The work splits into two clocks: the editorial clock you can manage, and the volunteer review clock you cannot.</p>

<h2>The part you can plan: research and drafting</h2>
<p>When the sources already exist, a careful draft usually takes a few weeks. That window covers source evaluation, outline, neutral writing, citation checking, and an internal review pass for promotional language. Thin sourcing stretches the timeline because the honest response is often “not yet,” not “write harder.”</p>
<p>Rushing this stage is a false economy. A weak draft that enters review early tends to come back declined, then waits again after revision.</p>

<h2>The part you cannot control: Articles for Creation</h2>
<p>Most new accounts and many paid contributors use the <a href="https://en.wikipedia.org/wiki/Wikipedia:Articles_for_creation" target="_blank" rel="noopener noreferrer">Articles for Creation</a> process. Drafts sit in a queue reviewed by volunteers. Waiting periods of several months are common when the backlog is large, and submissions are not guaranteed to be reviewed in neat chronological order.</p>
<p>Nobody can sell a guaranteed early review. Offers that claim otherwise are either misleading or violating community norms.</p>

<h2>What actually improves the odds</h2>
<ul>
<li><strong>Clear notability on the page.</strong> Reviewers should see independent secondary sources without hunting.</li>
<li><strong>Neutral tone.</strong> Adjectives that sell trigger declines faster than almost anything else.</li>
<li><strong>Complete citations.</strong> Dead links, missing publishers, and mismatched claims burn time.</li>
<li><strong>Continued polishing after submission.</strong> A pending draft can still be improved while it waits.</li>
</ul>

<h2>After acceptance</h2>
<p>Publication is not the finish line. Early weeks matter: watchlist monitoring, talk-page questions, and routine cleanup. That is why many engagements include a short stabilisation period after the move to article space.</p>
<p>If you need a realistic estimate for a specific subject, start with source strength. Our process page walks through the five stages we use before anyone talks about submission timing: <a href="/our-process/">our editorial process</a>.</p>
`,
  },
  {
    slug: "paid-wikipedia-editing-disclosure-and-coi",
    title: "Paid Wikipedia Editing: Disclosure, COI, and What Gets People Banned",
    metaTitle: "Paid Wikipedia Editing Disclosure & COI Rules Explained",
    metaDescription:
      "How paid Wikipedia editing must be disclosed under Wikimedia Terms of Use, what conflict of interest means in practice, and why secrecy backfires.",
    keywords:
      "paid wikipedia editing disclosure, wikipedia conflict of interest, WP:PAID, wikipedia COI guidelines",
    excerpt:
      "Paid editing is allowed when it is disclosed. Undisclosed advocacy is what burns accounts, agencies, and sometimes the client’s reputation too.",
    category: "Compliance",
    publishedAt: "2026-08-22",
    modifiedAt: "2026-09-03",
    readingMinutes: 9,
    ogImage: "/assets/og/hero-orbital-globe.jpg",
    relatedService: "wikipedia-page-editing",
    body: `
<p>People hear “paid editing” and assume the practice itself is forbidden. That is not what the rules say. The hard line is secrecy. Wikimedia’s Terms of Use require paid contributors to disclose employer, client, and affiliation. English Wikipedia’s conflict-of-interest guidance builds on that requirement.</p>

<h2>What disclosure looks like in practice</h2>
<p>Paid editors are expected to declare the relationship on their user page, on relevant article talk pages, and in edit summaries where paid work happens. Templates such as connected-contributor notices exist so other editors can see the relationship without guessing.</p>
<p>If your agency refuses to disclose, that is not a clever workaround. It is a Terms of Use problem waiting to surface — often publicly.</p>

<h2>Conflict of interest is about incentives, not just paycheques</h2>
<p>A company’s founder, a PR lead, or a subject’s family member has a conflict even when no invoice is involved. The recommended path is the same: propose changes on the talk page with sources, rather than rewriting the article in promotional voice. Living-person policy still allows obvious error fixes, but “obvious” is narrower than most subjects hope.</p>

<h2>Why undisclosed advocacy keeps making headlines</h2>
<p>When sockpuppets or undeclared paid accounts are uncovered, the cleanup is rarely quiet. Blocks follow. Articles get scrutinised. Clients sometimes receive press coverage they never wanted. The Wikimedia Foundation has been clear for years that paying someone who will not disclose is a bad bargain.</p>

<h2>What ethical paid work still cannot do</h2>
<ul>
<li>Guarantee acceptance or permanent protection from deletion.</li>
<li>Remove well-sourced critical material because it is inconvenient.</li>
<li>Insert claims that independent sources do not support.</li>
<li>Buy a favourable review in the AfC queue.</li>
</ul>

<h2>A practical client checklist</h2>
<p>Ask any firm three questions before you hire them: Will you disclose? Will you show the sources that establish notability before drafting? Will you refuse work that requires promotional framing? If the answers are soft, keep looking.</p>
<p>We treat disclosure as non-negotiable in <a href="/services/wikipedia-page-editing/">page editing</a> and creation work. Transparency is slower than stealth. It is also the only approach that survives contact with experienced reviewers.</p>
`,
  },
  {
    slug: "why-wikipedia-pages-get-deleted",
    title: "Why Wikipedia Pages Get Deleted (And How to Avoid the Usual Traps)",
    metaTitle: "Why Wikipedia Pages Get Deleted — Common Causes",
    metaDescription:
      "The most common reasons Wikipedia articles and drafts are deleted or declined: weak notability, promotional tone, COI issues, and thin sourcing.",
    keywords:
      "why wikipedia pages get deleted, wikipedia article deletion, promotional wikipedia page, AfC declined",
    excerpt:
      "Deletion is rarely mysterious. Most failed pages share the same handful of problems — and they are visible before the first draft is filed.",
    category: "Risk",
    publishedAt: "2026-08-26",
    modifiedAt: "2026-09-03",
    readingMinutes: 8,
    ogImage: "/assets/og/portfolio-public-figure.jpg",
    relatedService: "wikipedia-reputation-management",
    body: `
<p>When a page disappears, subjects often assume politics or sabotage. Sometimes disputes are real. Far more often, the article never met the bar that Wikipedia uses for every other topic.</p>

<h2>1. Notability was assumed, not evidenced</h2>
<p>Awards, revenue, follower counts, and “first in the region” claims do not substitute for independent secondary coverage. If the best sources are press releases and partner blogs, deletion discussions tend to end quickly.</p>

<h2>2. The tone reads like a brochure</h2>
<p>Words such as leading, visionary, renowned, and cutting-edge are red flags unless an independent source used them and you are attributing that source. Wikipedia summarises; it does not endorse. Promotional voice is one of the fastest paths to a decline at Articles for Creation and to maintenance tags after publication.</p>

<h2>3. Citations do not match the claims</h2>
<p>A dense reference list impresses nobody if the links are dead, point to unrelated pages, or support only a fraction of what the prose asserts. Reviewers check. So do deletion nominators.</p>

<h2>4. Conflict of interest was handled badly</h2>
<p>Undeclared paid editing, sockpuppets, and aggressive self-editing invite scrutiny that ordinary weak drafts do not. Even a salvageable topic can be damaged by the account history attached to it.</p>

<h2>5. The subject was notable once, then the sourcing aged out</h2>
<p>Long-standing articles can still face challenges if coverage was always thin or if the page drifted into original research and résumé padding. Maintenance is not optional for subjects who remain in public view.</p>

<h2>Prevention beats recovery</h2>
<p>The cheapest fix is the earliest one: a sober source audit before drafting. If publication already happened and the page is unstable, the work shifts to sourcing, neutrality, and talk-page process rather than quiet rewrites.</p>
<p>For subjects dealing with tags, disputes, or reputation-sensitive coverage, see our notes on <a href="/services/wikipedia-reputation-management/">reputation and entity work</a> — still within policy, still disclosed.</p>
`,
  },
  {
    slug: "reliable-sources-for-wikipedia-articles",
    title: "Reliable Sources for Wikipedia: What Counts and What Never Will",
    metaTitle: "Reliable Sources for Wikipedia Articles (Practical Guide)",
    metaDescription:
      "A practical guide to Wikipedia reliable sources: newspapers, journals, and books that help — plus press releases, blogs, and directories that do not.",
    keywords:
      "reliable sources wikipedia, wikipedia citations, press release wikipedia, secondary sources wikipedia",
    excerpt:
      "Not every link with a logo is a usable source. This is the sorting method we use before a single sentence gets drafted.",
    category: "Research",
    publishedAt: "2026-08-30",
    modifiedAt: "2026-09-03",
    readingMinutes: 8,
    ogImage: "/assets/og/reference-dark.jpg",
    relatedService: "wikipedia-content-writing",
    body: `
<p>Wikipedia’s content policies rest on three pillars that keep colliding in client conversations: verifiability, no original research, and neutral point of view. All three depend on sources. Get the sources wrong and elegant prose will not save the page.</p>

<h2>Secondary sources do the heavy lifting</h2>
<p>Secondary sources analyse, summarise, or contextualise a topic. A newspaper profile, a scholarly overview, or a serious magazine feature usually sits in this category. Primary sources — filings, interviews, the subject’s own site — can support uncontroversial facts, but they rarely establish notability on their own.</p>

<h2>A working hierarchy for most biographies and companies</h2>
<ul>
<li><strong>Usually strong:</strong> major newspapers, established magazines, academic journals, books from recognised publishers, serious trade press with editorial staff.</li>
<li><strong>Handle carefully:</strong> local outlets with uneven standards, industry blogs with light editing, interview pieces that mostly quote the subject.</li>
<li><strong>Usually weak for notability:</strong> press releases, wire reprints of releases, company blogs, sponsored “newsroom” features, most social media, crowdfunding pages, Wikipedia mirrors.</li>
</ul>

<h2>Independence is easy to misunderstand</h2>
<p>A glowing article still fails the independence test if the subject paid for it, dictated it, or published it. Wikipedia’s pages on <a href="https://en.wikipedia.org/wiki/Wikipedia:Reliable_sources" target="_blank" rel="noopener noreferrer">reliable sources</a> and independent sources are worth reading in full before you build a citation list around marketing assets.</p>

<h2>How we stress-test a source pile</h2>
<p>For each candidate piece, ask: Who wrote it? Who edited it? Was the subject the focus? Does the outlet correct errors? Is there a financial relationship? If you cannot answer those questions, do not hang an article on that link.</p>
<p>Good research is slower than dumping every Google result into a draft. It is also the only way <a href="/services/wikipedia-content-writing/">Wikipedia content writing</a> stays stable after publication.</p>
`,
  },
  {
    slug: "how-to-improve-an-existing-wikipedia-page",
    title: "How to Improve an Existing Wikipedia Page Without Making It Worse",
    metaTitle: "How to Improve an Existing Wikipedia Page (Policy-Safe)",
    metaDescription:
      "How to fix tags, sourcing gaps, and outdated sections on an existing Wikipedia article — using talk-page process and reliable sources.",
    keywords:
      "improve wikipedia page, edit existing wikipedia article, wikipedia maintenance tags, wikipedia talk page edit request",
    excerpt:
      "Existing articles fail in quieter ways: tags, dead links, promotional drift, and missing milestones. Here is a repair order that respects the rules.",
    category: "Editing",
    publishedAt: "2026-09-01",
    modifiedAt: "2026-09-03",
    readingMinutes: 7,
    ogImage: "/assets/og/globe.jpg",
    relatedService: "wikipedia-page-editing",
    body: `
<p>Improving a live article is different from creating one. The page already has watchers, history, and expectations. Large unexplained rewrites — especially by new or undeclared accounts — draw attention fast.</p>

<h2>Start with a diagnosis, not a redesign</h2>
<p>Read the talk page, the page history, and every maintenance tag at the top. Tags are not decoration. Each one points to a specific problem: tone, sourcing, autobiography, notability, or outdated information. Fix the cause; do not delete the banner and hope nobody notices.</p>

<h2>A practical repair order</h2>
<ol>
<li><strong>Correct clear factual errors</strong> with citations already accepted on similar articles.</li>
<li><strong>Replace dead or weak references</strong> before expanding new sections.</li>
<li><strong>Trim promotional language</strong> even when the subject dislikes a flatter tone.</li>
<li><strong>Add milestones only when independent sources cover them</strong> — not because the subject announced them.</li>
<li><strong>Leave disputed or sensitive biography material</strong> to careful, well-sourced edits that follow living-person policy.</li>
</ol>

<h2>When you have a conflict of interest</h2>
<p>Do not “quietly improve” your own article. Disclose and use the talk page. Edit requests that arrive with proposed text and reliable sources are far more likely to be taken seriously than vague complaints that the page is unfair.</p>

<h2>What ongoing management is for</h2>
<p>Public subjects attract drive-by edits, vandalism, and well-meant but unsourced additions. A watchlist routine catches problems while they are small. Waiting six months turns a one-line fix into a sourcing project.</p>
<p>If you need a structured audit of an existing article, our <a href="/services/wikipedia-page-editing/">editing service</a> and <a href="/services/wikipedia-page-management/">page management</a> work both start from the live page as it stands — tags, history, and all — not from a marketing brief.</p>
`,
  },
];

export const blogPosts: BlogPost[] = [...coreBlogPosts, ...moreBlogPosts];
