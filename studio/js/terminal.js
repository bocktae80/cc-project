// Claude Code 학습 스튜디오 — 터미널 시뮬레이터
(function () {
  "use strict";

  // --- 데모 터미널 (기존: 실행 버튼 → 재생) ---
  function render(command, output) {
    var id = "term-" + Math.random().toString(36).slice(2, 9);
    return '<div class="terminal" data-terminal-id="' + id + '">' +
      '<div class="terminal__header">' +
      '<div class="terminal__dots"><span></span><span></span><span></span></div>' +
      '<span class="terminal__title">Terminal</span>' +
      '<button class="terminal__copy" data-copy="' + escapeAttr(command) + '" title="복사">📋</button>' +
      '</div>' +
      '<div class="terminal__body">' +
      '<div class="terminal__line">' +
      '<span class="terminal__prompt">$</span>' +
      '<span class="terminal__command">' + escapeHtml(command) + '</span>' +
      '</div>' +
      '<div class="terminal__output" data-output="' + escapeAttr(output) + '" style="display:none;"></div>' +
      '</div>' +
      '<button class="terminal__run" data-terminal="' + id + '">▶ 실행</button>' +
      '</div>';
  }

  // --- 인터랙티브 샌드박스 (신규: 직접 타이핑) ---
  function renderSandbox(commands, hints) {
    var id = "sandbox-" + Math.random().toString(36).slice(2, 9);

    // commands를 data attribute로 저장
    var cmdData = escapeAttr(JSON.stringify(commands));
    var hintList = (hints || []).slice(0, 5);

    var hintChipsHTML = hintList.map(function(h) {
      return '<button class="sandbox__hint-chip" data-hint="' + escapeAttr(h) + '">' + escapeHtml(h) + '</button>';
    }).join("");

    return '<div class="sandbox" data-sandbox-id="' + id + '" data-commands="' + cmdData + '">' +
      '<div class="terminal__header">' +
      '<div class="terminal__dots"><span></span><span></span><span></span></div>' +
      '<span class="terminal__title">직접 해보기</span>' +
      '<button class="sandbox__clear" data-sandbox="' + id + '" title="초기화">🗑️</button>' +
      '</div>' +
      '<div class="sandbox__body" data-sandbox="' + id + '">' +
      '<div class="sandbox__history"></div>' +
      '<div class="sandbox__input-line">' +
      '<span class="terminal__prompt">$</span>' +
      '<input type="text" class="sandbox__input" data-sandbox="' + id + '" placeholder="명령어를 입력하세요..." autocomplete="off" spellcheck="false" />' +
      '</div>' +
      '</div>' +
      '<div class="sandbox__hints">' +
      '<span class="sandbox__hints-label">💡 시도해보세요:</span>' +
      hintChipsHTML +
      '</div>' +
      '</div>';
  }

  // --- 이벤트 바인딩 ---
  function bindEvents() {
    // 데모 터미널: 실행 버튼
    document.querySelectorAll(".terminal__run").forEach(function(btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "true";

      btn.addEventListener("click", function() {
        var termId = btn.dataset.terminal;
        var terminal = document.querySelector('[data-terminal-id="' + termId + '"]');
        if (!terminal) return;

        var outputEl = terminal.querySelector(".terminal__output");
        if (!outputEl) return;

        var outputText = outputEl.dataset.output;
        btn.disabled = true;
        btn.textContent = "실행중...";
        outputEl.style.display = "block";
        outputEl.textContent = "";

        typeText(outputEl, outputText, 0, function() {
          btn.textContent = "✓ 완료";
          btn.classList.add("terminal__run--done");
        });
      });
    });

    // 복사 버튼
    document.querySelectorAll(".terminal__copy").forEach(function(btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "true";

      btn.addEventListener("click", function(e) {
        e.stopPropagation();
        var text = btn.dataset.copy;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(function() {
            var orig = btn.textContent;
            btn.textContent = "✓";
            setTimeout(function() { btn.textContent = orig; }, 1500);
          });
        }
      });
    });

    // 인터랙티브 샌드박스
    document.querySelectorAll(".sandbox__input").forEach(function(input) {
      if (input.dataset.bound) return;
      input.dataset.bound = "true";

      var sandboxId = input.dataset.sandbox;
      var sandbox = document.querySelector('[data-sandbox-id="' + sandboxId + '"]');
      if (!sandbox) return;

      var commands = {};
      try { commands = JSON.parse(sandbox.dataset.commands); } catch (e) { /* ignore */ }

      // 명령어 히스토리
      var cmdHistory = [];
      var historyIndex = -1;

      input.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
          e.preventDefault();
          var cmd = input.value.trim();
          if (!cmd) return;

          cmdHistory.push(cmd);
          historyIndex = cmdHistory.length;
          executeCommand(sandbox, cmd, commands);
          input.value = "";
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (historyIndex > 0) {
            historyIndex--;
            input.value = cmdHistory[historyIndex];
          }
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          if (historyIndex < cmdHistory.length - 1) {
            historyIndex++;
            input.value = cmdHistory[historyIndex];
          } else {
            historyIndex = cmdHistory.length;
            input.value = "";
          }
        } else if (e.key === "Tab") {
          e.preventDefault();
          autoComplete(input, commands);
        }
      });
    });

    // 힌트 칩 클릭
    document.querySelectorAll(".sandbox__hint-chip").forEach(function(chip) {
      if (chip.dataset.bound) return;
      chip.dataset.bound = "true";

      chip.addEventListener("click", function() {
        var sandbox = chip.closest(".sandbox");
        if (!sandbox) return;
        var input = sandbox.querySelector(".sandbox__input");
        if (input) {
          input.value = chip.dataset.hint;
          input.focus();
          // 자동 실행
          var event = new KeyboardEvent("keydown", { key: "Enter" });
          input.dispatchEvent(event);
        }
      });
    });

    // 초기화 버튼
    document.querySelectorAll(".sandbox__clear").forEach(function(btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "true";

      btn.addEventListener("click", function() {
        var sandboxId = btn.dataset.sandbox;
        var sandbox = document.querySelector('[data-sandbox-id="' + sandboxId + '"]');
        if (!sandbox) return;
        var history = sandbox.querySelector(".sandbox__history");
        if (history) history.textContent = "";
      });
    });
  }

  // --- 명령어 실행 ---
  function executeCommand(sandbox, cmd, commands) {
    var history = sandbox.querySelector(".sandbox__history");
    if (!history) return;

    // 입력한 명령어 표시
    var cmdLine = document.createElement("div");
    cmdLine.className = "sandbox__cmd-line";
    var prompt = document.createElement("span");
    prompt.className = "terminal__prompt";
    prompt.textContent = "$ ";
    cmdLine.appendChild(prompt);
    var cmdText = document.createElement("span");
    cmdText.className = "terminal__command";
    cmdText.textContent = cmd;
    cmdLine.appendChild(cmdText);
    history.appendChild(cmdLine);

    // 매칭 결과 찾기
    var output = findMatch(cmd, commands);

    // 결과 표시 (타이핑 애니메이션)
    var outputEl = document.createElement("div");
    outputEl.className = "sandbox__output";
    history.appendChild(outputEl);

    typeText(outputEl, output, 0, function() {
      // 스크롤 끝으로
      var body = sandbox.querySelector(".sandbox__body");
      if (body) body.scrollTop = body.scrollHeight;
    });

    // 스크롤
    var body = sandbox.querySelector(".sandbox__body");
    if (body) body.scrollTop = body.scrollHeight;
  }

  // --- 명령어 매칭 ---
  function findMatch(cmd, commands) {
    var lowerCmd = cmd.toLowerCase().trim();

    // 1. 정확히 일치
    for (var key in commands) {
      if (key.toLowerCase() === lowerCmd) return commands[key];
    }

    // 2. 포함 매칭 (입력이 키를 포함하거나 키가 입력을 포함)
    var bestMatch = null;
    var bestScore = 0;
    for (var key2 in commands) {
      var lowerKey = key2.toLowerCase();
      // 키워드 매칭 점수 계산
      var score = 0;
      var cmdWords = lowerCmd.split(/\s+/);
      var keyWords = lowerKey.split(/\s+/);

      for (var i = 0; i < cmdWords.length; i++) {
        for (var j = 0; j < keyWords.length; j++) {
          if (keyWords[j].indexOf(cmdWords[i]) !== -1 || cmdWords[i].indexOf(keyWords[j]) !== -1) {
            score++;
          }
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = commands[key2];
      }
    }

    if (bestScore >= 1 && bestMatch) return bestMatch;

    // 3. 도움말
    var available = Object.keys(commands);
    if (lowerCmd === "help" || lowerCmd === "도움말" || lowerCmd === "?") {
      return "사용 가능한 명령어:\n\n" + available.map(function(k, i) { return "  " + (i + 1) + ". " + k; }).join("\n") +
        "\n\n위 명령어를 입력해보세요!";
    }

    return "❓ 인식되지 않는 명령어입니다.\n\n" +
      "💡 이런 명령어를 시도해보세요:\n" +
      available.slice(0, 3).map(function(k) { return "  → " + k; }).join("\n") +
      "\n\n'도움말'을 입력하면 전체 목록을 볼 수 있어요.";
  }

  // --- 자동 완성 ---
  function autoComplete(input, commands) {
    var partial = input.value.toLowerCase().trim();
    if (!partial) return;

    var keys = Object.keys(commands);
    var matches = keys.filter(function(k) {
      return k.toLowerCase().indexOf(partial) === 0 || k.toLowerCase().indexOf(partial) !== -1;
    });

    if (matches.length === 1) {
      input.value = matches[0];
    } else if (matches.length > 1) {
      // 공통 접두사 찾기 — 일단 첫 번째 매칭으로
      input.value = matches[0];
    }
  }

  // --- 타이핑 애니메이션 ---
  function typeText(el, text, index, callback) {
    if (index >= text.length) {
      if (callback) callback();
      return;
    }

    var chunk = Math.min(3, text.length - index);
    el.textContent += text.substring(index, index + chunk);

    setTimeout(function() {
      typeText(el, text, index + chunk, callback);
    }, 15);
  }

  // --- 유틸 ---
  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  window.StudioTerminal = {
    render: render,
    renderSandbox: renderSandbox,
    bindEvents: bindEvents
  };
})();
