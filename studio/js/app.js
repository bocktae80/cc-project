// Claude Code 학습 스튜디오 — 메인 앱
(function () {
  "use strict";

  // --- 데이터 ---
  const data = window.STUDIO_DATA;
  if (!data) {
    document.getElementById("app").innerHTML =
      '<p style="text-align:center;padding:40px;color:red;">데이터를 불러올 수 없습니다. projects.js 파일을 확인하세요.</p>';
    return;
  }

  // --- 상태 ---
  let currentStatusFilter = "all";
  let currentDifficultyFilter = "all";
  let searchQuery = "";

  // --- DOM 참조 ---
  const app = document.getElementById("app");

  // --- 유틸 ---
  const statusLabels = {
    completed: "완료",
    "in-progress": "진행중",
    planned: "예정",
  };

  function difficultyStars(n) {
    return "⭐".repeat(n);
  }

  function getPhaseById(id) {
    return data.phases.find((p) => p.id === id);
  }

  // --- 테마 ---
  function initTheme() {
    const saved = localStorage.getItem("studio-theme");
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
    updateThemeIcon();
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("studio-theme", next);
    updateThemeIcon();
  }

  function updateThemeIcon() {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    btn.textContent = isDark ? "☀️" : "🌙";
    btn.setAttribute(
      "aria-label",
      isDark ? "라이트 모드로 전환" : "다크 모드로 전환"
    );
  }

  // --- 온보딩 웰컴 ---
  function renderWelcome() {
    if (localStorage.getItem("studio-welcome-dismissed")) return "";

    return `
      <section class="welcome-section" aria-label="환영 메시지">
        <div class="container">
          <div class="welcome-box">
            <button class="welcome-box__close js-welcome-close" aria-label="환영 메시지 닫기">닫기</button>
            <div class="welcome-box__title">👋 처음 오셨나요?</div>
            <p class="welcome-box__text">
              이 대시보드는 <strong>클로드 코드 학습 프로젝트</strong>입니다.<br/>
              ⭐ = 쉬움, ⭐⭐ = 보통, ⭐⭐⭐ = 어려움<br/>
              아래 카드를 눌러 프로젝트 폴더로 이동하세요!
            </p>
          </div>
        </div>
      </section>
    `;
  }

  // --- 진행률 ---
  function renderProgress() {
    const projects = data.projects;
    const total = projects.length;
    const completed = projects.filter((p) => p.status === "completed").length;
    const inProgress = projects.filter(
      (p) => p.status === "in-progress"
    ).length;
    const planned = projects.filter((p) => p.status === "planned").length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    return `
      <section class="progress-section" aria-label="전체 진행률">
        <div class="container">
          <div class="progress-bar-wrapper" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="전체 진행률 ${pct}%">
            <div class="progress-bar-fill" style="width: ${pct}%"></div>
          </div>
          <div class="progress-stats">
            <span class="progress-stat"><span class="progress-dot progress-dot--completed"></span> 완료 ${completed}/${total}</span>
            <span class="progress-stat"><span class="progress-dot progress-dot--in-progress"></span> 진행중 ${inProgress}/${total}</span>
            <span class="progress-stat"><span class="progress-dot progress-dot--planned"></span> 예정 ${planned}/${total}</span>
          </div>
        </div>
      </section>
    `;
  }

  // --- 필터 바 ---
  function renderFilterBar() {
    const statusOptions = [
      { value: "all", label: "전체" },
      { value: "completed", label: "완료" },
      { value: "in-progress", label: "진행중" },
      { value: "planned", label: "예정" },
    ];
    const difficultyOptions = [
      { value: "all", label: "난이도" },
      { value: "1", label: "⭐" },
      { value: "2", label: "⭐⭐" },
      { value: "3", label: "⭐⭐⭐" },
    ];

    return `
      <div class="filter-bar container" role="search" aria-label="프로젝트 필터">
        <input
          type="search"
          class="search-input"
          id="search-input"
          placeholder="프로젝트 검색 (제목, 설명, 개념...)"
          aria-label="프로젝트 검색"
        />
        <div class="filter-group" role="group" aria-label="상태 필터">
          ${statusOptions.map((o) => `<button class="filter-btn js-status-filter${currentStatusFilter === o.value ? " active" : ""}" data-filter-status="${o.value}">${o.label}</button>`).join("")}
        </div>
        <div class="filter-group" role="group" aria-label="난이도 필터">
          ${difficultyOptions.map((o) => `<button class="filter-btn js-difficulty-filter${currentDifficultyFilter === o.value ? " active" : ""}" data-filter-difficulty="${o.value}">${o.label}</button>`).join("")}
        </div>
      </div>
    `;
  }

  // --- 프로젝트 카드 ---
  function renderCard(project) {
    const phase = getPhaseById(project.phase);
    const subExamples = project.subExamples || [];
    const subCompleted = subExamples.filter(
      (s) => s.status === "completed"
    ).length;
    const subTotal = subExamples.length;

    let subProgressHTML = "";
    if (subTotal > 0) {
      const subPct = Math.round((subCompleted / subTotal) * 100);
      subProgressHTML = `
        <div class="card__sub-progress">
          <div class="sub-progress-bar">
            <div class="sub-progress-fill" style="width: ${subPct}%"></div>
          </div>
          <span class="sub-progress-text">${subCompleted}/${subTotal} 완료</span>
        </div>
      `;
    }

    const linkHTML = project.path
      ? `<a href="${project.path}" class="card__link" aria-label="${project.title} 학습 시작하기">학습 시작하기 📚</a>`
      : "";

    const subtitleHTML = project.subtitle
      ? `<p class="card__subtitle">${project.subtitle}</p>`
      : "";

    return `
      <article class="project-card project-card--${project.status}" data-id="${project.id}" data-status="${project.status}" data-difficulty="${project.difficulty}" data-phase="${project.phase}" tabindex="0" aria-label="${project.title} 프로젝트">
        <div class="card__top">
          <span class="card__badge card__badge--${project.status}">${statusLabels[project.status]}</span>
          <span class="card__number">#${project.number}</span>
        </div>
        <h3 class="card__title">${project.title}</h3>
        ${subtitleHTML}
        <div class="card__difficulty" aria-label="난이도 ${project.difficulty}">${difficultyStars(project.difficulty)}</div>
        <p class="card__description">${project.description}</p>
        <div class="card__concepts" aria-label="관련 개념">
          ${project.concepts.map((c) => `<span class="concept-tag">${c}</span>`).join("")}
        </div>
        ${subProgressHTML}
        ${linkHTML}
      </article>
    `;
  }

  // --- 페이즈별 렌더링 ---
  function renderPhases(filteredProjects) {
    const sortedPhases = [...data.phases].sort((a, b) => a.order - b.order);
    let html = "";

    for (const phase of sortedPhases) {
      const phaseProjects = filteredProjects.filter(
        (p) => p.phase === phase.id
      );
      if (phaseProjects.length === 0) continue;

      html += `
        <section class="phase-section" aria-label="${phase.name}">
          <div class="container">
            <div class="phase-header">
              <div class="phase-indicator" style="background: ${phase.color}"></div>
              <h2 class="phase-name">${phase.name}</h2>
              <span class="phase-desc">${phase.description}</span>
            </div>
            <div class="card-grid">
              ${phaseProjects.map(renderCard).join("")}
            </div>
          </div>
        </section>
      `;
    }

    return html;
  }

  // --- 빈 상태 ---
  function renderEmptyState() {
    return `
      <div class="empty-state container">
        <div class="empty-state__icon">🔍</div>
        <p class="empty-state__text">검색 결과가 없습니다</p>
        <p class="empty-state__hint">다른 키워드나 필터를 시도해보세요</p>
      </div>
    `;
  }

  // --- 학습 경로 타임라인 ---
  function renderTimeline() {
    const sorted = [...data.projects].sort((a, b) =>
      a.number.localeCompare(b.number)
    );

    const items = sorted
      .map((project, i) => {
        const isLast = i === sorted.length - 1;
        const nextProject = sorted[i + 1];
        const connectorClass =
          project.status === "completed"
            ? "timeline-connector--completed"
            : "timeline-connector--default";

        const tooltipText = `난이도: ${difficultyStars(project.difficulty)} / 상태: ${statusLabels[project.status]}`;
        return `
        <div class="timeline-item">
          <div class="timeline-node timeline-node--${project.status}" title="${tooltipText}" aria-label="${project.number} ${project.title} (${statusLabels[project.status]})">
            ${project.number}
          </div>
          ${!isLast ? `<div class="timeline-connector ${connectorClass}"></div>` : ""}
          <span class="timeline-label">${project.title}</span>
        </div>
      `;
      })
      .join("");

    return `
      <section class="timeline-section" aria-label="학습 경로">
        <div class="container">
          <h2 class="timeline-title">학습 경로</h2>
          <div class="timeline">
            ${items}
          </div>
        </div>
      </section>
    `;
  }

  // --- 필터 로직 ---
  function getFilteredProjects() {
    return data.projects.filter((p) => {
      // 상태 필터
      if (currentStatusFilter !== "all" && p.status !== currentStatusFilter)
        return false;

      // 난이도 필터
      if (
        currentDifficultyFilter !== "all" &&
        p.difficulty !== Number(currentDifficultyFilter)
      )
        return false;

      // 검색
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const haystack = [
          p.title,
          p.subtitle,
          p.description,
          ...p.concepts,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }

  // --- 전체 렌더링 ---
  function render() {
    const filtered = getFilteredProjects();

    let content = renderWelcome();
    content += renderProgress();
    content += renderFilterBar();

    if (filtered.length > 0) {
      content += renderPhases(filtered);
    } else {
      content += renderEmptyState();
    }

    content += renderTimeline();

    app.innerHTML = content;

    // 이벤트 바인딩
    bindEvents();
  }

  // --- 이벤트 바인딩 ---
  function bindEvents() {
    // 웰컴 닫기
    const welcomeClose = document.querySelector(".js-welcome-close");
    if (welcomeClose) {
      welcomeClose.addEventListener("click", () => {
        localStorage.setItem("studio-welcome-dismissed", "true");
        render();
      });
    }

    // 검색
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.value = searchQuery;
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.trim();
        render();
        // 검색 입력에 포커스 유지
        const newInput = document.getElementById("search-input");
        if (newInput) {
          newInput.focus();
          newInput.setSelectionRange(
            newInput.value.length,
            newInput.value.length
          );
        }
      });
    }

    // 상태 필터 버튼 (js-status-filter 클래스로 카드와 구분)
    document.querySelectorAll(".js-status-filter").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentStatusFilter = btn.dataset.filterStatus;
        render();
      });
    });

    // 난이도 필터 버튼 (js-difficulty-filter 클래스로 카드와 구분)
    document.querySelectorAll(".js-difficulty-filter").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentDifficultyFilter = btn.dataset.filterDifficulty;
        render();
      });
    });

    // 카드 클릭 → 프로젝트 열기
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        // 링크 클릭은 자체 처리
        if (e.target.closest(".card__link")) return;
        const project = data.projects.find((p) => p.id === card.dataset.id);
        if (project && project.path) {
          window.location.href = project.path;
        }
      });

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  // --- 테마 토글 바인딩 (헤더는 #app 밖이므로 한 번만) ---
  function bindThemeToggle() {
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", toggleTheme);
    }
  }

  // --- 초기화 ---
  function init() {
    initTheme();
    bindThemeToggle();
    render();
  }

  // DOM 준비 후 초기화
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
