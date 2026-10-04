"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Clickable topic chips for the blog index. Children are server-rendered:
 * the default paginated index (`.bl-default`) plus every post wrapped in
 * `.bl-filter-item[data-topic]` inside `.bl-filtered`. "All" shows the default
 * index (what crawlers see); a topic shows only that topic's posts.
 */
export function BlogTopicFilter({
  topics,
  children,
}: {
  topics: Array<{ name: string; count: number }>;
  children: ReactNode;
}) {
  const [topic, setTopic] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Show/hide the pre-rendered cards; no re-render of the cards themselves.
  useEffect(() => {
    rootRef.current?.querySelectorAll<HTMLElement>(".bl-filter-item").forEach((item) => {
      item.hidden = topic !== null && item.dataset.topic !== topic;
    });
  }, [topic]);

  return (
    <div className="bl-filter" ref={rootRef} data-filtered={topic ? "true" : "false"}>
      <div className="bl-topics" role="group" aria-label="Filter guides by topic">
        <button
          type="button"
          className="bl-topic"
          aria-pressed={topic === null}
          onClick={() => setTopic(null)}
        >
          All
        </button>
        {topics.map((item) => (
          <button
            key={item.name}
            type="button"
            className="bl-topic"
            aria-pressed={topic === item.name}
            onClick={() => setTopic(topic === item.name ? null : item.name)}
          >
            {item.name}
            <span className="bl-topic-count">{item.count}</span>
          </button>
        ))}
      </div>
      <p className="bl-filter-status" aria-live="polite">
        {topic ? `Showing ${topics.find((t) => t.name === topic)?.count ?? 0} guides on ${topic}` : ""}
      </p>
      {children}
    </div>
  );
}
