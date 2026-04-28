const GITHUB_USER = "liuxiaoyusky";

const repoDescriptions = {
  "ai-developer-skills": "AI 开发技能、工作流和本地工具链沉淀，适合做教程中心的内容骨架。",
  BettaFish: "多 Agent 舆情分析助手，用来观察信息结构、观点流动和趋势判断。",
  chat_generator: "聊天生成相关实验，适合包装成一个轻量 live demo。",
  "perplexity-export": "Perplexity 内容导出工具，适合展示浏览器扩展或生产力工具能力。",
  presentations_by_ai: "用 AI 和代码生成演示内容，把技术过程转成可分享材料。",
  excel_compare_tool_fund_team: "面向基金团队的 Excel 对比工具，适合展示自动化办公场景。",
  task_management_system: "任务管理系统实验，适合放在早期产品原型区。",
  nuxt_tutorial: "Nuxt 学习与教程仓库，适合沉淀前端教程路线。",
};

const fallbackRepos = [
  {
    name: "ai-developer-skills",
    description: repoDescriptions["ai-developer-skills"],
    language: "Python",
    html_url: "https://github.com/liuxiaoyusky/ai-developer-skills",
    homepage: "",
    fork: false,
    stargazers_count: 0,
    updated_at: "2026-04-11T08:50:06Z",
  },
  {
    name: "perplexity-export",
    description: repoDescriptions["perplexity-export"],
    language: "TypeScript",
    html_url: "https://github.com/liuxiaoyusky/perplexity-export",
    homepage: "",
    fork: false,
    stargazers_count: 0,
    updated_at: "2026-01-08T09:42:13Z",
  },
  {
    name: "BettaFish",
    description: repoDescriptions.BettaFish,
    language: "Python",
    html_url: "https://github.com/liuxiaoyusky/BettaFish",
    homepage: "",
    fork: true,
    stargazers_count: 0,
    updated_at: "2026-01-06T03:16:06Z",
  },
  {
    name: "presentations_by_ai",
    description: repoDescriptions.presentations_by_ai,
    language: "Vue",
    html_url: "https://github.com/liuxiaoyusky/presentations_by_ai",
    homepage: "",
    fork: true,
    stargazers_count: 0,
    updated_at: "2025-11-03T04:05:07Z",
  },
  {
    name: "excel_compare_tool_fund_team",
    description: repoDescriptions.excel_compare_tool_fund_team,
    language: "Python",
    html_url: "https://github.com/liuxiaoyusky/excel_compare_tool_fund_team",
    homepage: "",
    fork: false,
    stargazers_count: 0,
    updated_at: "2025-10-22T03:32:01Z",
  },
  {
    name: "chat_generator",
    description: repoDescriptions.chat_generator,
    language: "TypeScript",
    html_url: "https://github.com/liuxiaoyusky/chat_generator",
    homepage: "",
    fork: false,
    stargazers_count: 0,
    updated_at: "2025-04-30T10:01:46Z",
  },
];

const priorityRepos = [
  "BettaFish",
  "ai-developer-skills",
  "perplexity-export",
  "presentations_by_ai",
  "chat_generator",
  "excel_compare_tool_fund_team",
  "task_management_system",
  "nuxt_tutorial",
];

const commandBase = [
  { label: "Projects", meta: "Section", href: "#projects" },
  { label: "Tutorials", meta: "Section", href: "#tutorials" },
  { label: "Work With Me", meta: "Section", href: "#collab" },
  { label: "Playground", meta: "Section", href: "#playground" },
  { label: "GitHub Profile", meta: "External", href: "https://github.com/liuxiaoyusky" },
];

let repos = [...fallbackRepos];
let activeFilter = "all";
let commandItems = [...commandBase];

const repoGrid = document.querySelector("#repo-grid");
const repoCount = document.querySelector("#repo-count");
const originalCount = document.querySelector("#original-count");
const latestUpdate = document.querySelector("#latest-update");
const year = document.querySelector("#year");
const commandModal = document.querySelector("[data-command-modal]");
const commandInput = document.querySelector("[data-command-input]");
const commandList = document.querySelector("[data-command-list]");

year.textContent = new Date().getFullYear();

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  if (!value) return "recent";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function getRepoDescription(repo) {
  return repoDescriptions[repo.name] || repo.description || "Public GitHub project ready for a sharper demo page and product story.";
}

function isAiRepo(repo) {
  const text = `${repo.name} ${repo.description || ""}`.toLowerCase();
  return ["ai", "agent", "rag", "flow", "research", "gpt", "llm", "automation"].some((term) => text.includes(term));
}

function hasDemo(repo) {
  return Boolean(repo.homepage && repo.homepage.startsWith("http"));
}

function sortRepos(list) {
  return [...list].sort((a, b) => {
    const priorityA = priorityRepos.indexOf(a.name);
    const priorityB = priorityRepos.indexOf(b.name);
    const scoreA = priorityA === -1 ? 999 : priorityA;
    const scoreB = priorityB === -1 ? 999 : priorityB;

    if (scoreA !== scoreB) return scoreA - scoreB;
    return new Date(b.updated_at || 0) - new Date(a.updated_at || 0);
  });
}

function getFilteredRepos() {
  const filtered = repos.filter((repo) => {
    if (activeFilter === "original") return !repo.fork;
    if (activeFilter === "demo") return hasDemo(repo);
    if (activeFilter === "ai") return isAiRepo(repo);
    return true;
  });

  return sortRepos(filtered).slice(0, 9);
}

