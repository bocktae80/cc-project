// Claude Code 학습 스튜디오 — 학습자 레벨 시스템
// P1: 3단계 수용자 레벨 분화
(function () {
  "use strict";

  var LEVELS = [
    {
      id: 1,
      name: "입문",
      description: "비유와 그림으로 이해하기",
      target: "중학생, 완전 초보",
      icon: "🌱"
    },
    {
      id: 2,
      name: "탐구",
      description: "코드와 함께 이해하기",
      target: "호기심 있는 비개발자",
      icon: "🌿"
    },
    {
      id: 3,
      name: "실전",
      description: "전체 콘텐츠 보기",
      target: "개발자 초보",
      icon: "🌳"
    }
  ];

  var STORAGE_KEY = "studio-user-level";
  var currentLevel = 2; // 기본값: 탐구

  // --- 초기화 ---
  function init() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      var parsed = parseInt(saved, 10);
      if (parsed >= 1 && parsed <= 3) currentLevel = parsed;
    }
    applyLevel(currentLevel);
  }

  // --- 레벨 적용 ---
  function applyLevel(level) {
    currentLevel = level;
    document.documentElement.setAttribute("data-level", String(level));
    localStorage.setItem(STORAGE_KEY, String(level));
  }

  // --- 레벨 변경 ---
  function setLevel(level) {
    if (level < 1 || level > 3) return;
    applyLevel(level);
    // 커스텀 이벤트로 다른 모듈에 알림
    window.dispatchEvent(new CustomEvent("level-change", { detail: { level: level } }));
  }

  // --- 현재 레벨 ---
  function getLevel() {
    return currentLevel;
  }

  // --- 레벨 정보 ---
  function getLevelInfo(level) {
    return LEVELS.find(function (l) { return l.id === (level || currentLevel); }) || LEVELS[1];
  }

  // --- 레벨 선택 UI 렌더 (헤더용) ---
  function renderLevelPicker() {
    var info = getLevelInfo();

    var wrap = document.createElement("div");
    wrap.className = "level-picker";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "학습 레벨 선택");

    var currentBtn = document.createElement("button");
    currentBtn.className = "level-picker__current";
    currentBtn.setAttribute("aria-expanded", "false");
    currentBtn.setAttribute("aria-haspopup", "listbox");
    currentBtn.textContent = info.icon + " " + info.name;

    var dropdown = document.createElement("div");
    dropdown.className = "level-picker__dropdown";
    dropdown.setAttribute("role", "listbox");

    LEVELS.forEach(function (lvl) {
      var option = document.createElement("button");
      option.className = "level-picker__option" + (lvl.id === currentLevel ? " level-picker__option--active" : "");
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", String(lvl.id === currentLevel));
      option.dataset.level = String(lvl.id);

      var labelEl = document.createElement("span");
      labelEl.className = "level-picker__option-label";
      labelEl.textContent = lvl.icon + " " + lvl.name;
      option.appendChild(labelEl);

      var descEl = document.createElement("span");
      descEl.className = "level-picker__option-desc";
      descEl.textContent = lvl.description;
      option.appendChild(descEl);

      var targetEl = document.createElement("span");
      targetEl.className = "level-picker__option-target";
      targetEl.textContent = lvl.target;
      option.appendChild(targetEl);

      option.addEventListener("click", function () {
        setLevel(lvl.id);
        currentBtn.textContent = lvl.icon + " " + lvl.name;
        dropdown.querySelectorAll(".level-picker__option").forEach(function (opt) {
          var isActive = opt.dataset.level === String(lvl.id);
          opt.classList.toggle("level-picker__option--active", isActive);
          opt.setAttribute("aria-selected", String(isActive));
        });
        dropdown.classList.remove("level-picker__dropdown--open");
        currentBtn.setAttribute("aria-expanded", "false");
      });

      dropdown.appendChild(option);
    });

    currentBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = dropdown.classList.toggle("level-picker__dropdown--open");
      currentBtn.setAttribute("aria-expanded", String(isOpen));
    });

    // 외부 클릭으로 닫기
    document.addEventListener("click", function () {
      dropdown.classList.remove("level-picker__dropdown--open");
      currentBtn.setAttribute("aria-expanded", "false");
    });

    wrap.addEventListener("click", function (e) { e.stopPropagation(); });

    wrap.appendChild(currentBtn);
    wrap.appendChild(dropdown);
    return wrap;
  }

  // --- 콘텐츠에 레벨 마크업 적용 ---
  // 마크다운 내 특수 태그를 레벨 클래스로 변환
  // <!-- level:2 --> ... <!-- /level --> 형태
  function processLevelContent(html) {
    // <!-- level:N --> ... <!-- /level --> 패턴을 div로 변환
    return html.replace(
      /<!--\s*level:(\d)\s*-->([\s\S]*?)<!--\s*\/level\s*-->/g,
      function (match, level, content) {
        return '<div class="level-content level-' + level + '-only">' + content + '</div>';
      }
    );
  }

  // --- 콘텐츠 난이도에 따른 권장 레벨 ---
  function getRecommendedLevel(difficulty) {
    if (difficulty <= 1) return 1;
    if (difficulty <= 2) return 2;
    return 3;
  }

  // --- 초기화 실행 ---
  init();

  // ============================================================
  // 공개 API
  // ============================================================
  window.StudioLevel = {
    getLevel: getLevel,
    setLevel: setLevel,
    getLevelInfo: getLevelInfo,
    renderLevelPicker: renderLevelPicker,
    processLevelContent: processLevelContent,
    getRecommendedLevel: getRecommendedLevel,
    LEVELS: LEVELS
  };
})();
