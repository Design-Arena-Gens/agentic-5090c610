"use client";

import { useMemo, useState } from "react";
import { filters, ideas, vibes } from "../lib/ideas";

const formatDayLabel = (day) => {
  const prefixes = [
    "Jour 1",
    "Jour 2",
    "Jour 3",
    "Jour 4",
    "Jour 5",
    "Jour 6",
    "Jour 7",
    "Jour 8",
    "Jour 9",
    "Jour 10",
    "Jour 11",
    "Jour 12",
    "Jour 13",
    "Jour 14",
    "Jour 15",
    "Jour 16",
    "Jour 17",
    "Jour 18",
    "Jour 19",
    "Jour 20",
    "Jour 21",
    "Jour 22",
    "Jour 23",
    "Jour 24",
    "Jour 25",
    "Jour 26",
    "Jour 27",
    "Jour 28",
    "Jour 29",
    "Jour 30"
  ];
  return prefixes[day - 1] || `Jour ${day}`;
};

const chunkIdeas = (list, size) => {
  const chunks = [];
  for (let i = 0; i < list.length; i += size) {
    chunks.push(list.slice(i, i + size));
  }
  return chunks;
};

export default function Page() {
  const [audienceFilter, setAudienceFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [vibeFilter, setVibeFilter] = useState("all");

  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      const matchAudience =
        audienceFilter === "all" ? true : idea.audience === audienceFilter;
      const matchVibe = vibeFilter === "all" ? true : idea.vibe === vibeFilter;
      const normalizedSearch = search.trim().toLowerCase();
      const matchSearch =
        normalizedSearch.length === 0
          ? true
          : [
              idea.title,
              idea.hook,
              idea.storyline,
              idea.aiPrompt,
              idea.monetization,
              idea.hashtags.join(" ")
            ]
              .join(" ")
              .toLowerCase()
              .includes(normalizedSearch);
      return matchAudience && matchVibe && matchSearch;
    });
  }, [audienceFilter, vibeFilter, search]);

  const weeklyChunks = useMemo(() => chunkIdeas(filteredIdeas, 7), [filteredIdeas]);

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="badge">Planificateur IA · Reels & TikTok</p>
          <h1>
            30 jours d&apos;idées virales
            <span> pour audiences jeunes et seniors innocentes</span>
          </h1>
          <p className="intro">
            Utilise ce calendrier pour poster quotidiennement des vidéos générées par IA.
            Chaque idée inclut un hook, un plan de réalisation, un prompt prêt à copier et
            une stratégie de monétisation adaptée.
          </p>
        </div>
        <div className="quick-stats">
          <div>
            <strong>30</strong>
            <span>idées prêtes à tourner</span>
          </div>
          <div>
            <strong>2</strong>
            <span>segments d&apos;audience ciblés</span>
          </div>
          <div>
            <strong>30 s</strong>
            <span>temps moyen par script</span>
          </div>
        </div>
      </section>

      <section className="filters">
        <div className="filter-group">
          {filters.map((item) => (
            <button
              key={item.id}
              className={item.id === audienceFilter ? "pill is-active" : "pill"}
              onClick={() => setAudienceFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="filter-inputs">
          <select
            className="select"
            value={vibeFilter}
            onChange={(event) => setVibeFilter(event.target.value)}
          >
            <option value="all">Toutes les vibes</option>
            {vibes.map((vibe) => (
              <option key={vibe} value={vibe}>
                {vibe}
              </option>
            ))}
          </select>
          <input
            type="search"
            placeholder="Cherche un thème, un hook, une stratégie..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="search"
          />
        </div>
      </section>

      <section className="calendar">
        {weeklyChunks.length === 0 ? (
          <div className="empty">
            <p>
              Pas d&apos;idée correspondant à ces filtres pour le moment. Essaie de
              réinitialiser ta recherche.
            </p>
          </div>
        ) : (
          weeklyChunks.map((weekIdeas, index) => (
            <div key={index} className="week-section">
              <h2>Semaine {index + 1}</h2>
              <div className="grid">
                {weekIdeas.map((idea) => (
                  <article key={idea.id} className="card">
                    <header className="card-header">
                      <span className="day-label">{formatDayLabel(idea.day)}</span>
                      <div className="tags">
                        <span className={`tag audience-${idea.audience}`}>
                          {idea.audience === "jeune"
                            ? "Jeune"
                            : idea.audience === "age"
                            ? "Âgé"
                            : "Mixte"}
                        </span>
                        <span className="tag">{idea.vibe}</span>
                      </div>
                      <h3>{idea.title}</h3>
                    </header>
                    <p className="hook">🎬 Hook : {idea.hook}</p>
                    <div className="block">
                      <h4>Storyboard express</h4>
                      <p>{idea.storyline}</p>
                    </div>
                    <div className="block">
                      <h4>Prompt IA prêt à copier</h4>
                      <p className="prompt">{idea.aiPrompt}</p>
                    </div>
                    <div className="block">
                      <h4>Monétisation</h4>
                      <p>{idea.monetization}</p>
                    </div>
                    <div className="hashtags">
                      {idea.hashtags.map((tag) => (
                        <span key={tag} className="hash">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
