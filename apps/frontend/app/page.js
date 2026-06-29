'use client';

import { useMemo, useState } from 'react';

const initialChannels = [
  { name: 'Medium', status: 'Ready', reach: '18.4k', accent: '#2f7f6f', selected: true },
  { name: 'Dev.to', status: 'Ready', reach: '6.2k', accent: '#8b5036', selected: true },
  { name: 'LinkedIn', status: 'Review', reach: '9.8k', accent: '#315f9f', selected: false },
  { name: 'X', status: 'Reconnect', reach: '31.6k', accent: '#262b35', selected: false },
  { name: 'Notion', status: 'Draft sync', reach: 'Team', accent: '#756047', selected: true },
];

const initialPosts = [
  {
    id: 1,
    title: 'Midnight launch notes',
    channel: 'Medium + LinkedIn',
    state: 'Scheduled',
    time: 'Today, 16:30',
    score: 86,
    body: 'A polished launch recap with the technical notes, shipped features, and provider rollout details.',
  },
  {
    id: 2,
    title: 'Privacy-first publishing checklist',
    channel: 'X thread',
    state: 'Draft',
    time: 'Tomorrow, 09:15',
    score: 72,
    body: 'A compact thread about token handling, review gates, and why credentials stay out of the client.',
  },
  {
    id: 3,
    title: 'Community build recap',
    channel: 'Dev.to',
    state: 'Review',
    time: 'Fri, 11:00',
    score: 91,
    body: 'A developer-focused recap of the latest integration work and the publishing relay architecture.',
  },
];

