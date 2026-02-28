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

  // --- 라우터 ---
  function parseHash() {
    const hash = window.location.hash.slice(1) || "catalog";
    const parts = hash.split("/");

    if (parts[0] === "learn" && parts[1]) {
      return {
        view: "learn",
        projectId: parts[1],
        tab: parts[2] || "overview",
        itemId: parts[3] || null,
      };
    }
    return { view: "catalog" };
  }

  function navigateTo(hash) {
    window.location.hash = hash;
  }

  function handleRoute() {
    var route = parseHash();
    var footer = document.querySelector(".footer");

    if (route.view === "learn") {
      if (footer) footer.style.display = "none";
      renderLearnView(route);
    } else {
      if (footer) footer.style.display = "";
      renderCatalog();
    }
  }

  // --- 학습 뷰 렌더링 ---
  function renderLearnView(route) {
    const project = data.projects.find((p) => p.id === route.projectId);
    if (!project) {
      navigateTo("catalog");
      return;
    }

    const content =
      window.STUDIO_CONTENT && window.STUDIO_CONTENT[route.projectId];
    if (!content) {
      app.innerHTML = '<div class="learn-error container">' +
        '<p>콘텐츠를 불러올 수 없습니다.</p>' +
        '<a href="#catalog">대시보드로 돌아가기</a></div>';
      return;
    }

    // 헤더 업데이트
    document.querySelector(".header__title").textContent = project.title;
    document.querySelector(".header__subtitle").textContent =
      project.subtitle || project.description;

    // learn.js의 렌더 함수 호출
    if (window.StudioLearn) {
      window.StudioLearn.render(app, project, content, route);
    }
  }

  // --- 온보딩 웰컴 ---
  function renderWelcome() {
    if (localStorage.getItem("studio-welcome-dismissed")) return "";

    return '<section class="welcome-section" aria-label="환영 메시지">' +
      '<div class="container"><div class="welcome-box">' +
      '<button class="welcome-box__close js-welcome-close" aria-label="환영 메시지 닫기">닫기</button>' +
      '<div class="welcome-box__title">👋 처음 오셨나요?</div>' +
      '<p class="welcome-box__text">' +
      '이 대시보드는 <strong>클로드 코드 학습 프로젝트</strong>입니다.<br/>' +
      '카드를 클릭하면 <strong>브라우저 안에서</strong> 튜토리얼을 읽고, 코드를 체험하고, 퀴즈를 풀 수 있어요!<br/>' +
      '⭐ = 쉬움, ⭐⭐ = 보통, ⭐⭐⭐ = 어려움</p>' +
      '</div></div></section>';
  }

  // --- 진행률 ---
  function renderProgress() {
    var projects = data.projects;
    var total = projects.length;
    var completed = projects.filter(function(p) { return p.status === "completed"; }).length;
    var inProgress = projects.filter(function(p) { return p.status === "in-progress"; }).length;
    var planned = projects.filter(function(p) { return p.status === "planned"; }).length;
    var pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    var learnProgress = getOverallLearnProgress();
    var learnHTML = learnProgress.total > 0
      ? '<span class="progress-stat"><span class="progress-dot" style="background:var(--phase-1)"></span> 학습 ' + learnProgress.completed + '/' + learnProgress.total + ' 탭</span>'
      : "";

    return '<section class="progress-section" aria-label="전체 진행률"><div class="container">' +
      '<div class="progress-bar-wrapper" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100" aria-label="전체 진행률 ' + pct + '%">' +
      '<div class="progress-bar-fill" style="width: ' + pct + '%"></div></div>' +
      '<div class="progress-stats">' +
      '<span class="progress-stat"><span class="progress-dot progress-dot--completed"></span> 완료 ' + completed + '/' + total + '</span>' +
      '<span class="progress-stat"><span class="progress-dot progress-dot--in-progress"></span> 진행중 ' + inProgress + '/' + total + '</span>' +
      '<span class="progress-stat"><span class="progress-dot progress-dot--planned"></span> 예정 ' + planned + '/' + total + '</span>' +
      learnHTML +
      '</div></div></section>';
  }

  // --- 학습 진행률 계산 (StudioChallenges 연동) ---
  function getOverallLearnProgress() {
    if (window.StudioChallenges) {
      return window.StudioChallenges.getOverallProgress(data.projects);
    }
    var total = 0;
    var completed = 0;
    var tabs = ["overview", "concepts", "tutorials", "examples", "quiz"];

    for (var i = 0; i < data.projects.length; i++) {
      for (var j = 0; j < tabs.length; j++) {
        total++;
        var key = "studio-progress-" + data.projects[i].id + "-" + tabs[j];
        if (localStorage.getItem(key) === "done") {
          completed++;
        }
      }
    }
    return { total: total, completed: completed };
  }

  function getProjectLearnProgress(projectId) {
    if (window.StudioChallenges) {
      return window.StudioChallenges.getProjectProgress(projectId);
    }
    var tabs = ["overview", "concepts", "tutorials", "examples", "quiz"];
    var completed = 0;
    for (var j = 0; j < tabs.length; j++) {
      var key = "studio-progress-" + projectId + "-" + tabs[j];
      if (localStorage.getItem(key) === "done") {
        completed++;
      }
    }
    return { completed: completed, total: tabs.length };
  }

  // --- 퀴즈 점수 가져오기 ---
  function getQuizScore(projectId) {
    var raw = localStorage.getItem("studio-quiz-" + projectId);
    if (!raw) return null;
    try { return JSON.parse(raw); }
    catch (e) { return null; }
  }

  // --- 필터 바 ---
  function renderFilterBar() {
    var statusOptions = [
      { value: "all", label: "전체" },
      { value: "completed", label: "완료" },
      { value: "in-progress", label: "진행중" },
      { value: "planned", label: "예정" }
    ];
    var difficultyOptions = [
      { value: "all", label: "난이도" },
      { value: "1", label: "⭐" },
      { value: "2", label: "⭐⭐" },
      { value: "3", label: "⭐⭐⭐" }
    ];

    var statusBtns = statusOptions.map(function(o) {
      return '<button class="filter-btn js-status-filter' + (currentStatusFilter === o.value ? " active" : "") + '" data-filter-status="' + o.value + '">' + o.label + '</button>';
    }).join("");

    var diffBtns = difficultyOptions.map(function(o) {
      return '<button class="filter-btn js-difficulty-filter' + (currentDifficultyFilter === o.value ? " active" : "") + '" data-filter-difficulty="' + o.value + '">' + o.label + '</button>';
    }).join("");

    return '<div class="filter-bar container" role="search" aria-label="프로젝트 필터">' +
      '<input type="search" class="search-input" id="search-input" placeholder="프로젝트 검색 (제목, 설명, 개념...)" aria-label="프로젝트 검색" />' +
      '<div class="filter-group" role="group" aria-label="상태 필터">' + statusBtns + '</div>' +
      '<div class="filter-group" role="group" aria-label="난이도 필터">' + diffBtns + '</div></div>';
  }

  // --- 프로젝트 카드 ---
  function renderCard(project) {
    var subExamples = project.subExamples || [];
    var subCompleted = subExamples.filter(function(s) { return s.status === "completed"; }).length;
    var subTotal = subExamples.length;

    var subProgressHTML = "";
    if (subTotal > 0) {
      var subPct = Math.round((subCompleted / subTotal) * 100);
      subProgressHTML = '<div class="card__sub-progress">' +
        '<div class="sub-progress-bar"><div class="sub-progress-fill" style="width: ' + subPct + '%"></div></div>' +
        '<span class="sub-progress-text">' + subCompleted + '/' + subTotal + ' 완료</span></div>';
    }

    // 학습 진행률 뱃지
    var learnProg = getProjectLearnProgress(project.id);
    var learnBadgeHTML = "";
    if (learnProg.completed > 0) {
      var learnPct = Math.round((learnProg.completed / learnProg.total) * 100);
      learnBadgeHTML = '<span class="card__learn-badge" title="학습 진행률 ' + learnPct + '%">' + learnPct + '%</span>';
    }

    // 퀴즈 점수 뱃지
    var quizScore = getQuizScore(project.id);
    var quizBadgeHTML = "";
    if (quizScore) {
      quizBadgeHTML = '<span class="card__quiz-badge" title="퀴즈 ' + quizScore.score + '/' + quizScore.total + '">' + quizScore.score + '/' + quizScore.total + '</span>';
    }

    var subtitleHTML = project.subtitle ? '<p class="card__subtitle">' + project.subtitle + '</p>' : "";

    var hasContent = window.STUDIO_CONTENT && window.STUDIO_CONTENT[project.id];

    var linkHTML = "";
    if (hasContent) {
      linkHTML = '<a href="#learn/' + project.id + '" class="card__link" aria-label="' + project.title + ' 학습 시작하기">학습 시작하기 📚</a>';
    } else if (project.path) {
      linkHTML = '<a href="' + project.path + '" class="card__link" aria-label="' + project.title + ' 폴더 열기">폴더 열기</a>';
    }

    var conceptsHTML = project.concepts.map(function(c) { return '<span class="concept-tag">' + c + '</span>'; }).join("");

    return '<article class="project-card project-card--' + project.status + '" data-id="' + project.id + '" data-status="' + project.status + '" data-difficulty="' + project.difficulty + '" data-phase="' + project.phase + '" tabindex="0" aria-label="' + project.title + ' 프로젝트">' +
      '<div class="card__top">' +
      '<span class="card__badge card__badge--' + project.status + '">' + statusLabels[project.status] + '</span>' +
      '<div class="card__top-right">' + learnBadgeHTML + quizBadgeHTML + '<span class="card__number">#' + project.number + '</span></div></div>' +
      '<h3 class="card__title">' + project.title + '</h3>' +
      subtitleHTML +
      '<div class="card__difficulty" aria-label="난이도 ' + project.difficulty + '">' + difficultyStars(project.difficulty) + '</div>' +
      '<p class="card__description">' + project.description + '</p>' +
      '<div class="card__concepts" aria-label="관련 개념">' + conceptsHTML + '</div>' +
      subProgressHTML +
      linkHTML +
      '</article>';
  }

  // --- 페이즈별 렌더링 ---
  function renderPhases(filteredProjects) {
    var sortedPhases = data.phases.slice().sort(function(a, b) { return a.order - b.order; });
    var html = "";

    for (var i = 0; i < sortedPhases.length; i++) {
      var phase = sortedPhases[i];
      var phaseProjects = filteredProjects.filter(function(p) { return p.phase === phase.id; });
      if (phaseProjects.length === 0) continue;

      html += '<section class="phase-section" aria-label="' + phase.name + '"><div class="container">' +
        '<div class="phase-header">' +
        '<div class="phase-indicator" style="background: ' + phase.color + '"></div>' +
        '<h2 class="phase-name">' + phase.name + '</h2>' +
        '<span class="phase-desc">' + phase.description + '</span></div>' +
        '<div class="card-grid">' + phaseProjects.map(renderCard).join("") + '</div>' +
        '</div></section>';
    }

    return html;
  }

  // --- 빈 상태 ---
  function renderEmptyState() {
    return '<div class="empty-state container">' +
      '<div class="empty-state__icon">🔍</div>' +
      '<p class="empty-state__text">검색 결과가 없습니다</p>' +
      '<p class="empty-state__hint">다른 키워드나 필터를 시도해보세요</p></div>';
  }

  // --- 학습 경로 타임라인 ---
  function renderTimeline() {
    var sorted = data.projects.slice().sort(function(a, b) { return a.number.localeCompare(b.number); });

    var items = sorted.map(function(project, i) {
      var isLast = i === sorted.length - 1;
      var connectorClass = project.status === "completed" ? "timeline-connector--completed" : "timeline-connector--default";
      var tooltipText = "난이도: " + difficultyStars(project.difficulty) + " / 상태: " + statusLabels[project.status];
      var connector = !isLast ? '<div class="timeline-connector ' + connectorClass + '"></div>' : "";

      return '<div class="timeline-item">' +
        '<a href="#learn/' + project.id + '" class="timeline-node timeline-node--' + project.status + '" title="' + tooltipText + '" aria-label="' + project.number + ' ' + project.title + ' (' + statusLabels[project.status] + ')">' + project.number + '</a>' +
        connector +
        '<span class="timeline-label">' + project.title + '</span></div>';
    }).join("");

    return '<section class="timeline-section" aria-label="학습 경로"><div class="container">' +
      '<h2 class="timeline-title">학습 경로</h2>' +
      '<div class="timeline">' + items + '</div></div></section>';
  }

  // --- 필터 로직 ---
  function getFilteredProjects() {
    return data.projects.filter(function(p) {
      if (currentStatusFilter !== "all" && p.status !== currentStatusFilter) return false;
      if (currentDifficultyFilter !== "all" && p.difficulty !== Number(currentDifficultyFilter)) return false;

      if (searchQuery) {
        var q = searchQuery.toLowerCase();
        var haystack = [p.title, p.subtitle, p.description].concat(p.concepts).join(" ").toLowerCase();
        if (haystack.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  // --- 카탈로그 렌더링 ---
  function renderCatalog() {
    // 헤더 복원
    document.querySelector(".header__title").textContent = "Claude Code 학습 스튜디오";
    document.querySelector(".header__subtitle").textContent = "클로드 코드의 기능을 배우고 활용하는 학습 대시보드";

    var filtered = getFilteredProjects();
    var content = renderWelcome();
    content += renderProgress();
    content += renderFilterBar();

    if (filtered.length > 0) {
      content += renderPhases(filtered);
    } else {
      content += renderEmptyState();
    }
    content += renderTimeline();

    app.innerHTML = content;
    bindCatalogEvents();
  }

  // --- 카탈로그 이벤트 바인딩 ---
  function bindCatalogEvents() {
    var welcomeClose = document.querySelector(".js-welcome-close");
    if (welcomeClose) {
      welcomeClose.addEventListener("click", function() {
        localStorage.setItem("studio-welcome-dismissed", "true");
        renderCatalog();
      });
    }

    var searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.value = searchQuery;
      searchInput.addEventListener("input", function(e) {
        searchQuery = e.target.value.trim();
        renderCatalog();
        var newInput = document.getElementById("search-input");
        if (newInput) {
          newInput.focus();
          newInput.setSelectionRange(newInput.value.length, newInput.value.length);
        }
      });
    }

    document.querySelectorAll(".js-status-filter").forEach(function(btn) {
      btn.addEventListener("click", function() {
        currentStatusFilter = btn.dataset.filterStatus;
        renderCatalog();
      });
    });

    document.querySelectorAll(".js-difficulty-filter").forEach(function(btn) {
      btn.addEventListener("click", function() {
        currentDifficultyFilter = btn.dataset.filterDifficulty;
        renderCatalog();
      });
    });

    document.querySelectorAll(".project-card").forEach(function(card) {
      card.addEventListener("click", function(e) {
        if (e.target.closest(".card__link")) return;
        var projectId = card.dataset.id;
        var hasContent = window.STUDIO_CONTENT && window.STUDIO_CONTENT[projectId];
        if (hasContent) {
          navigateTo("learn/" + projectId);
        } else {
          var project = data.projects.find(function(p) { return p.id === projectId; });
          if (project && project.path) window.location.href = project.path;
        }
      });

      card.addEventListener("keydown", function(e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  // --- 테마 토글 바인딩 ---
  function bindThemeToggle() {
    var themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", toggleTheme);
    }
  }

  // --- 초기화 ---
  function init() {
    initTheme();
    bindThemeToggle();

    // 레벨 피커 마운트
    if (window.StudioLevel) {
      var mount = document.getElementById("level-picker-mount");
      if (mount) mount.appendChild(window.StudioLevel.renderLevelPicker());
    }

    // Mermaid 초기화
    if (window.mermaid) {
      mermaid.initialize({
        startOnLoad: false,
        theme: document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "default"
      });
    }

    // 라우팅
    window.addEventListener("hashchange", handleRoute);
    handleRoute();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
