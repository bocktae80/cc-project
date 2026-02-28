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

  function render(container, project, content, route) {
    var tab = route.tab || "overview";

    var phase = window.STUDIO_DATA.phases.find(function(p) { return p.id === project.phase; });
    var phaseName = phase ? phase.name : "";

    var sidebarItems = buildSidebarItems(content, tab);
    var progress = getProgress(project.id);

    // DOM API로 구조 생성
    var layout = document.createElement("div");
    layout.className = "learn-layout";
    layout.appendChild(buildSidebarDOM(project, tab, sidebarItems, progress, phaseName));

    var main = document.createElement("div");
    main.className = "learn-main";
    main.appendChild(buildHeaderDOM(project, phaseName));
    main.appendChild(buildTabBarDOM(project.id, tab));

    var contentEl = document.createElement("div");
    contentEl.className = "learn-content";
    contentEl.dataset.project = project.id;
    contentEl.dataset.tab = tab;
    // 탭 콘텐츠는 마크다운이므로 DOMPurify를 통해 sanitize된 HTML 삽입
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

    main.appendChild(contentEl);
    layout.appendChild(main);

    container.textContent = "";
    container.appendChild(layout);

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

  function buildSidebarItems(content, tab) {
    switch (tab) {
      case "concepts":
        return (content.concepts || []).map(function(c) { return { id: c.id, title: c.title }; });
      case "tutorials":
        return (content.tutorials || []).map(function(t) { return { id: t.id, title: t.title }; });
      case "examples":
        return (content.examples || []).map(function(e) { return { id: e.id, title: e.title }; });
      case "quiz":
        return (content.quiz || []).map(function(q, i) { return { id: "q" + i, title: "문제 " + (i + 1) }; });
      default:
        return [];
    }
  }

  function buildSidebarDOM(project, activeTab, items, progress, phaseName) {
    var Challenges = window.StudioChallenges;
    var aside = document.createElement("aside");
    aside.className = "learn-sidebar";

    var back = document.createElement("a");
    back.href = "#catalog";
    back.className = "learn-sidebar__back";
    back.textContent = "← 대시보드";
    aside.appendChild(back);

    var tabsWrap = document.createElement("div");
    tabsWrap.className = "learn-sidebar__tabs";

    TABS.forEach(function(t) {
      var isActive = t.id === activeTab;
      var isDone = Challenges ? Challenges.isTabComplete(project.id, t.id) :
        localStorage.getItem("studio-progress-" + project.id + "-" + t.id) === "done";

      var a = document.createElement("a");
      a.href = "#learn/" + project.id + "/" + t.id;
      a.className = "learn-sidebar__tab" + (isActive ? " learn-sidebar__tab--active" : "") + (isDone ? " learn-sidebar__tab--done" : "");
      a.dataset.tab = t.id;

      var icon = document.createElement("span");
      icon.className = "learn-sidebar__tab-icon";
      icon.textContent = t.icon;
      a.appendChild(icon);

      var label = document.createElement("span");
      label.textContent = t.label;
      a.appendChild(label);

      if (isDone) {
        var check = document.createElement("span");
        check.className = "learn-sidebar__check";
        check.textContent = "✓";
        a.appendChild(check);
      }
      tabsWrap.appendChild(a);
    });
    aside.appendChild(tabsWrap);

    if (items.length > 0) {
      var itemsWrap = document.createElement("div");
      itemsWrap.className = "learn-sidebar__items";
      items.forEach(function(item) {
        var a2 = document.createElement("a");
        a2.href = "#" + item.id;
        a2.className = "learn-sidebar__item";
        a2.dataset.item = item.id;
        a2.textContent = item.title;
        itemsWrap.appendChild(a2);
      });
      aside.appendChild(itemsWrap);
    }

    var pct = Math.round((progress.completed / progress.total) * 100);
    var progWrap = document.createElement("div");
    progWrap.className = "learn-sidebar__progress";

    var progLabel = document.createElement("div");
    progLabel.className = "learn-sidebar__progress-label";
    progLabel.textContent = "진행률";
    progWrap.appendChild(progLabel);

    var progBar = document.createElement("div");
    progBar.className = "learn-sidebar__progress-bar";
    var progFill = document.createElement("div");
    progFill.className = "learn-sidebar__progress-fill";
    progFill.style.width = pct + "%";
    progBar.appendChild(progFill);
    progWrap.appendChild(progBar);

    var progText = document.createElement("div");
    progText.className = "learn-sidebar__progress-text";
    progText.textContent = pct + "% (" + progress.completed + "/" + progress.total + ")";
    progWrap.appendChild(progText);

    aside.appendChild(progWrap);
    return aside;
  }

  function buildHeaderDOM(project, phaseName) {
    var header = document.createElement("div");
    header.className = "learn-header";

    var back = document.createElement("a");
    back.href = "#catalog";
    back.className = "learn-header__back";
    back.textContent = "← 대시보드";
    header.appendChild(back);

    var title = document.createElement("h1");
    title.className = "learn-header__title";
    title.textContent = project.title;
    header.appendChild(title);

    var meta = document.createElement("div");
    meta.className = "learn-header__meta";
    var stars = document.createElement("span");
    stars.textContent = "⭐".repeat(project.difficulty);
    meta.appendChild(stars);
    var phaseEl = document.createElement("span");
    phaseEl.className = "learn-header__phase";
    phaseEl.textContent = phaseName;
    meta.appendChild(phaseEl);
    header.appendChild(meta);

    return header;
  }

  function buildTabBarDOM(projectId, activeTab) {
    var nav = document.createElement("nav");
    nav.className = "learn-tab-bar";
    nav.setAttribute("role", "tablist");

    TABS.forEach(function(t) {
      var a = document.createElement("a");
      a.href = "#learn/" + projectId + "/" + t.id;
      a.className = "learn-tab" + (t.id === activeTab ? " learn-tab--active" : "");
      a.setAttribute("role", "tab");
      a.setAttribute("aria-selected", String(t.id === activeTab));
      a.textContent = t.icon + " " + t.label;
      nav.appendChild(a);
    });

    return nav;
  }

  function renderTabContent(project, content, tab) {
    switch (tab) {
      case "overview": return renderOverview(content);
      case "concepts": return renderConcepts(content);
      case "tutorials": return renderTutorials(content);
      case "examples": return renderExamples(content);
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

  function renderExamples(content) {
    if (!content.examples || content.examples.length === 0) return '<p>예제가 없습니다.</p>';
    return content.examples.map(function(ex) {
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

    // 사이드바 아이템 → 스크롤
    document.querySelectorAll(".learn-sidebar__item").forEach(function(item) {
      item.addEventListener("click", function(e) {
        e.preventDefault();
        var target = document.getElementById(item.dataset.item);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    // 기존 터미널
    if (window.StudioTerminal) window.StudioTerminal.bindEvents();

    // 퀴즈
    if (tab === "quiz" && window.StudioQuiz) {
      window.StudioQuiz.bindEvents(project.id, content.quiz);
    }

    // 탭 완료 이벤트 → 사이드바 실시간 업데이트
    window.addEventListener("tab-complete", function onComplete(e) {
      if (e.detail && e.detail.projectId === project.id) {
        var tabEl = document.querySelector('.learn-sidebar__tab[data-tab="' + e.detail.tab + '"]');
        if (tabEl && !tabEl.classList.contains("learn-sidebar__tab--done")) {
          tabEl.classList.add("learn-sidebar__tab--done");
          var check = document.createElement("span");
          check.className = "learn-sidebar__check";
          check.textContent = "✓";
          tabEl.appendChild(check);

          var prog = getProgress(project.id);
          var pct = Math.round((prog.completed / prog.total) * 100);
          var fillEl = document.querySelector(".learn-sidebar__progress-fill");
          var textEl = document.querySelector(".learn-sidebar__progress-text");
          if (fillEl) fillEl.style.width = pct + "%";
          if (textEl) textEl.textContent = pct + "% (" + prog.completed + "/" + prog.total + ")";
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
