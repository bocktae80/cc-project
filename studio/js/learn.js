// Claude Code 학습 스튜디오 — 학습 뷰
// v2: 챌린지 기반 진행률 + 레벨 기반 콘텐츠 + 상태 기반 샌드박스
(function () {
  "use strict";

  var TABS = [
    { id: "overview", label: "개요", icon: "📖" },
    { id: "concepts", label: "개념", icon: "💡" },
    { id: "tutorials", label: "실습", icon: "🔧" },
    { id: "examples", label: "예제", icon: "💻" },
    { id: "quiz", label: "퀴즈", icon: "❓" }
  ];

  // Phase 그래디언트 맵
  var PHASE_GRADIENTS = {
    "phase-1": { start: "#3B82F6", end: "#60A5FA" },
    "phase-2": { start: "#8B5CF6", end: "#A78BFA" },
    "phase-3": { start: "#EC4899", end: "#F472B6" },
    "phase-4": { start: "#F59E0B", end: "#FBBF24" },
    "phase-5": { start: "#EF4444", end: "#F87171" },
    "phase-6": { start: "#10B981", end: "#34D399" }
  };

  function render(container, project, content, route) {
    var tab = route.tab || "overview";

    var phase = window.STUDIO_DATA.phases.find(function(p) { return p.id === project.phase; });
    var phaseName = phase ? phase.name : "";
    var phaseColor = phase ? phase.color : "#6366F1";
    var grad = PHASE_GRADIENTS[project.phase] || { start: "#6366F1", end: "#A855F7" };

    var progress = getProgress(project.id);

    // 히어로 배너 (catalog-hero 재사용)
    container.appendChild(buildHeroDOM(project, phaseName, phaseColor, grad, progress));

    // 콘텐츠
    var contentEl = document.createElement("div");
    contentEl.className = "learn-content";
    contentEl.dataset.project = project.id;
    contentEl.dataset.tab = tab;
    var sanitizedContent = renderTabContent(project, content, tab);
    if (window.DOMPurify) {
      contentEl.innerHTML = window.DOMPurify.sanitize(sanitizedContent, {
        ADD_TAGS: ["div", "input", "button", "label", "section", "hr", "nav", "span", "a"],
        ADD_ATTR: ["class", "id", "data-level", "data-terminal-id", "data-output",
          "data-copy", "data-terminal", "data-sandbox-id", "data-type", "data-sandbox",
          "data-initial-files", "data-challenges", "data-scenario", "data-decision",
          "data-commands", "data-hint", "data-check-id", "data-question", "data-option",
          "data-index", "data-project", "data-bound", "role", "aria-label", "aria-selected",
          "type", "placeholder", "autocomplete", "spellcheck", "checked", "disabled", "title",
          "href", "style", "tabindex"]
      });
    } else {
      contentEl.innerHTML = sanitizedContent;
    }
    container.appendChild(contentEl);

    postRender(project, content, tab);
  }

  function postRender(project, content, tab) {
    bindLearnEvents(project, content, tab);
    highlightCode();
    renderMermaid();

    // 새 샌드박스 엔진 바인딩
    if (window.SandboxEngine) window.SandboxEngine.bindEvents();

    // 챌린지: 탭별 완료 요소 삽입
    insertChallengeElements(project, content, tab);

    // 퀴즈 완료 체크
    if (tab === "quiz" && window.StudioChallenges) {
      window.StudioChallenges.checkQuizCompletion(project.id);
    }
  }

  function hexToRgba(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  }

  function buildHeroDOM(project, phaseName, phaseColor, grad, progress) {
    var header = document.createElement("div");
    header.className = "learn-hero";
    header.style.background = "linear-gradient(135deg, " +
      hexToRgba(grad.start, 0.08) + ", " + hexToRgba(grad.end, 0.02) + ")";

    // 장식 번호
    var bigNum = document.createElement("div");
    bigNum.className = "learn-hero__bg-number";
    bigNum.textContent = project.number;
    bigNum.style.color = phaseColor;
    header.appendChild(bigNum);

    // 상단 라인: Phase + 메타 (한 줄)
    var topLine = document.createElement("div");
    topLine.className = "learn-hero__top";

    var phaseTag = document.createElement("span");
    phaseTag.className = "learn-hero__phase";
    phaseTag.style.color = phaseColor;
    phaseTag.textContent = phaseName.replace(/Phase \d+: /, "");
    topLine.appendChild(phaseTag);

    // 난이도 도트
    var diffWrap = document.createElement("span");
    diffWrap.className = "learn-hero__diff";
    for (var i = 1; i <= 3; i++) {
      var block = document.createElement("span");
      block.className = "learn-hero__diff-dot" + (i <= project.difficulty ? " learn-hero__diff-dot--filled" : "");
      if (i <= project.difficulty) block.style.background = phaseColor;
      diffWrap.appendChild(block);
    }
    topLine.appendChild(diffWrap);

    if (project.estimatedMinutes) {
      var timeEl = document.createElement("span");
      timeEl.className = "learn-hero__time";
      timeEl.textContent = "~" + project.estimatedMinutes + "\uBD84";
      topLine.appendChild(timeEl);
    }

    header.appendChild(topLine);

    // 타이틀
    var title = document.createElement("h1");
    title.className = "learn-hero__title";
    title.textContent = project.title;
    header.appendChild(title);

    // 서브타이틀 (짧게)
    if (project.subtitle) {
      var sub = document.createElement("p");
      sub.className = "learn-hero__subtitle";
      sub.textContent = project.subtitle;
      header.appendChild(sub);
    }

    return header;
  }

  // 구 함수명 호환 (다른 곳에서 참조할 경우 대비)
  var buildHeaderDOM = buildHeroDOM;

  function renderTabContent(project, content, tab) {
    switch (tab) {
      case "overview": return renderOverview(content);
      case "concepts": return renderConcepts(content);
      case "tutorials": return renderTutorials(content);
      case "examples": return renderExamples(project, content);
      case "quiz": return renderQuiz(project, content);
      default: return renderOverview(content);
    }
  }

  function renderOverview(content) {
    if (!content.overview) return '<p>개요가 없습니다.</p>';
    return '<div class="learn-article">' + renderMarkdown(content.overview) + '</div>' +
      '<div id="challenge-mount"></div>';
  }

  function renderConcepts(content) {
    if (!content.concepts || content.concepts.length === 0) return '<p>개념 설명이 없습니다.</p>';
    var html = content.concepts.map(function(concept) {
      return '<section class="learn-section" id="' + escapeAttr(concept.id) + '">' +
        '<h2 class="learn-section__title">' + escapeHtml(concept.title) + '</h2>' +
        '<div class="learn-article">' + renderMarkdown(concept.content) + '</div></section>';
    }).join('<hr class="learn-divider" />');
    return html + '<div id="challenge-mount"></div>';
  }

  function renderTutorials(content) {
    if (!content.tutorials || content.tutorials.length === 0) return '<p>실습 가이드가 없습니다.</p>';

    var tutorialsHTML = content.tutorials.map(function(tut, idx) {
      var terminalsHTML = "";
      if (tut.terminals && tut.terminals.length > 0) {
        terminalsHTML = tut.terminals.map(function(t) {
          return window.StudioTerminal
            ? window.StudioTerminal.render(t.command, t.output)
            : '<pre><code>' + escapeHtml(t.command) + '</code></pre>';
        }).join("");
      }
      return '<section class="learn-section" id="' + escapeAttr(tut.id) + '">' +
        '<div class="learn-step-badge">Step ' + (idx + 1) + '</div>' +
        '<h2 class="learn-section__title">' + escapeHtml(tut.title) + '</h2>' +
        '<div class="learn-article">' + renderMarkdown(tut.content) + '</div>' +
        terminalsHTML + '</section>';
    }).join('<hr class="learn-divider" />');

    var sandboxHTML = buildSandbox(content);
    return tutorialsHTML + sandboxHTML + '<div id="challenge-mount"></div>';
  }

  function buildSandbox(content) {
    // 1. 새 엔진: content.sandboxEngine
    if (content.sandboxEngine && window.SandboxEngine) {
      var engine = content.sandboxEngine;
      var renderedSandbox = "";

      if (engine.type === "vfs") renderedSandbox = window.SandboxEngine.renderVFS(engine);
      else if (engine.type === "scenario") renderedSandbox = window.SandboxEngine.renderScenario(engine);
      else if (engine.type === "decision") renderedSandbox = window.SandboxEngine.renderDecision(engine);

      if (renderedSandbox) {
        return '<hr class="learn-divider" />' +
          '<section class="learn-section" id="sandbox">' +
          '<h2 class="learn-section__title">🎮 직접 해보기</h2>' +
          '<p class="learn-sandbox-desc">' + escapeHtml(engine.description || "아래 터미널에서 직접 실습해보세요.") + '</p>' +
          renderedSandbox + '</section>';
      }
    }

    // 2. 기존 방식
    if (!window.StudioTerminal || !window.StudioTerminal.renderSandbox) return "";

    if (content.sandbox) {
      return '<hr class="learn-divider" />' +
        '<section class="learn-section" id="sandbox">' +
        '<h2 class="learn-section__title">🎮 직접 해보기</h2>' +
        '<p class="learn-sandbox-desc">위에서 배운 명령어를 직접 입력해보세요. <code>도움말</code>을 치면 사용 가능한 명령어 목록을 볼 수 있어요.</p>' +
        window.StudioTerminal.renderSandbox(content.sandbox.commands, content.sandbox.hints) +
        '</section>';
    }

    // 3. 자동 수집
    var commands = {};
    var hints = [];
    var tutorials = content.tutorials || [];
    for (var i = 0; i < tutorials.length; i++) {
      var terminals = tutorials[i].terminals || [];
      for (var j = 0; j < terminals.length; j++) {
        var t = terminals[j];
        commands[t.command] = t.output;
        if (hints.length < 5) hints.push(t.command);
      }
    }
    if (Object.keys(commands).length === 0) return "";

    return '<hr class="learn-divider" />' +
      '<section class="learn-section" id="sandbox">' +
      '<h2 class="learn-section__title">🎮 직접 해보기</h2>' +
      '<p class="learn-sandbox-desc">위에서 배운 명령어를 직접 입력해보세요. <code>도움말</code>을 치면 사용 가능한 명령어 목록을 볼 수 있어요.</p>' +
      window.StudioTerminal.renderSandbox(commands, hints) +
      '</section>';
  }

  function renderExamples(project, content) {
    if (!content.examples || content.examples.length === 0) return '<p>예제가 없습니다.</p>';
    var html = content.examples.map(function(ex) {
      var checklistHTML = "";
      if (ex.checklist && ex.checklist.length > 0) {
        checklistHTML = '<div class="learn-checklist">' +
          '<h4 class="learn-checklist__title">체크리스트</h4>' +
          ex.checklist.map(function(item, i) {
            var checkId = ex.id + "-check-" + i;
            var checked = localStorage.getItem("studio-check-" + checkId) === "true";
            return '<label class="learn-checklist__item">' +
              '<input type="checkbox" class="learn-checklist__input" data-check-id="' + escapeAttr(checkId) + '"' + (checked ? " checked" : "") + ' />' +
              '<span>' + escapeHtml(item) + '</span></label>';
          }).join("") + '</div>';
      }
      return '<section class="learn-section" id="' + escapeAttr(ex.id) + '">' +
        '<h2 class="learn-section__title">' + escapeHtml(ex.title) + '</h2>' +
        '<div class="learn-article">' + renderMarkdown(ex.content) + '</div>' +
        checklistHTML + '</section>';
    }).join('<hr class="learn-divider" />');

    if (project.relatedProjects && project.relatedProjects.length > 0) {
      html += '<hr class="learn-divider" />';
      html += '<section class="learn-section learn-related">';
      html += '<h2 class="learn-section__title">\uAD00\uB828 \uD29C\uD1A0\uB9AC\uC5BC</h2>';
      html += '<div class="learn-related__grid">';
      project.relatedProjects.forEach(function(rid) {
        var rp = window.STUDIO_DATA.projects.find(function(p) { return p.id === rid; });
        if (!rp) return;
        html += '<a href="#learn/' + escapeAttr(rid) + '/overview" class="learn-related__card">';
        html += '<span class="learn-related__number">' + escapeHtml(rp.number) + '</span>';
        html += '<span class="learn-related__title">' + escapeHtml(rp.title) + '</span>';
        html += '<span class="learn-related__sub">' + escapeHtml(rp.subtitle || '') + '</span>';
        html += '</a>';
      });
      html += '</div></section>';
    }

    return html;
  }

  function renderQuiz(project, content) {
    if (!content.quiz || content.quiz.length === 0) return '<p>퀴즈가 없습니다.</p>';
    if (window.StudioQuiz) return window.StudioQuiz.render(project.id, content.quiz);
    return '<p>퀴즈 모듈을 불러올 수 없습니다.</p>';
  }

  // --- 마크다운 렌더링 (DOMPurify + 레벨 처리) ---
  function renderMarkdown(md) {
    if (!md) return "";
    var raw = window.marked ? window.marked.parse(md) : md.replace(/\n/g, "<br>");
    if (window.StudioLevel) raw = window.StudioLevel.processLevelContent(raw);
    // DOMPurify는 최상위에서 한 번 적용하므로 여기서는 raw 반환
    return raw;
  }

  function highlightCode() {
    if (window.Prism) {
      setTimeout(function() {
        Prism.highlightAllUnder(document.querySelector(".learn-content") || document.body);
      }, 50);
    }
  }

  function renderMermaid() {
    if (!window.mermaid) return;
    var blocks = document.querySelectorAll(".learn-content pre code.language-mermaid");
    blocks.forEach(function(block) {
      var pre = block.parentElement;
      var container = document.createElement("div");
      container.className = "mermaid";
      container.textContent = block.textContent;
      pre.replaceWith(container);
    });
    setTimeout(function() {
      try { mermaid.run(); } catch (e) { /* ignore */ }
    }, 100);
  }

  // --- 챌린지 요소 삽입 ---
  function insertChallengeElements(project, content, tab) {
    var Challenges = window.StudioChallenges;
    if (!Challenges) return;

    var mount = document.getElementById("challenge-mount");

    switch (tab) {
      case "overview":
        if (mount) mount.appendChild(Challenges.renderConfirmButton(project.id, "overview"));
        break;
      case "concepts":
        if (mount) mount.appendChild(Challenges.renderConceptCheck(project.id, content.conceptChecks || null));
        break;
      case "tutorials":
        document.addEventListener("sandbox-complete", Challenges.watchSandboxComplete(project.id));
        if (mount && !document.querySelector(".sandbox--vfs, .sandbox--scenario, .sandbox--decision, .sandbox")) {
          mount.appendChild(Challenges.renderConfirmButton(project.id, "tutorials", "실습을 완료했어요"));
        }
        break;
      case "examples":
        var checklistItems = document.querySelectorAll(".learn-checklist__input");
        if (checklistItems.length > 0) {
          var watcher = Challenges.watchChecklist(project.id, checklistItems.length);
          checklistItems.forEach(function(input) { input.addEventListener("change", watcher); });
          watcher();
        }
        break;
    }
  }

  function bindLearnEvents(project, content, tab) {
    // 체크리스트 저장
    document.querySelectorAll(".learn-checklist__input").forEach(function(input) {
      input.addEventListener("change", function() {
        localStorage.setItem("studio-check-" + input.dataset.checkId, input.checked.toString());
      });
    });

    // 기존 터미널
    if (window.StudioTerminal) window.StudioTerminal.bindEvents();

    // 퀴즈
    if (tab === "quiz" && window.StudioQuiz) {
      window.StudioQuiz.bindEvents(project.id, content.quiz);
    }

    // 탭 완료 이벤트 → 사이드바 indicator 업데이트
    window.addEventListener("tab-complete", function onComplete(e) {
      if (e.detail && e.detail.projectId === project.id) {
        var navItem = document.querySelector('.catalog-nav-item[data-tab="' + e.detail.tab + '"]');
        if (navItem) {
          var ind = navItem.querySelector(".catalog-nav-item__indicator");
          if (ind) ind.style.background = "var(--color-completed)";
          var label = navItem.querySelector(".catalog-nav-item__label");
          if (label && !label.querySelector(".catalog-nav-item__count")) {
            var check = document.createElement("span");
            check.className = "catalog-nav-item__count";
            check.style.color = "var(--color-completed)";
            check.textContent = "\u2713";
            label.appendChild(check);
          }
        }
      }
    });
  }

  function getProgress(projectId) {
    if (window.StudioChallenges) return window.StudioChallenges.getProjectProgress(projectId);
    var completed = 0;
    for (var i = 0; i < TABS.length; i++) {
      if (localStorage.getItem("studio-progress-" + projectId + "-" + TABS[i].id) === "done") completed++;
    }
    return { completed: completed, total: TABS.length };
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  window.StudioLearn = { render: render };
})();
