// Claude Code 학습 스튜디오 — 챌린지 기반 진행률 시스템
// P1: "스크롤 = 완료" 대체 → 실제 학습 행동 기반 완료 인정
(function () {
  "use strict";

  // 탭별 완료 조건 정의
  var TAB_COMPLETION = {
    overview: {
      type: "confirm",        // "이해했어요" 버튼 클릭
      label: "이 내용을 이해했어요"
    },
    concepts: {
      type: "concept-check",  // 핵심 개념 확인 미니 체크
      minCorrect: 1           // 최소 1개 맞춰야 완료
    },
    tutorials: {
      type: "sandbox",        // 샌드박스 미션 완료
      fallback: "confirm"     // 샌드박스 없으면 확인 버튼
    },
    examples: {
      type: "checklist",      // 체크리스트 50% 이상 체크
      minRatio: 0.5
    },
    quiz: {
      type: "quiz-score",     // 퀴즈 60% 이상
      minRatio: 0.6
    }
  };

  // --- 진행률 저장 키 ---
  function storageKey(projectId, tab) {
    return "studio-progress-" + projectId + "-" + tab;
  }

  function challengeStorageKey(projectId, tab) {
    return "studio-challenge-" + projectId + "-" + tab;
  }

  // --- 탭 완료 상태 확인 ---
  function isTabComplete(projectId, tab) {
    return localStorage.getItem(storageKey(projectId, tab)) === "done";
  }

  // --- 탭 완료 기록 ---
  function markTabComplete(projectId, tab) {
    localStorage.setItem(storageKey(projectId, tab), "done");
    window.dispatchEvent(new CustomEvent("tab-complete", {
      detail: { projectId: projectId, tab: tab }
    }));
  }

  // --- 프로젝트 진행률 ---
  function getProjectProgress(projectId) {
    var tabs = ["overview", "concepts", "tutorials", "examples", "quiz"];
    var completed = 0;
    tabs.forEach(function (tab) {
      if (isTabComplete(projectId, tab)) completed++;
    });
    return { completed: completed, total: tabs.length };
  }

  // --- 완료 확인 버튼 렌더 (overview, tutorials fallback) ---
  function renderConfirmButton(projectId, tab, label) {
    var isAlreadyDone = isTabComplete(projectId, tab);

    var wrap = document.createElement("div");
    wrap.className = "challenge-confirm";

    if (isAlreadyDone) {
      var doneMsg = document.createElement("div");
      doneMsg.className = "challenge-confirm__done";
      doneMsg.textContent = "완료됨";
      wrap.appendChild(doneMsg);
      return wrap;
    }

    var btn = document.createElement("button");
    btn.className = "challenge-confirm__btn";
    btn.textContent = label || TAB_COMPLETION[tab].label || "완료";
    btn.addEventListener("click", function () {
      markTabComplete(projectId, tab);
      btn.disabled = true;
      btn.textContent = "완료됨";
      btn.classList.add("challenge-confirm__btn--done");
    });
    wrap.appendChild(btn);
    return wrap;
  }

  // --- 개념 확인 미니 체크 렌더 ---
  function renderConceptCheck(projectId, conceptChecks) {
    if (!conceptChecks || conceptChecks.length === 0) {
      return renderConfirmButton(projectId, "concepts", "개념을 이해했어요");
    }

    var isAlreadyDone = isTabComplete(projectId, "concepts");

    var wrap = document.createElement("div");
    wrap.className = "challenge-concept-check";

    var title = document.createElement("div");
    title.className = "challenge-concept-check__title";
    title.textContent = "핵심 확인";
    wrap.appendChild(title);

    var answers = {};
    var savedRaw = localStorage.getItem(challengeStorageKey(projectId, "concepts"));
    if (savedRaw) {
      try { answers = JSON.parse(savedRaw); } catch (e) { /* */ }
    }

    conceptChecks.forEach(function (check, i) {
      var qDiv = document.createElement("div");
      qDiv.className = "concept-check-item";
      qDiv.dataset.index = String(i);

      var qText = document.createElement("div");
      qText.className = "concept-check-item__question";
      qText.textContent = check.question;
      qDiv.appendChild(qText);

      var optionsDiv = document.createElement("div");
      optionsDiv.className = "concept-check-item__options";

      check.options.forEach(function (opt, j) {
        var optBtn = document.createElement("button");
        optBtn.className = "concept-check-option";
        optBtn.textContent = opt;
        optBtn.dataset.question = String(i);
        optBtn.dataset.option = String(j);

        if (answers[i] !== undefined) {
          optBtn.disabled = true;
          if (j === check.answer) optBtn.classList.add("concept-check-option--correct");
          if (j === answers[i] && j !== check.answer) optBtn.classList.add("concept-check-option--wrong");
        }

        if (!isAlreadyDone) {
          optBtn.addEventListener("click", function () {
            if (qDiv.dataset.answered) return;
            qDiv.dataset.answered = "true";

            answers[i] = j;
            localStorage.setItem(challengeStorageKey(projectId, "concepts"), JSON.stringify(answers));

            optionsDiv.querySelectorAll(".concept-check-option").forEach(function (ob) {
              ob.disabled = true;
              var oi = parseInt(ob.dataset.option, 10);
              if (oi === check.answer) ob.classList.add("concept-check-option--correct");
              if (oi === j && j !== check.answer) ob.classList.add("concept-check-option--wrong");
            });

            // 모든 문제에 답했는지 확인
            var answeredCount = Object.keys(answers).length;
            if (answeredCount >= conceptChecks.length) {
              var correctCount = 0;
              conceptChecks.forEach(function (cc, ci) {
                if (answers[ci] === cc.answer) correctCount++;
              });
              if (correctCount >= (TAB_COMPLETION.concepts.minCorrect || 1)) {
                markTabComplete(projectId, "concepts");
              }
            }
          });
        }

        optionsDiv.appendChild(optBtn);
      });

      qDiv.appendChild(optionsDiv);
      wrap.appendChild(qDiv);
    });

    return wrap;
  }

  // --- 체크리스트 완료 감시 ---
  function watchChecklist(projectId, totalItems) {
    // 체크리스트 변경 시 완료율 체크
    return function onCheckChange() {
      var checkedCount = 0;
      document.querySelectorAll('.learn-checklist__input').forEach(function (input) {
        if (input.checked) checkedCount++;
      });
      var ratio = totalItems > 0 ? checkedCount / totalItems : 0;
      if (ratio >= (TAB_COMPLETION.examples.minRatio || 0.5)) {
        markTabComplete(projectId, "examples");
      }
    };
  }

  // --- 퀴즈 완료 감시 ---
  function checkQuizCompletion(projectId) {
    var raw = localStorage.getItem("studio-quiz-" + projectId);
    if (!raw) return false;
    try {
      var data = JSON.parse(raw);
      if (!data.completed) return false;
      var ratio = data.total > 0 ? data.score / data.total : 0;
      if (ratio >= (TAB_COMPLETION.quiz.minRatio || 0.6)) {
        markTabComplete(projectId, "quiz");
        return true;
      }
    } catch (e) { /* */ }
    return false;
  }

  // --- 샌드박스 완료 감시 ---
  function watchSandboxComplete(projectId) {
    return function (e) {
      if (e.detail) {
        markTabComplete(projectId, "tutorials");
      }
    };
  }

  // --- 전체 학습 진행률 ---
  function getOverallProgress(projects) {
    var total = 0, completed = 0;
    var tabs = ["overview", "concepts", "tutorials", "examples", "quiz"];
    projects.forEach(function (p) {
      tabs.forEach(function (tab) {
        total++;
        if (isTabComplete(p.id, tab)) completed++;
      });
    });
    return { total: total, completed: completed };
  }

  // --- 리셋 ---
  function resetProgress(projectId) {
    var tabs = ["overview", "concepts", "tutorials", "examples", "quiz"];
    tabs.forEach(function (tab) {
      localStorage.removeItem(storageKey(projectId, tab));
      localStorage.removeItem(challengeStorageKey(projectId, tab));
    });
    localStorage.removeItem("studio-quiz-" + projectId);
  }

  // ============================================================
  // 공개 API
  // ============================================================
  window.StudioChallenges = {
    isTabComplete: isTabComplete,
    markTabComplete: markTabComplete,
    getProjectProgress: getProjectProgress,
    getOverallProgress: getOverallProgress,
    renderConfirmButton: renderConfirmButton,
    renderConceptCheck: renderConceptCheck,
    watchChecklist: watchChecklist,
    checkQuizCompletion: checkQuizCompletion,
    watchSandboxComplete: watchSandboxComplete,
    resetProgress: resetProgress,
    TAB_COMPLETION: TAB_COMPLETION
  };
})();