const filters = ['Overview', 'Queue', 'Accounts'];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('Overview');
  const [selectedPostId, setSelectedPostId] = useState(initialPosts[0].id);
  const [posts, setPosts] = useState(initialPosts);
  const [channels, setChannels] = useState(initialChannels);
  const [draftTitle, setDraftTitle] = useState('Launch week field notes');
  const [draftBody, setDraftBody] = useState(
    'Write once, review each channel, and publish after EchoPost checks the credential vault and provider limits.',
  );
  const [activity, setActivity] = useState([
    'Credential vault rotated for LinkedIn',
    'Medium import completed with 14 assets',
    'Draft policy flagged 2 disclosure checks',
    'Notion workspace sync started',
  ]);

  const selectedPost = posts.find((post) => post.id === selectedPostId) ?? posts[0];
  const selectedChannels = channels.filter((channel) => channel.selected);

  const visiblePosts = useMemo(() => {
    if (activeFilter === 'Accounts') {
      return posts.filter((post) => post.channel.includes('LinkedIn') || post.channel.includes('X'));
    }

    if (activeFilter === 'Queue') {
      return posts.filter((post) => post.state !== 'Draft');
    }

    return posts;
  }, [activeFilter, posts]);

  const metrics = [
    ['Queued posts', posts.length + 9, '+3 this week'],
    ['Selected reach', selectedChannels.reduce((total, channel) => total + parseReach(channel.reach), 0).toFixed(1) + 'k', `${selectedChannels.length} channels armed`],
    ['Privacy checks', 47, '2 need attention'],
    ['Success rate', '94.6%', 'Last 30 days'],
  ];

  function addActivity(message) {
    setActivity((items) => [message, ...items].slice(0, 5));
  }

  function createDraft() {
    const title = draftTitle.trim();

    if (!title) {
      addActivity('Draft needs a title before it can enter the queue');
      return;
    }

    const channelLabel = selectedChannels.map((channel) => channel.name).join(' + ') || 'No channel selected';
    const nextPost = {
      id: Date.now(),
      title,
      channel: channelLabel,
      state: selectedChannels.length ? 'Review' : 'Draft',
      time: 'Unscheduled',
      score: Math.min(94, 68 + title.length + selectedChannels.length * 4),
      body: draftBody.trim() || 'No draft body yet.',
    };

    setPosts((items) => [nextPost, ...items]);
    setSelectedPostId(nextPost.id);
    addActivity(`Draft created for ${channelLabel}`);
  }

  function publishSelected() {
    setPosts((items) =>
      items.map((post) =>
        post.id === selectedPost.id ? { ...post, state: 'Publishing', time: 'Now' } : post,
      ),
    );
    addActivity(`${selectedPost.title} moved into publishing`);
  }

  function markReviewed() {
    setPosts((items) =>
      items.map((post) => (post.id === selectedPost.id ? { ...post, state: 'Scheduled' } : post)),
    );
    addActivity(`${selectedPost.title} passed review`);
  }

  function toggleChannel(name) {
    setChannels((items) =>
      items.map((channel) =>
        channel.name === name ? { ...channel, selected: !channel.selected } : channel,
      ),
    );
  }

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
          {['Dashboard', 'Compose', 'Accounts', 'Vault', 'Analytics'].map((item) => (
            <button className={item === 'Dashboard' ? 'nav-item active' : 'nav-item'} key={item}>
              <span aria-hidden="true" />
              {item}
            </button>
          ))}
        </nav>

        <section className="security-panel">
          <p className="eyebrow">Credential Guard</p>
          <strong>Vault ready</strong>
          <span>{channels.filter((channel) => channel.status !== 'Reconnect').length} accounts protected with encrypted publish access.</span>
        </section>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Publishing dashboard</p>
            <h2>Write once, review every channel, publish when the vault is clear.</h2>
          </div>
          <button className="primary-action" type="button" onClick={createDraft}>Queue draft</button>
        </header>

        <section className="metric-grid" aria-label="Publishing summary">
          {metrics.map(([label, value, note]) => (
            <article className="metric-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </article>
          ))}
        </section>

        <div className="content-grid">
          <section className="panel composer-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Try the workflow</p>
                <h3>Compose a demo post</h3>
              </div>
              <span className="save-state">Local demo</span>
            </div>
            <label className="field-label">
              Title
              <input value={draftTitle} onChange={(event) => setDraftTitle(event.target.value)} />
            </label>
            <label className="field-label">
              Draft
              <textarea value={draftBody} onChange={(event) => setDraftBody(event.target.value)} rows={5} />
            </label>
            <div className="channel-picker" aria-label="Select publishing channels">
              {channels.map((channel) => (
                <button
                  className={channel.selected ? 'channel-pill selected' : 'channel-pill'}
                  key={channel.name}
                  onClick={() => toggleChannel(channel.name)}
                  style={{ '--accent': channel.accent }}
                  type="button"
                >
                  <span aria-hidden="true" />
                  {channel.name}
                </button>
              ))}
            </div>
          </section>

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
                  className={selectedPostId === post.id ? 'post-row selected' : 'post-row'}
                  key={post.id}
                  onClick={() => setSelectedPostId(post.id)}
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

          <section className="panel preview-panel">
            <p className="eyebrow">Selected post</p>
            <h3>{selectedPost.title}</h3>
            <p>{selectedPost.body}</p>
            <dl className="review-grid">
              <div>
                <dt>Channels</dt>
                <dd>{selectedPost.channel}</dd>
              </div>
              <div>
                <dt>Readiness</dt>
                <dd>{selectedPost.score}/100</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{selectedPost.state}</dd>
              </div>
            </dl>
            <div className="action-row">
              <button className="primary-action compact" type="button" onClick={publishSelected}>Publish now</button>
              <button className="text-action" type="button" onClick={markReviewed}>Mark reviewed</button>
            </div>
          </section>

          <section className="panel channel-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Accounts</p>
                <h3>Connected channels</h3>
              </div>
              <span className="save-state">{selectedChannels.length} selected</span>
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

function parseReach(reach) {
  const value = Number.parseFloat(reach);
  return Number.isFinite(value) ? value : 0;
}
