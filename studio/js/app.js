// Claude Code 학습 스튜디오 — 메인 앱 (v3 통합 셸)
(function () {
  "use strict";

  // --- 데이터 ---
  var data = window.STUDIO_DATA;
  if (!data) {
    document.getElementById("app").innerHTML =
      '<p style="text-align:center;padding:40px;color:red;">데이터를 불러올 수 없습니다.</p>';
    return;
  }

  // --- 상태 ---
  var currentStatusFilter = "all";
  var currentDifficultyFilter = "all";
  var currentPhaseFilter = "all";
  var searchQuery = "";

  var app = document.getElementById("app");

  var statusLabels = { completed: "완료", "in-progress": "진행중", planned: "예정" };

  var LEARN_TABS = [
    { id: "overview", label: "개요" },
    { id: "concepts", label: "개념" },
    { id: "tutorials", label: "실습" },
    { id: "examples", label: "예제" },
    { id: "quiz", label: "퀴즈" }
  ];

  // --- 유틸 ---
  function getPhaseById(id) { return data.phases.find(function (p) { return p.id === id; }); }

  function hexToRgba(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  }

  function getPhaseProgress(phaseId) {
    var pp = data.projects.filter(function (p) { return p.phase === phaseId; });
    return { completed: pp.filter(function (p) { return p.status === "completed"; }).length, total: pp.length };
  }

  var phaseGradients = {
    "phase-1": { start: "#3B82F6", end: "#60A5FA" },
    "phase-2": { start: "#8B5CF6", end: "#A78BFA" },
    "phase-3": { start: "#EC4899", end: "#F472B6" },
    "phase-4": { start: "#F59E0B", end: "#FBBF24" },
    "phase-5": { start: "#EF4444", end: "#F87171" },
    "phase-6": { start: "#10B981", end: "#34D399" }
  };

  // --- 테마 ---
  function initTheme() {
    var saved = localStorage.getItem("studio-theme");
    document.documentElement.setAttribute("data-theme", saved || "dark");
    updateThemeIcon();
  }

  function toggleTheme() {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("studio-theme", next);
    updateThemeIcon();
  }

  var SVG_SUN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  var SVG_MOON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function updateThemeIcon() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.innerHTML = isDark ? SVG_SUN : SVG_MOON; // eslint-disable-line no-unsanitized/property
    btn.setAttribute("aria-label", isDark ? "라이트 모드로 전환" : "다크 모드로 전환");
  }

  // --- 라우터 ---
  function parseHash() {
    var hash = window.location.hash.slice(1) || "catalog";
    var parts = hash.split("/");
    if (parts[0] === "learn" && parts[1]) {
      return { view: "learn", projectId: parts[1], tab: parts[2] || "overview", itemId: parts[3] || null };
    }
    return { view: "catalog" };
  }

  function navigateTo(hash) { window.location.hash = hash; }

  // --- 학습 진행률 ---
  function getProjectLearnProgress(projectId) {
    if (window.StudioChallenges) return window.StudioChallenges.getProjectProgress(projectId);
    var tabs = ["overview", "concepts", "tutorials", "examples", "quiz"];
    var completed = 0;
    for (var j = 0; j < tabs.length; j++) {
      if (localStorage.getItem("studio-progress-" + projectId + "-" + tabs[j]) === "done") completed++;
    }
    return { completed: completed, total: tabs.length };
  }

  // --- SVG 진행률 링 ---
  function renderProgressRing(pct, size, color) {
    var r = (size - 4) / 2, c = 2 * Math.PI * r;
    var offset = c - (pct / 100) * c;
    var sw = size >= 40 ? 4 : 3;
    var strokeColor = color || "var(--color-completed)";
    var text = size >= 40
      ? '<text x="' + size/2 + '" y="' + (size/2 + 1) + '" text-anchor="middle" dominant-baseline="middle" font-size="' + Math.round(size * 0.22) + '" font-weight="700">' + pct + '%</text>'
      : '';
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" class="progress-ring">' +
      '<circle cx="' + size/2 + '" cy="' + size/2 + '" r="' + r + '" fill="none" stroke="var(--border-default)" stroke-width="' + sw + '"/>' +
      '<circle cx="' + size/2 + '" cy="' + size/2 + '" r="' + r + '" fill="none" stroke="' + strokeColor + '" stroke-width="' + sw + '" stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + offset.toFixed(1) + '" transform="rotate(-90 ' + size/2 + ' ' + size/2 + ')"/>' +
      text + '</svg>';
  }

  // ============================================================
  // 통합 셸 렌더링
  // ============================================================

  function handleRoute() {
    var route = parseHash();
    var footer = document.querySelector(".footer");
    if (footer) footer.style.display = route.view === "learn" ? "none" : "";
    renderShell(route);
  }

  function renderShell(route) {
    // 헤더: 항상 고정 텍스트 (learn 뷰에서도 변경하지 않음)
    var titleEl = document.querySelector(".header__title");
    var subEl = document.querySelector(".header__subtitle");
    if (route.view === "learn") {
      var proj = data.projects.find(function (p) { return p.id === route.projectId; });
      if (!proj) { navigateTo("catalog"); return; }
    }
    if (titleEl) titleEl.textContent = "Claude Code 학습 스튜디오";
    if (subEl) subEl.textContent = "클로드 코드의 기능을 배우고 활용하는 학습 대시보드";

    // 모바일 탭
    var tabsHTML = route.view === "learn"
      ? renderLearnMobileTabs(route)
      : renderCatalogMobileTabs();

    // 사이드바
    var sidebarHTML = route.view === "learn"
      ? renderLearnSidebar(route)
      : renderCatalogSidebar();

    // 셸 조립
    app.innerHTML = tabsHTML +
      '<div class="catalog">' + sidebarHTML +
      '<div class="catalog-main" id="shell-main"></div></div>';

    // 메인 콘텐츠 채우기
    var mainEl = document.getElementById("shell-main");
    if (route.view === "learn") {
      fillLearnMain(mainEl, route);
    } else {
      fillCatalogMain(mainEl);
      bindCatalogEvents();
    }
  }

  // ============================================================
  // 모바일 탭
  // ============================================================

  function renderCatalogMobileTabs() {
    var sorted = data.phases.slice().sort(function (a, b) { return a.order - b.order; });
    var html = '<div class="catalog-tabs" role="tablist" aria-label="페이즈 선택">';
    html += '<button class="catalog-tab js-phase-tab' + (currentPhaseFilter === "all" ? " catalog-tab--active" : "") + '" data-phase="all">전체</button>';
    for (var i = 0; i < sorted.length; i++) {
      var ph = sorted[i];
      html += '<button class="catalog-tab js-phase-tab' + (currentPhaseFilter === ph.id ? " catalog-tab--active" : "") +
        '" data-phase="' + ph.id + '">' + ph.name.replace(/Phase (\d+): (.*)/, "P$1 $2") + '</button>';
    }
    return html + '</div>';
  }

  function renderLearnMobileTabs(route) {
    var project = data.projects.find(function (p) { return p.id === route.projectId; });
    if (!project) return "";
    var html = '<div class="catalog-tabs" role="tablist" aria-label="학습 탭">';
    html += '<a href="#catalog" class="catalog-tab">\u2190</a>';
    for (var i = 0; i < LEARN_TABS.length; i++) {
      var t = LEARN_TABS[i];
      html += '<a href="#learn/' + project.id + '/' + t.id + '" class="catalog-tab' +
        (t.id === route.tab ? " catalog-tab--active" : "") + '">' + t.label + '</a>';
    }
    return html + '</div>';
  }

  // ============================================================
  // 카탈로그 사이드바
  // ============================================================

  function renderFilterPills() {
    var sp = [{ v: "all", l: "전체" }, { v: "completed", l: "완료" }, { v: "in-progress", l: "진행중" }, { v: "planned", l: "예정" }]
      .map(function (o) { return '<button class="filter-pill js-status-pill' + (currentStatusFilter === o.v ? " filter-pill--active" : "") + '" data-status="' + o.v + '">' + o.l + '</button>'; }).join("");
    var dp = [{ v: "all", l: "전체" }, { v: "1", l: "쉬움" }, { v: "2", l: "보통" }, { v: "3", l: "어려움" }]
      .map(function (o) { return '<button class="filter-pill js-diff-pill' + (currentDifficultyFilter === o.v ? " filter-pill--active" : "") + '" data-difficulty="' + o.v + '">' + o.l + '</button>'; }).join("");
    return '<div class="filter-pills-group">' + sp + '</div><div class="filter-pills-group">' + dp + '</div>';
  }

  function renderCatalogSidebar() {
    var total = data.projects.length;
    var completed = data.projects.filter(function (p) { return p.status === "completed"; }).length;
    var pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    var sorted = data.phases.slice().sort(function (a, b) { return a.order - b.order; });

    var nav = '<button class="catalog-nav-item js-phase-nav' + (currentPhaseFilter === "all" ? " catalog-nav-item--active" : "") +
      '" data-phase="all"><div class="catalog-nav-item__indicator" style="background:var(--accent-primary)"></div>' +
      '<div class="catalog-nav-item__label"><span class="catalog-nav-item__name">전체 보기</span>' +
      '<span class="catalog-nav-item__count">' + total + '</span></div></button>';

    for (var i = 0; i < sorted.length; i++) {
      var ph = sorted[i], prog = getPhaseProgress(ph.id);
      nav += '<button class="catalog-nav-item js-phase-nav' + (currentPhaseFilter === ph.id ? " catalog-nav-item--active" : "") +
        '" data-phase="' + ph.id + '"><div class="catalog-nav-item__indicator" style="background:' + ph.color + '"></div>' +
        '<div class="catalog-nav-item__label"><span class="catalog-nav-item__name">' + ph.name.replace(/Phase \d+: /, "") +
        '</span><span class="catalog-nav-item__count">' + prog.completed + '/' + prog.total + '</span></div></button>';
    }

    return '<aside class="catalog-sidebar" aria-label="카탈로그 네비게이션">' +
      '<div class="catalog-sidebar__stats">' + renderProgressRing(pct, 64) +
      '<div class="catalog-sidebar__stats-text">' + completed + '/' + total + ' 완료</div></div>' +
      '<nav class="catalog-sidebar__nav">' + nav + '</nav>' +
      '<div class="catalog-sidebar__search"><input type="search" class="catalog-sidebar__search-input js-search-input" id="search-desktop" placeholder="검색..." aria-label="프로젝트 검색" /></div>' +
      '<div class="catalog-sidebar__filters">' + renderFilterPills() + '</div></aside>';
  }

  // ============================================================
  // 학습 사이드바 (같은 .catalog-sidebar 컨테이너)
  // ============================================================

  function renderLearnSidebar(route) {
    var project = data.projects.find(function (p) { return p.id === route.projectId; });
    if (!project) return "";
    var phase = getPhaseById(project.phase);
    var phaseColor = phase ? phase.color : "#6366F1";
    var progress = getProjectLearnProgress(project.id);
    var pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
    var Challenges = window.StudioChallenges;

    var tabItems = LEARN_TABS.map(function (t) {
      var isActive = t.id === route.tab;
      var isDone = Challenges ? Challenges.isTabComplete(project.id, t.id) :
        localStorage.getItem("studio-progress-" + project.id + "-" + t.id) === "done";
      var indColor = isDone ? "var(--color-completed)" : isActive ? phaseColor : "var(--border-default)";
      var checkHTML = isDone ? '<span class="catalog-nav-item__count" style="color:var(--color-completed)">\u2713</span>' : '';
      return '<a href="#learn/' + project.id + '/' + t.id + '" class="catalog-nav-item' +
        (isActive ? ' catalog-nav-item--active' : '') + '" data-tab="' + t.id + '">' +
        '<div class="catalog-nav-item__indicator" style="background:' + indColor + '"></div>' +
        '<div class="catalog-nav-item__label"><span class="catalog-nav-item__name">' + t.label + '</span>' +
        checkHTML + '</div></a>';
    }).join('');

    var phaseName = phase ? phase.name.replace(/Phase \d+: /, "") : "";

    return '<aside class="catalog-sidebar" aria-label="학습 네비게이션">' +
      '<div class="catalog-sidebar__stats">' + renderProgressRing(pct, 64, phaseColor) +
      '<div class="catalog-sidebar__stats-number" style="color:' + phaseColor + '">' + project.number + '</div>' +
      '<div class="catalog-sidebar__stats-text" title="' + project.title + '">' + project.title + '</div></div>' +
      '<a href="#catalog" class="catalog-nav-item">' +
      '<div class="catalog-nav-item__indicator" style="background:var(--text-muted)"></div>' +
      '<div class="catalog-nav-item__label"><span class="catalog-nav-item__name">\u2190 대시보드</span></div></a>' +
      '<nav class="catalog-sidebar__nav" aria-label="' + phaseName + ' 탭">' + tabItems + '</nav></aside>';
  }

  // ============================================================
  // 카탈로그 메인 콘텐츠
  // ============================================================

  var cardIndex = 0;

  function fillCatalogMain(el) {
    cardIndex = 0;
    var filtered = getFilteredProjects();
    var sorted = data.phases.slice().sort(function (a, b) { return a.order - b.order; });

    var html = renderPhaseHero(currentPhaseFilter);
    html += renderNextRecommendation();

    // 모바일 필터
    html += '<div class="catalog-mobile-filters">' +
      '<input type="search" class="catalog-sidebar__search-input js-search-input" id="search-mobile" placeholder="검색..." aria-label="프로젝트 검색" />' +
      '<div class="catalog-mobile-filters__pills">' + renderFilterPills() + '</div></div>';

    if (filtered.length > 0) {
      if (currentPhaseFilter === "all") {
        for (var i = 0; i < sorted.length; i++) {
          var phase = sorted[i];
          var pp = filtered.filter(function (p) { return p.phase === phase.id; });
          if (pp.length === 0) continue;
          html += '<div class="phase-group"><div class="phase-group__label"><div class="phase-group__dot" style="background:' +
            phase.color + '"></div><span>' + phase.name + '</span></div>' +
            '<div class="card-grid">' + pp.map(renderCardV3).join("") + '</div></div>';
        }
      } else {
        html += '<div class="card-grid">' + filtered.map(renderCardV3).join("") + '</div>';
      }
      html += renderLearningPath();
    } else {
      html += renderEmptyState();
    }
    el.innerHTML = html; // eslint-disable-line no-unsanitized/property
  }

  function getFilteredProjects() {
    return data.projects.filter(function (p) {
      if (currentPhaseFilter !== "all" && p.phase !== currentPhaseFilter) return false;
      if (currentStatusFilter !== "all" && p.status !== currentStatusFilter) return false;
      if (currentDifficultyFilter !== "all" && p.difficulty !== Number(currentDifficultyFilter)) return false;
      if (searchQuery) {
        var q = searchQuery.toLowerCase();
        if ([p.title, p.subtitle, p.description].concat(p.concepts).join(" ").toLowerCase().indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  function renderPhaseHero(phaseId) {
    var total, completed, pct, grad, color, label, title, desc;
    if (phaseId === "all") {
      total = data.projects.length;
      completed = data.projects.filter(function (p) { return p.status === "completed"; }).length;
      pct = total > 0 ? Math.round((completed / total) * 100) : 0;
      grad = phaseGradients["phase-1"];
      label = "전체 커리큘럼"; title = "Claude Code 학습 스튜디오";
      desc = "클로드 코드의 핵심 도구들부터 심화 활용까지 단계별로 배워보세요";
    } else {
      var phase = getPhaseById(phaseId);
      if (!phase) return "";
      var prog = getPhaseProgress(phaseId);
      total = prog.total; completed = prog.completed;
      pct = total > 0 ? Math.round((completed / total) * 100) : 0;
      grad = phaseGradients[phaseId] || { start: phase.color, end: phase.color };
      label = phase.name.split(":")[0]; title = phase.name.replace(/Phase \d+: /, ""); desc = phase.description;
    }
    return '<div class="catalog-hero" style="background:linear-gradient(135deg,' + hexToRgba(grad.start, 0.1) + ',' + hexToRgba(grad.end, 0.05) + ')">' +
      '<div class="catalog-hero__number" style="color:' + grad.start + '">' + label + '</div>' +
      '<div class="catalog-hero__title">' + title + '</div>' +
      '<div class="catalog-hero__desc">' + desc + '</div>' +
      '<div class="catalog-hero__progress"><div class="catalog-hero__progress-bar" style="background:' + hexToRgba(grad.start, 0.15) + '">' +
      '<div class="catalog-hero__progress-fill" style="width:' + pct + '%;background:linear-gradient(90deg,' + grad.start + ',' + grad.end + ')"></div></div>' +
      '<span class="catalog-hero__progress-text">' + completed + '/' + total + ' 완료</span></div></div>';
  }

  function renderNextRecommendation() {
    var sorted = data.projects.slice().sort(function (a, b) { return a.number.localeCompare(b.number); });
    var next = sorted.find(function (p) { return p.status === "in-progress"; }) || sorted.find(function (p) { return p.status === "planned"; });
    if (!next) return "";
    return '<div class="catalog-next js-next-recommend" data-id="' + next.id + '" tabindex="0" role="link" aria-label="다음 추천: ' + next.title + '">' +
      '<div><div class="catalog-next__label">다음 추천</div><div class="catalog-next__card">' + next.number + ' ' + next.title + '</div></div>' +
      '<span class="catalog-next__arrow">\u2192</span></div>';
  }

  function renderCardV3(project) {
    var phase = getPhaseById(project.phase);
    var phaseColor = phase ? phase.color : "#94A3B8";
    var grad = phaseGradients[project.phase] || { start: "#6366F1", end: "#A855F7" };
    var diffBlocks = "";
    for (var i = 1; i <= 3; i++) diffBlocks += '<div class="card-v3__diff-block' + (i <= project.difficulty ? " card-v3__diff-block--filled" : "") + '"></div>';
    var learnProg = getProjectLearnProgress(project.id);
    var learnPct = learnProg.total > 0 ? Math.round((learnProg.completed / learnProg.total) * 100) : 0;
    var progressHTML = learnPct > 0 ? '<div class="card-v3__progress-ring" title="학습 ' + learnPct + '%">' + renderProgressRing(learnPct, 28) + '</div>' : '';
    var delay = (cardIndex++ * 0.04).toFixed(2);
    return '<article class="card-v3" data-id="' + project.id + '" data-status="' + project.status + '" data-difficulty="' + project.difficulty +
      '" data-phase="' + project.phase + '" tabindex="0" aria-label="' + project.title +
      '" style="--card-phase-start:' + grad.start + ';--card-phase-end:' + grad.end + ';--card-glow:' + hexToRgba(phaseColor, 0.15) + ';animation-delay:' + delay + 's">' +
      '<div class="card-v3__header"><span class="card-v3__number">' + project.number + '</span>' +
      '<span class="card-v3__status-dot card-v3__status-dot--' + project.status + '" title="' + statusLabels[project.status] + '"></span></div>' +
      '<div class="card-v3__title">' + project.title + '</div>' +
      '<div class="card-v3__subtitle">' + (project.subtitle || '') + '</div>' +
      '<div class="card-v3__footer"><div class="card-v3__diff-bar" aria-label="난이도 ' + project.difficulty + '">' + diffBlocks + '</div>' + progressHTML + '</div></article>';
  }

  function renderLearningPath() {
    var sorted = data.phases.slice().sort(function (a, b) { return a.order - b.order; });
    var html = '<div class="learning-path"><h3 class="learning-path__title">학습 경로</h3>';
    for (var i = 0; i < sorted.length; i++) {
      var phase = sorted[i];
      var pp = data.projects.filter(function (p) { return p.phase === phase.id; }).sort(function (a, b) { return a.number.localeCompare(b.number); });
      if (pp.length === 0) continue;
      html += '<div class="path-group"><div class="path-group__header"><div class="path-group__indicator" style="background:' + phase.color + '"></div>' + phase.name + '</div><div class="path-nodes">';
      for (var j = 0; j < pp.length; j++) {
        html += '<a href="#learn/' + pp[j].id + '" class="path-node path-node--' + pp[j].status + '">' +
          '<span class="path-node__number">' + pp[j].number + '</span><span class="path-node__title">' + pp[j].title + '</span></a>';
      }
      html += '</div></div>';
    }
    return html + '</div>';
  }

  function renderEmptyState() {
    return '<div class="empty-state"><div class="empty-state__icon">\uD83D\uDD0D</div><p class="empty-state__text">검색 결과가 없습니다</p><p class="empty-state__hint">다른 키워드나 필터를 시도해보세요</p></div>';
  }

  // ============================================================
  // 학습 메인 콘텐츠
  // ============================================================

  function fillLearnMain(mainEl, route) {
    var project = data.projects.find(function (p) { return p.id === route.projectId; });
    if (!project) { navigateTo("catalog"); return; }
    var content = window.STUDIO_CONTENT && window.STUDIO_CONTENT[route.projectId];
    if (!content) {
      mainEl.innerHTML = '<div class="empty-state"><p>콘텐츠를 불러올 수 없습니다.</p><a href="#catalog">대시보드로 돌아가기</a></div>'; // eslint-disable-line no-unsanitized/property
      return;
    }
    // Phase 색상을 CSS 변수로 전달
    var phase = getPhaseById(project.phase);
    var phaseColor = phase ? phase.color : "#6366F1";
    var grad = phaseGradients[project.phase] || { start: "#6366F1", end: "#A855F7" };
    mainEl.style.setProperty("--learn-phase-color", phaseColor);
    mainEl.style.setProperty("--learn-phase-start", grad.start);
    mainEl.style.setProperty("--learn-phase-end", grad.end);

    if (window.StudioLearn) {
      window.StudioLearn.render(mainEl, project, content, route);
    }
  }

  // ============================================================
  // 이벤트 바인딩 (카탈로그)
  // ============================================================

  function bindCatalogEvents() {
    document.querySelectorAll(".js-search-input").forEach(function (input) {
      input.value = searchQuery;
      input.addEventListener("input", function (e) {
        searchQuery = e.target.value.trim();
        var inputId = e.target.id;
        renderShell(parseHash());
        var el = document.getElementById(inputId);
        if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
      });
    });

    document.querySelectorAll(".js-phase-nav").forEach(function (btn) {
      btn.addEventListener("click", function () { currentPhaseFilter = btn.dataset.phase; renderShell(parseHash()); });
    });
    document.querySelectorAll(".js-phase-tab").forEach(function (btn) {
      btn.addEventListener("click", function () { currentPhaseFilter = btn.dataset.phase; renderShell(parseHash()); });
    });
    document.querySelectorAll(".js-status-pill").forEach(function (btn) {
      btn.addEventListener("click", function () { currentStatusFilter = btn.dataset.status; renderShell(parseHash()); });
    });
    document.querySelectorAll(".js-diff-pill").forEach(function (btn) {
      btn.addEventListener("click", function () { currentDifficultyFilter = btn.dataset.difficulty; renderShell(parseHash()); });
    });

    var nextRec = document.querySelector(".js-next-recommend");
    if (nextRec) {
      nextRec.addEventListener("click", function () { navigateTo("learn/" + nextRec.dataset.id); });
      nextRec.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); nextRec.click(); } });
    }

    document.querySelectorAll(".card-v3").forEach(function (card) {
      card.addEventListener("click", function () {
        var pid = card.dataset.id;
        if (window.STUDIO_CONTENT && window.STUDIO_CONTENT[pid]) { navigateTo("learn/" + pid); }
        else { var p = data.projects.find(function (x) { return x.id === pid; }); if (p && p.path) window.location.href = p.path; }
      });
      card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); card.click(); } });
    });
  }

  // --- 테마 토글 ---
  function bindThemeToggle() {
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.addEventListener("click", toggleTheme);
  }

  // --- 초기화 ---
  function init() {
    initTheme();
    bindThemeToggle();
    if (window.StudioLevel) {
      var mount = document.getElementById("level-picker-mount");
      if (mount) mount.appendChild(window.StudioLevel.renderLevelPicker());
    }
    if (window.mermaid) {
      mermaid.initialize({ startOnLoad: false, theme: document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "default" });
    }
    window.addEventListener("hashchange", handleRoute);
    handleRoute();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