function renderRepos() {
  const visibleRepos = getFilteredRepos();

  if (!visibleRepos.length) {
    repoGrid.innerHTML = `
      <article class="repo-card">
        <div class="repo-top">
          <h3>No repos here yet</h3>
          <span class="repo-badge">Empty</span>
        </div>
        <p>这个筛选条件下暂时没有可展示仓库。你可以继续补 live demo 或 homepage 链接。</p>
      </article>
    `;
    return;
  }

  repoGrid.innerHTML = visibleRepos
    .map((repo) => {
      const description = getRepoDescription(repo);
      const demoLink = hasDemo(repo)
        ? `<a href="${escapeHtml(repo.homepage)}" target="_blank" rel="noreferrer">Live Demo</a>`
        : "";
      const language = repo.language ? `<span>${escapeHtml(repo.language)}</span>` : "";
      const aiTag = isAiRepo(repo) ? "<span>AI</span>" : "";

      return `
        <article class="repo-card" data-repo="${escapeHtml(repo.name)}">
          <div class="repo-top">
            <h3>${escapeHtml(repo.name)}</h3>
            <span class="repo-badge">${repo.fork ? "Fork" : "Original"}</span>
          </div>
          <p>${escapeHtml(description)}</p>
          <div class="repo-meta">
            ${language}
            ${aiTag}
            <span>${Number(repo.stargazers_count || 0)} stars</span>
            <span>${formatDate(repo.updated_at)}</span>
          </div>
          <div class="repo-actions">
            <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noreferrer">GitHub</a>
            ${demoLink}
          </div>
        </article>
      `;
    })
    .join("");
}

function updateProfileStats(sourceRepos) {
  repoCount.textContent = sourceRepos.length;
  originalCount.textContent = sourceRepos.filter((repo) => !repo.fork).length;

  const latest = [...sourceRepos].sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0))[0];
  latestUpdate.textContent = latest ? formatDate(latest.updated_at) : "Ready";
}

function syncCommandItems() {
  const repoCommands = sortRepos(repos)
    .slice(0, 12)
    .map((repo) => ({
      label: repo.name,
      meta: repo.fork ? "Fork" : "Repo",
      href: repo.html_url,
    }));

  commandItems = [...commandBase, ...repoCommands];
  renderCommands();
}

async function loadRepos() {
  renderRepos();
  updateProfileStats(repos);
  syncCommandItems();

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, {
      headers: { Accept: "application/vnd.github+json" },
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    const data = await response.json();
    repos = data.map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      html_url: repo.html_url,
      homepage: repo.homepage,
      fork: repo.fork,
      stargazers_count: repo.stargazers_count,
      updated_at: repo.updated_at,
    }));

    renderRepos();
    updateProfileStats(repos);
    syncCommandItems();
  } catch (error) {
    latestUpdate.textContent = "Offline";
    console.warn(error);
  }
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderRepos();
  });
});

document.querySelectorAll("[data-theme-choice]").forEach((button) => {
  button.addEventListener("click", () => {
    const theme = button.dataset.themeChoice;
    document.body.dataset.theme = theme;
    localStorage.setItem("xiaoyu-theme", theme);
    document.querySelectorAll("[data-theme-choice]").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
  });
});

function restoreTheme() {
  const savedTheme = localStorage.getItem("xiaoyu-theme");
  if (!savedTheme) return;

  const button = document.querySelector(`[data-theme-choice="${savedTheme}"]`);
  if (!button) return;

  document.body.dataset.theme = savedTheme;
  document.querySelectorAll("[data-theme-choice]").forEach((item) => item.classList.remove("is-active"));
  button.classList.add("is-active");
}

function openCommand() {
  commandModal.hidden = false;
  commandInput.value = "";
  renderCommands();
  window.setTimeout(() => commandInput.focus(), 0);
}

function closeCommand() {
  commandModal.hidden = true;
}

function renderCommands() {
  const query = commandInput.value.trim().toLowerCase();
  const items = commandItems
    .filter((item) => `${item.label} ${item.meta}`.toLowerCase().includes(query))
    .slice(0, 10);

  commandList.innerHTML = items
    .map(
      (item) => `
        <button class="command-item" type="button" data-command-href="${escapeHtml(item.href)}">
          ${escapeHtml(item.label)}
          <span>${escapeHtml(item.meta)}</span>
        </button>
      `,
    )
    .join("");
}

document.querySelectorAll("[data-command-open]").forEach((button) => {
  button.addEventListener("click", openCommand);
});

document.querySelectorAll("[data-command-close]").forEach((button) => {
  button.addEventListener("click", closeCommand);
});

commandInput.addEventListener("input", renderCommands);

commandList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-command-href]");
  if (!button) return;

  const href = button.dataset.commandHref;
  closeCommand();

  if (href.startsWith("#")) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.open(href, "_blank", "noreferrer");
  }
});

document.addEventListener("keydown", (event) => {
  const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName);
  if ((event.key.toLowerCase() === "k" && !isTyping) || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")) {
    event.preventDefault();
    openCommand();
  }

  if (event.key === "Escape" && !commandModal.hidden) {
    closeCommand();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 },
);

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

restoreTheme();
loadRepos();
