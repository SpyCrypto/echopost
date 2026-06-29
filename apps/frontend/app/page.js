'use client';

import { useMemo, useState } from 'react';

const channels = [
  { name: 'Medium', status: 'Connected', reach: '18.4k', accent: '#2f7f6f' },
  { name: 'LinkedIn', status: 'Connected', reach: '9.8k', accent: '#315f9f' },
  { name: 'X', status: 'Needs review', reach: '31.6k', accent: '#262b35' },
  { name: 'Notion', status: 'Draft sync', reach: 'Team', accent: '#8a683d' },
];

const posts = [
  {
    title: 'Midnight launch notes',
    channel: 'Medium + LinkedIn',
    state: 'Scheduled',
    time: 'Today, 16:30',
    score: '86',
  },
  {
    title: 'Privacy-first publishing checklist',
    channel: 'X thread',
    state: 'Draft',
    time: 'Tomorrow, 09:15',
    score: '72',
  },
  {
    title: 'Community build recap',
    channel: 'Devpost',
    state: 'Review',
    time: 'Fri, 11:00',
    score: '91',
  },
];

const activity = [
  'Credential vault rotated for LinkedIn',
  'Medium import completed with 14 assets',
  'Draft policy flagged 2 disclosure checks',
  'Notion workspace sync started',
];

const filters = ['Overview', 'Queue', 'Accounts'];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('Overview');
  const [selectedPost, setSelectedPost] = useState(posts[0].title);

  const visiblePosts = useMemo(() => {
    if (activeFilter === 'Accounts') {
      return posts.filter((post) => post.channel.includes('LinkedIn') || post.channel.includes('X'));
    }

    if (activeFilter === 'Queue') {
      return posts.filter((post) => post.state !== 'Draft');
    }

    return posts;
  }, [activeFilter]);

  return (
    <main className="dashboard-shell">
      <aside className="sidebar" aria-label="Dashboard navigation">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">EP</div>
          <div>
            <p className="eyebrow">EchoPost</p>
            <h1>Creator Console</h1>
          </div>
        </div>

        <nav className="nav-stack" aria-label="Primary">
          {['Dashboard', 'Publishing', 'Accounts', 'Vault', 'Analytics'].map((item) => (
            <button className={item === 'Dashboard' ? 'nav-item active' : 'nav-item'} key={item}>
              <span aria-hidden="true" />
              {item}
            </button>
          ))}
        </nav>

        <section className="security-panel">
          <p className="eyebrow">Midnight Guard</p>
          <strong>Credentials encrypted</strong>
          <span>4 accounts protected with scheduled key rotation.</span>
        </section>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Publishing dashboard</p>
            <h2>Plan, review, and publish from one private command center.</h2>
          </div>
          <button className="primary-action" type="button">New post</button>
        </header>

        <section className="metric-grid" aria-label="Publishing summary">
          {[
            ['Queued posts', '12', '+3 this week'],
            ['Connected reach', '59.8k', 'Across 4 channels'],
            ['Privacy checks', '47', '2 need attention'],
            ['Success rate', '94.6%', 'Last 30 days'],
          ].map(([label, value, note]) => (
            <article className="metric-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </article>
          ))}
        </section>

        <div className="content-grid">
          <section className="panel large-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Publishing queue</p>
                <h3>Upcoming work</h3>
              </div>
              <div className="segmented-control" role="tablist" aria-label="Queue filters">
                {filters.map((filter) => (
                  <button
                    aria-selected={activeFilter === filter}
                    className={activeFilter === filter ? 'selected' : ''}
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    role="tab"
                    type="button"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="post-list">
              {visiblePosts.map((post) => (
                <button
                  className={selectedPost === post.title ? 'post-row selected' : 'post-row'}
                  key={post.title}
                  onClick={() => setSelectedPost(post.title)}
                  type="button"
                >
                  <span className="status-dot" aria-hidden="true" />
                  <span>
                    <strong>{post.title}</strong>
                    <small>{post.channel}</small>
                  </span>
                  <span className="post-state">{post.state}</span>
                  <span className="post-time">{post.time}</span>
                  <span className="score">{post.score}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="panel calendar-panel">
            <p className="eyebrow">Today</p>
            <h3>Focus window</h3>
            <div className="timeline">
              <span>09:15</span>
              <div>
                <strong>Review thread hook</strong>
                <small>X draft needs disclosure copy</small>
              </div>
              <span>16:30</span>
              <div>
                <strong>Ship launch notes</strong>
                <small>Medium and LinkedIn bundle</small>
              </div>
            </div>
          </section>

          <section className="panel channel-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Accounts</p>
                <h3>Connected channels</h3>
              </div>
              <button className="text-action" type="button">Manage</button>
            </div>
            <div className="channel-list">
              {channels.map((channel) => (
                <article className="channel-card" key={channel.name} style={{ '--accent': channel.accent }}>
                  <span className="channel-swatch" aria-hidden="true" />
                  <div>
                    <strong>{channel.name}</strong>
                    <small>{channel.status}</small>
                  </div>
                  <b>{channel.reach}</b>
                </article>
              ))}
            </div>
          </section>

          <section className="panel activity-panel">
            <p className="eyebrow">Recent activity</p>
            <h3>System notes</h3>
            <ul>
              {activity.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
