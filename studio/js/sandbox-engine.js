// Claude Code 학습 스튜디오 — 상태 기반 샌드박스 엔진
// P0: 녹음 재생 대체 → 학습자 행동이 다른 결과를 만드는 실제 시뮬레이션
(function () {
  "use strict";

  // ============================================================
  // Level 1: 가상 파일시스템 (난이도 ⭐ 프로젝트용)
  // ============================================================
  function VirtualFS(initialFiles) {
    this.files = {};
    this.cwd = "/project";
    this.history = [];

    if (initialFiles) {
      for (var path in initialFiles) {
        this.files[this._resolve(path)] = initialFiles[path];
      }
    }
  }

  VirtualFS.prototype._resolve = function (path) {
    if (path.charAt(0) === "/") return path;
    return this.cwd + "/" + path;
  };

  VirtualFS.prototype._parseArgs = function (cmd) {
    var parts = [];
    var current = "";
    var inQuote = false;
    var quoteChar = "";

    for (var i = 0; i < cmd.length; i++) {
      var ch = cmd.charAt(i);
      if (inQuote) {
        if (ch === quoteChar) { inQuote = false; }
        else { current += ch; }
      } else if (ch === '"' || ch === "'") {
        inQuote = true;
        quoteChar = ch;
      } else if (ch === " ") {
        if (current) { parts.push(current); current = ""; }
      } else {
        current += ch;
      }
    }
    if (current) parts.push(current);
    return parts;
  };

  VirtualFS.prototype.execute = function (cmd) {
    var trimmed = cmd.trim();
    if (!trimmed) return { output: "", success: true };

    var args = this._parseArgs(trimmed);
    var command = args[0].toLowerCase();
    this.history.push(trimmed);

    switch (command) {
      case "write": case "touch": return this._write(args.slice(1));
      case "read": case "cat": return this._read(args.slice(1));
      case "edit": return this._edit(args.slice(1));
      case "ls": return this._ls(args.slice(1));
      case "rm": case "delete": return this._rm(args.slice(1));
      case "mkdir": return this._mkdir(args.slice(1));
      case "pwd": return { output: this.cwd, success: true };
      case "cd": return this._cd(args.slice(1));
      case "tree": return this._tree();
      case "clear": return { output: "__CLEAR__", success: true };
      case "help": case "도움말": case "?": return this._help();
      default:
        return {
          output: "알 수 없는 명령어: " + command + "\n'도움말'을 입력하면 사용 가능한 명령어를 볼 수 있어요.",
          success: false
        };
    }
  };

  VirtualFS.prototype._write = function (args) {
    if (args.length < 1) return { output: "사용법: write <파일명> <내용>\n예: write hello.txt '안녕하세요'", success: false };
    var path = this._resolve(args[0]);
    var content = args.slice(1).join(" ") || "";
    var existed = path in this.files;
    this.files[path] = content;
    return { output: (existed ? "덮어쓰기" : "생성") + " 완료: " + args[0], success: true, action: "write", path: path };
  };

  VirtualFS.prototype._read = function (args) {
    if (args.length < 1) return { output: "사용법: read <파일명>", success: false };
    var path = this._resolve(args[0]);
    if (!(path in this.files)) return { output: "파일을 찾을 수 없습니다: " + args[0], success: false };
    return { output: this.files[path] || "(빈 파일)", success: true, action: "read", path: path };
  };

  VirtualFS.prototype._edit = function (args) {
    if (args.length < 3) return { output: "사용법: edit <파일명> <찾을내용> <바꿀내용>\n예: edit hello.txt '안녕' '반갑'", success: false };
    var path = this._resolve(args[0]);
    if (!(path in this.files)) return { output: "파일을 찾을 수 없습니다: " + args[0], success: false };
    var oldStr = args[1], newStr = args[2], content = this.files[path];
    if (content.indexOf(oldStr) === -1) return { output: "'" + oldStr + "'을(를) 파일에서 찾을 수 없습니다.", success: false };
    this.files[path] = content.replace(oldStr, newStr);
    return { output: "수정 완료: '" + oldStr + "' → '" + newStr + "'", success: true, action: "edit", path: path };
  };

  VirtualFS.prototype._ls = function (args) {
    var targetDir = args.length > 0 ? this._resolve(args[0]) : this.cwd;
    var entries = [], seen = {};
    for (var path in this.files) {
      if (path.indexOf(targetDir + "/") === 0) {
        var relative = path.substring(targetDir.length + 1);
        var firstPart = relative.split("/")[0];
        if (!seen[firstPart]) {
          seen[firstPart] = true;
          entries.push(relative.indexOf("/") !== -1 ? firstPart + "/" : firstPart);
        }
      }
    }
    if (entries.length === 0) return { output: "(빈 디렉토리)", success: true };
    entries.sort();
    return { output: entries.join("\n"), success: true };
  };

  VirtualFS.prototype._rm = function (args) {
    if (args.length < 1) return { output: "사용법: rm <파일명>", success: false };
    var path = this._resolve(args[0]);
    if (!(path in this.files)) return { output: "파일을 찾을 수 없습니다: " + args[0], success: false };
    delete this.files[path];
    return { output: "삭제 완료: " + args[0], success: true, action: "rm", path: path };
  };

  VirtualFS.prototype._mkdir = function (args) {
    if (args.length < 1) return { output: "사용법: mkdir <디렉토리명>", success: false };
    var path = this._resolve(args[0]);
    this.files[path + "/.keep"] = "";
    return { output: "디렉토리 생성: " + args[0], success: true, action: "mkdir", path: path };
  };

  VirtualFS.prototype._cd = function (args) {
    if (args.length < 1) { this.cwd = "/project"; return { output: this.cwd, success: true }; }
    if (args[0] === "..") {
      var parts = this.cwd.split("/");
      if (parts.length > 2) parts.pop();
      this.cwd = parts.join("/");
    } else {
      this.cwd = this._resolve(args[0]);
    }
    return { output: this.cwd, success: true };
  };

  VirtualFS.prototype._tree = function () {
    var paths = Object.keys(this.files).filter(function (p) { return !p.endsWith("/.keep"); }).sort();
    if (paths.length === 0) return { output: "(빈 프로젝트)", success: true };
    var lines = ["/project"];
    for (var i = 0; i < paths.length; i++) {
      var rel = paths[i].replace("/project/", "");
      var depth = rel.split("/").length - 1;
      var prefix = "";
      for (var d = 0; d < depth; d++) prefix += "  ";
      lines.push(prefix + (i === paths.length - 1 ? "└── " : "├── ") + rel.split("/").pop());
    }
    return { output: lines.join("\n"), success: true };
  };

  VirtualFS.prototype._help = function () {
    return {
      output: "사용 가능한 명령어:\n\n" +
        "  write <파일명> <내용>  — 파일 생성/덮어쓰기\n" +
        "  read <파일명>          — 파일 읽기\n" +
        "  edit <파일> <이전> <새> — 파일 내용 수정\n" +
        "  ls [경로]              — 파일 목록 보기\n" +
        "  rm <파일명>            — 파일 삭제\n" +
        "  mkdir <이름>           — 디렉토리 생성\n" +
        "  tree                   — 파일 트리 보기\n" +
        "  pwd                    — 현재 경로\n" +
        "  cd <경로>              — 디렉토리 이동\n" +
        "  clear                  — 화면 초기화\n" +
        "  도움말                 — 이 도움말 보기",
      success: true
    };
  };

  VirtualFS.prototype.getFileTree = function () {
    var tree = {};
    for (var path in this.files) {
      if (path.endsWith("/.keep")) continue;
      tree[path.replace("/project/", "")] = this.files[path];
    }
    return tree;
  };

  // ============================================================
  // Level 2: 분기 시나리오 엔진 (난이도 ⭐⭐ 프로젝트용)
  // ============================================================
  function ScenarioEngine(config) {
    this.states = config.states || {};
    this.currentState = config.initialState || "start";
    this.variables = Object.assign({}, config.variables || {});
    this.completedGoals = [];
    this.goals = config.goals || [];
    this.history = [];
  }

  ScenarioEngine.prototype.execute = function (cmd) {
    var trimmed = cmd.trim().toLowerCase();
    this.history.push(cmd.trim());

    var state = this.states[this.currentState];
    if (!state) return { output: "시나리오 오류: 상태를 찾을 수 없습니다.", success: false };

    var transitions = state.transitions || {};
    var matched = null;

    for (var pattern in transitions) {
      if (this._matchPattern(trimmed, pattern)) { matched = transitions[pattern]; break; }
    }

    if (!matched && this.states.__global) {
      var gt = this.states.__global.transitions || {};
      for (var gp in gt) {
        if (this._matchPattern(trimmed, gp)) { matched = gt[gp]; break; }
      }
    }

    if (!matched) {
      var hint = state.hint || "이 상태에서 할 수 있는 일을 생각해보세요.";
      return { output: "이 상황에서는 '" + cmd.trim() + "'을(를) 사용할 수 없어요.\n\n힌트: " + hint, success: false };
    }

    if (matched.condition && !this._evalCondition(matched.condition)) {
      return { output: matched.conditionFail || "아직 이 명령을 실행할 수 없습니다.", success: false };
    }

    if (matched.nextState) this.currentState = matched.nextState;
    if (matched.setVars) {
      for (var key in matched.setVars) this.variables[key] = matched.setVars[key];
    }
    if (matched.completeGoal && this.completedGoals.indexOf(matched.completeGoal) === -1) {
      this.completedGoals.push(matched.completeGoal);
    }

    return {
      output: matched.output || "",
      success: matched.success !== false,
      goalCompleted: matched.completeGoal || null,
      allGoalsComplete: this.goals.length > 0 && this.completedGoals.length >= this.goals.length,
      stateInfo: this._getStateInfo()
    };
  };

  ScenarioEngine.prototype._matchPattern = function (input, pattern) {
    if (pattern === "any") return true;
    if (pattern.indexOf("contains:") === 0) return input.indexOf(pattern.substring(9)) !== -1;
    if (pattern.indexOf("regex:") === 0) {
      try { return new RegExp(pattern.substring(6), "i").test(input); } catch (e) { return false; }
    }
    return input === pattern;
  };

  ScenarioEngine.prototype._evalCondition = function (condition) {
    if (condition.indexOf("var:") === 0) return !!this.variables[condition.substring(4)];
    if (condition.indexOf("!var:") === 0) return !this.variables[condition.substring(5)];
    if (condition.indexOf("goal:") === 0) return this.completedGoals.indexOf(condition.substring(5)) !== -1;
    return true;
  };

  ScenarioEngine.prototype._getStateInfo = function () {
    var state = this.states[this.currentState];
    return {
      name: this.currentState,
      description: state ? state.description || "" : "",
      goals: this.goals,
      completedGoals: this.completedGoals,
      progress: this.goals.length > 0 ? Math.round((this.completedGoals.length / this.goals.length) * 100) : 0
    };
  };

  ScenarioEngine.prototype.getHints = function () {
    var state = this.states[this.currentState];
    return state ? state.hints || [] : [];
  };

  ScenarioEngine.prototype.getCurrentDescription = function () {
    var state = this.states[this.currentState];
    return state ? state.description || "" : "";
  };

  // ============================================================
  // Level 3: 의사결정 시뮬레이션 (난이도 ⭐⭐⭐ 프로젝트용)
  // ============================================================
  function DecisionSim(config) {
    this.nodes = config.nodes || {};
    this.startNode = config.startNode || "start";
    this.currentNode = this.startNode;
    this.decisions = [];
    this.score = 0;
    this.maxScore = config.maxScore || 100;
    this.history = [];
  }

  DecisionSim.prototype.getCurrentNode = function () {
    return this.nodes[this.currentNode] || null;
  };

  DecisionSim.prototype.choose = function (choiceIndex) {
    var node = this.nodes[this.currentNode];
    if (!node || !node.choices) return null;
    var choice = node.choices[choiceIndex];
    if (!choice) return null;

    this.decisions.push({ node: this.currentNode, choice: choiceIndex, label: choice.label });
    this.score += choice.score || 0;
    this.history.push({ situation: node.situation, choice: choice.label, result: choice.result, isOptimal: !!choice.optimal });
    this.currentNode = choice.nextNode || "__end";

    var nextNode = this.nodes[this.currentNode];
    return {
      result: choice.result,
      isOptimal: !!choice.optimal,
      feedback: choice.feedback || "",
      nextSituation: nextNode ? nextNode.situation : null,
      isEnd: this.currentNode === "__end" || !nextNode,
      score: this.score,
      maxScore: this.maxScore
    };
  };

  DecisionSim.prototype.getSummary = function () {
    var optimal = this.history.filter(function (h) { return h.isOptimal; }).length;
    return {
      totalDecisions: this.decisions.length, optimalDecisions: optimal,
      score: this.score, maxScore: this.maxScore,
      percentage: Math.round((this.score / this.maxScore) * 100),
      history: this.history
    };
  };

  DecisionSim.prototype.reset = function () {
    this.currentNode = this.startNode;
    this.decisions = [];
    this.score = 0;
    this.history = [];
  };

  // ============================================================
  // 렌더러: DOM API 기반 (innerHTML 최소화)
  // ============================================================

  function renderVFSSandbox(config) {
    var id = "vfs-" + Math.random().toString(36).slice(2, 9);
    var initialFiles = config.initialFiles || {};
    var challenges = config.challenges || [];

    var root = createElement("div", "sandbox sandbox--vfs", {
      "data-sandbox-id": id, "data-type": "vfs",
      "data-initial-files": JSON.stringify(initialFiles),
      "data-challenges": JSON.stringify(challenges)
    });

    root.appendChild(buildHeader("가상 터미널", id, "초기화"));
    var split = createElement("div", "sandbox__split");
    var termPane = createElement("div", "sandbox__terminal-pane");
    termPane.appendChild(buildTerminalBody(id));
    split.appendChild(termPane);
    var treePane = createElement("div", "sandbox__filetree-pane", { "data-sandbox": id });
    var treeTitle = createElement("div", "sandbox__filetree-title");
    treeTitle.textContent = "파일 트리";
    treePane.appendChild(treeTitle);
    treePane.appendChild(createElement("div", "sandbox__filetree"));
    split.appendChild(treePane);
    root.appendChild(split);

    if (challenges.length > 0) {
      var chalWrap = createElement("div", "sandbox-challenges", { "data-sandbox": id });
      var chalTitle = createElement("div", "sandbox-challenges__title");
      chalTitle.textContent = "미션";
      chalWrap.appendChild(chalTitle);
      var chalList = createElement("div", "sandbox-challenges__list");
      challenges.forEach(function (c, i) {
        var item = createElement("div", "sandbox-challenge", { "data-index": String(i) });
        var check = createElement("span", "sandbox-challenge__check");
        check.textContent = "○";
        item.appendChild(check);
        var text = createElement("span", "sandbox-challenge__text");
        text.textContent = c.description;
        item.appendChild(text);
        chalList.appendChild(item);
      });
      chalWrap.appendChild(chalList);
      root.appendChild(chalWrap);
    }

    return root.outerHTML;
  }

  function renderScenarioSandbox(config) {
    var id = "scenario-" + Math.random().toString(36).slice(2, 9);
    var root = createElement("div", "sandbox sandbox--scenario", {
      "data-sandbox-id": id, "data-type": "scenario",
      "data-scenario": JSON.stringify(config)
    });
    root.appendChild(buildHeader("시나리오 시뮬레이터", id, "초기화"));
    root.appendChild(createElement("div", "sandbox__scenario-status", { "data-sandbox": id }));
    root.appendChild(buildTerminalBody(id));
    root.appendChild(createElement("div", "sandbox__hints", { "data-sandbox": id }));
    return root.outerHTML;
  }

  function renderDecisionSandbox(config) {
    var id = "decision-" + Math.random().toString(36).slice(2, 9);
    var root = createElement("div", "sandbox sandbox--decision", {
      "data-sandbox-id": id, "data-type": "decision",
      "data-decision": JSON.stringify(config)
    });
    root.appendChild(buildHeader("의사결정 시뮬레이터", id, "다시 시작"));
    root.appendChild(createElement("div", "sandbox__decision-area", { "data-sandbox": id }));
    return root.outerHTML;
  }

  function buildHeader(title, id, resetLabel) {
    var header = createElement("div", "sandbox__header");
    var dots = createElement("div", "terminal__dots");
    for (var i = 0; i < 3; i++) dots.appendChild(document.createElement("span"));
    header.appendChild(dots);
    var titleEl = createElement("span", "terminal__title");
    titleEl.textContent = title;
    header.appendChild(titleEl);
    var resetBtn = createElement("button", "sandbox__reset-btn", { "data-sandbox": id, title: "초기화" });
    resetBtn.textContent = resetLabel;
    header.appendChild(resetBtn);
    return header;
  }

  function buildTerminalBody(id) {
    var body = createElement("div", "sandbox__body", { "data-sandbox": id });
    body.appendChild(createElement("div", "sandbox__history"));
    var inputLine = createElement("div", "sandbox__input-line");
    var prompt = createElement("span", "terminal__prompt");
    prompt.textContent = "$ ";
    inputLine.appendChild(prompt);
    var input = createElement("input", "sandbox__input", {
      "data-sandbox": id, type: "text",
      placeholder: "명령어를 입력하세요... (도움말: help)",
      autocomplete: "off", spellcheck: "false"
    });
    inputLine.appendChild(input);
    body.appendChild(inputLine);
    return body;
  }

  // ============================================================
  // 이벤트 바인딩
  // ============================================================
  var sandboxInstances = {};

  function bindSandboxEvents() {
    document.querySelectorAll(".sandbox--vfs").forEach(function (el) {
      if (el.dataset.engineBound) return;
      el.dataset.engineBound = "true";
      var id = el.dataset.sandboxId;
      var initialFiles = {}, challenges = [];
      try { initialFiles = JSON.parse(el.dataset.initialFiles); } catch (e) { /* */ }
      try { challenges = JSON.parse(el.dataset.challenges); } catch (e) { /* */ }
      var fs = new VirtualFS(initialFiles);
      sandboxInstances[id] = { type: "vfs", engine: fs, challenges: challenges };
      updateFileTree(el, fs);
      bindTerminalInput(el, id, "vfs");
      bindResetButton(el, id, initialFiles);
    });

    document.querySelectorAll(".sandbox--scenario").forEach(function (el) {
      if (el.dataset.engineBound) return;
      el.dataset.engineBound = "true";
      var id = el.dataset.sandboxId;
      var config = {};
      try { config = JSON.parse(el.dataset.scenario); } catch (e) { /* */ }
      var engine = new ScenarioEngine(config);
      sandboxInstances[id] = { type: "scenario", engine: engine, config: config };
      updateScenarioStatus(el, engine);
      updateScenarioHints(el, engine);
      showIntroMessage(el, engine.getCurrentDescription());
      bindTerminalInput(el, id, "scenario");
      bindResetButton(el, id, null);
    });

    document.querySelectorAll(".sandbox--decision").forEach(function (el) {
      if (el.dataset.engineBound) return;
      el.dataset.engineBound = "true";
      var id = el.dataset.sandboxId;
      var config = {};
      try { config = JSON.parse(el.dataset.decision); } catch (e) { /* */ }
      var sim = new DecisionSim(config);
      sandboxInstances[id] = { type: "decision", engine: sim, config: config };
      renderDecisionNode(el, sim);
      bindResetButton(el, id, null);
    });
  }

  function bindTerminalInput(el, id, engineType) {
    var input = el.querySelector('.sandbox__input[data-sandbox="' + id + '"]');
    if (!input) return;
    var cmdHistory = [], historyIndex = -1;

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        var cmd = input.value.trim();
        if (!cmd) return;
        cmdHistory.push(cmd);
        historyIndex = cmdHistory.length;
        var instance = sandboxInstances[id];
        if (!instance) return;

        appendCommandLine(el, cmd);
        var result = instance.engine.execute(cmd);

        if (result.output === "__CLEAR__") {
          clearHistory(el);
        } else {
          appendOutput(el, result.output, result.success);
        }

        if (engineType === "vfs") {
          updateFileTree(el, instance.engine);
          checkVFSChallenges(el, id, instance);
        } else if (engineType === "scenario") {
          if (result.goalCompleted) appendSystemMessage(el, "목표 달성: " + result.goalCompleted, true);
          if (result.allGoalsComplete) {
            appendSystemMessage(el, "모든 목표를 달성했습니다!", true);
            fireEvent(el, "sandbox-complete", { type: "scenario", id: id });
          }
          updateScenarioStatus(el, instance.engine);
          updateScenarioHints(el, instance.engine);
        }

        input.value = "";
        scrollToBottom(el);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historyIndex > 0) { historyIndex--; input.value = cmdHistory[historyIndex]; }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex < cmdHistory.length - 1) { historyIndex++; input.value = cmdHistory[historyIndex]; }
        else { historyIndex = cmdHistory.length; input.value = ""; }
      }
    });
  }

  function renderDecisionNode(el, sim) {
    var area = el.querySelector(".sandbox__decision-area");
    if (!area) return;
    // DOM API로 안전하게 구성
    area.textContent = "";

    var node = sim.getCurrentNode();
    if (!node) {
      var summary = sim.getSummary();
      var pct = summary.percentage;
      var msg = pct >= 90 ? "최적의 결정을 내렸어요!" : pct >= 60 ? "괜찮은 결정이었어요!" : "다시 한번 생각해볼까요?";

      var resultDiv = createElement("div", "decision-result");
      var scoreEl = createElement("div", "decision-result__score");
      scoreEl.textContent = summary.score + " / " + summary.maxScore + "점";
      resultDiv.appendChild(scoreEl);
      var msgEl = createElement("div", "decision-result__msg");
      msgEl.textContent = msg;
      resultDiv.appendChild(msgEl);

      var histDiv = createElement("div", "decision-result__history");
      summary.history.forEach(function (h) {
        var item = createElement("div", "decision-history-item" + (h.isOptimal ? " decision-history-item--optimal" : ""));
        var choiceEl = createElement("div", "decision-history-item__choice");
        choiceEl.textContent = h.choice;
        item.appendChild(choiceEl);
        var resEl = createElement("div", "decision-history-item__result");
        resEl.textContent = h.result;
        item.appendChild(resEl);
        histDiv.appendChild(item);
      });
      resultDiv.appendChild(histDiv);
      area.appendChild(resultDiv);
      fireEvent(el, "sandbox-complete", { type: "decision", score: summary.score, maxScore: summary.maxScore });
      return;
    }

    var nodeDiv = createElement("div", "decision-node");
    var sitEl = createElement("div", "decision-node__situation");
    sitEl.textContent = node.situation;
    nodeDiv.appendChild(sitEl);
    if (node.context) {
      var ctxEl = createElement("div", "decision-node__context");
      ctxEl.textContent = node.context;
      nodeDiv.appendChild(ctxEl);
    }
    var choicesDiv = createElement("div", "decision-node__choices");
    node.choices.forEach(function (c, i) {
      var btn = createElement("button", "decision-choice", { "data-choice": String(i) });
      var label = createElement("span", "decision-choice__label");
      label.textContent = c.label;
      btn.appendChild(label);
      if (c.hint) {
        var hint = createElement("span", "decision-choice__hint");
        hint.textContent = c.hint;
        btn.appendChild(hint);
      }
      btn.addEventListener("click", function () {
        var result = sim.choose(i);
        if (!result) return;
        area.textContent = "";
        var fbDiv = createElement("div", "decision-feedback " + (result.isOptimal ? "decision-feedback--good" : "decision-feedback--bad"));
        var resEl2 = createElement("div", "decision-feedback__result");
        resEl2.textContent = result.result;
        fbDiv.appendChild(resEl2);
        if (result.feedback) {
          var expEl = createElement("div", "decision-feedback__explain");
          expEl.textContent = result.feedback;
          fbDiv.appendChild(expEl);
        }
        var nextBtn = createElement("button", "decision-feedback__next");
        nextBtn.textContent = result.isEnd ? "결과 보기" : "다음 상황";
        nextBtn.addEventListener("click", function () { renderDecisionNode(el, sim); });
        fbDiv.appendChild(nextBtn);
        area.appendChild(fbDiv);
      });
      choicesDiv.appendChild(btn);
    });
    nodeDiv.appendChild(choicesDiv);
    area.appendChild(nodeDiv);
  }

  function bindResetButton(el, id, initialFiles) {
    var resetBtn = el.querySelector('.sandbox__reset-btn[data-sandbox="' + id + '"]');
    if (!resetBtn || resetBtn.dataset.bound) return;
    resetBtn.dataset.bound = "true";
    resetBtn.addEventListener("click", function () {
      var instance = sandboxInstances[id];
      if (!instance) return;
      clearHistory(el);
      if (instance.type === "vfs") {
        instance.engine = new VirtualFS(initialFiles || {});
        sandboxInstances[id].engine = instance.engine;
        updateFileTree(el, instance.engine);
        resetChallengeUI(el);
      } else if (instance.type === "scenario") {
        instance.engine = new ScenarioEngine(instance.config);
        sandboxInstances[id].engine = instance.engine;
        updateScenarioStatus(el, instance.engine);
        updateScenarioHints(el, instance.engine);
        showIntroMessage(el, instance.engine.getCurrentDescription());
      } else if (instance.type === "decision") {
        instance.engine.reset();
        renderDecisionNode(el, instance.engine);
      }
    });
  }

  // ============================================================
  // UI 헬퍼 (DOM API 기반, innerHTML 없음)
  // ============================================================

  function createElement(tag, className, attrs) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (attrs) {
      for (var key in attrs) el.setAttribute(key, attrs[key]);
    }
    return el;
  }

  function appendCommandLine(el, cmd) {
    var history = el.querySelector(".sandbox__history");
    if (!history) return;
    var line = createElement("div", "sandbox__cmd-line");
    var prompt = createElement("span", "terminal__prompt");
    prompt.textContent = "$ ";
    line.appendChild(prompt);
    var cmdSpan = createElement("span", "terminal__command");
    cmdSpan.textContent = cmd;
    line.appendChild(cmdSpan);
    history.appendChild(line);
  }

  function appendOutput(el, text, success) {
    if (!text) return;
    var history = el.querySelector(".sandbox__history");
    if (!history) return;
    var outputEl = createElement("div", "sandbox__output" + (success === false ? " sandbox__output--error" : ""));
    outputEl.textContent = text;
    history.appendChild(outputEl);
  }

  function appendSystemMessage(el, text, isSuccess) {
    var history = el.querySelector(".sandbox__history");
    if (!history) return;
    var msgEl = createElement("div", "sandbox__system-msg" + (isSuccess ? " sandbox__system-msg--success" : ""));
    msgEl.textContent = text;
    history.appendChild(msgEl);
  }

  function clearHistory(el) {
    var history = el.querySelector(".sandbox__history");
    if (history) history.textContent = "";
  }

  function scrollToBottom(el) {
    var body = el.querySelector(".sandbox__body");
    if (body) body.scrollTop = body.scrollHeight;
  }

  function showIntroMessage(el, text) {
    if (text) appendSystemMessage(el, text, true);
  }

  function updateFileTree(el, fs) {
    var treeEl = el.querySelector(".sandbox__filetree");
    if (!treeEl) return;
    treeEl.textContent = "";

    var files = fs.getFileTree();
    var keys = Object.keys(files).sort();
    if (keys.length === 0) {
      var empty = createElement("div", "filetree__empty");
      empty.textContent = "(빈 프로젝트)";
      treeEl.appendChild(empty);
      return;
    }
    keys.forEach(function (key) {
      var item = createElement("div", "filetree__item");
      item.setAttribute("title", key);
      var icon = createElement("span", "filetree__icon");
      icon.textContent = key.indexOf("/") !== -1 ? "📁" : "📄";
      item.appendChild(icon);
      var name = createElement("span", "filetree__name");
      name.textContent = key;
      item.appendChild(name);
      treeEl.appendChild(item);
    });
  }

  function checkVFSChallenges(el, id, instance) {
    if (!instance.challenges || instance.challenges.length === 0) return;
    var allComplete = true;
    var challengeEls = el.querySelectorAll(".sandbox-challenge");
    instance.challenges.forEach(function (challenge, i) {
      var isComplete = evaluateVFSChallenge(instance.engine, challenge);
      var chalEl = challengeEls[i];
      if (chalEl) {
        var checkEl = chalEl.querySelector(".sandbox-challenge__check");
        if (isComplete) {
          chalEl.classList.add("sandbox-challenge--done");
          if (checkEl) checkEl.textContent = "●";
        } else {
          chalEl.classList.remove("sandbox-challenge--done");
          if (checkEl) checkEl.textContent = "○";
          allComplete = false;
        }
      } else if (!isComplete) { allComplete = false; }
    });
    if (allComplete && instance.challenges.length > 0) {
      fireEvent(el, "sandbox-complete", { type: "vfs", id: id });
    }
  }

  function evaluateVFSChallenge(fs, challenge) {
    switch (challenge.type) {
      case "file-exists": return fs._resolve(challenge.path) in fs.files;
      case "file-content":
        var p = fs._resolve(challenge.path);
        return p in fs.files && fs.files[p].indexOf(challenge.contains) !== -1;
      case "file-not-exists": return !(fs._resolve(challenge.path) in fs.files);
      case "file-count":
        var count = Object.keys(fs.files).filter(function (fp) { return !fp.endsWith("/.keep"); }).length;
        return count >= (challenge.min || 0);
      default: return false;
    }
  }

  function resetChallengeUI(el) {
    el.querySelectorAll(".sandbox-challenge").forEach(function (chalEl) {
      chalEl.classList.remove("sandbox-challenge--done");
      var checkEl = chalEl.querySelector(".sandbox-challenge__check");
      if (checkEl) checkEl.textContent = "○";
    });
  }

  function updateScenarioStatus(el, engine) {
    var statusEl = el.querySelector(".sandbox__scenario-status");
    if (!statusEl) return;
    statusEl.textContent = "";

    var info = engine._getStateInfo();
    var wrap = createElement("div", "scenario-status");
    var stateDesc = createElement("div", "scenario-status__state");
    stateDesc.textContent = info.description;
    wrap.appendChild(stateDesc);

    if (info.goals.length > 0) {
      var goalsEl = createElement("div", "scenario-status__goals");
      info.goals.forEach(function (goal) {
        var done = info.completedGoals.indexOf(goal) !== -1;
        var goalEl = createElement("span", "scenario-goal" + (done ? " scenario-goal--done" : ""));
        goalEl.textContent = (done ? "●" : "○") + " " + goal;
        goalsEl.appendChild(goalEl);
      });
      wrap.appendChild(goalsEl);
    }

    if (info.progress > 0) {
      var progWrap = createElement("div", "scenario-status__progress");
      var progBar = createElement("div", "scenario-status__progress-bar");
      progBar.style.width = info.progress + "%";
      progWrap.appendChild(progBar);
      wrap.appendChild(progWrap);
    }
    statusEl.appendChild(wrap);
  }

  function updateScenarioHints(el, engine) {
    var hintsEl = el.querySelector('.sandbox__hints[data-sandbox="' + el.dataset.sandboxId + '"]');
    if (!hintsEl) return;
    hintsEl.textContent = "";

    var hints = engine.getHints();
    if (hints.length === 0) return;

    var label = createElement("span", "sandbox__hints-label");
    label.textContent = "시도해보세요:";
    hintsEl.appendChild(label);

    hints.forEach(function (h) {
      var chip = createElement("button", "sandbox__hint-chip");
      chip.textContent = h;
      chip.addEventListener("click", function () {
        var input = el.querySelector(".sandbox__input");
        if (input) {
          input.value = h;
          input.focus();
          input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
        }
      });
      hintsEl.appendChild(chip);
    });
  }

  function fireEvent(el, name, detail) {
    el.dispatchEvent(new CustomEvent(name, { detail: detail, bubbles: true }));
  }

  // ============================================================
  // 공개 API
  // ============================================================
  window.SandboxEngine = {
    renderVFS: renderVFSSandbox,
    renderScenario: renderScenarioSandbox,
    renderDecision: renderDecisionSandbox,
    bindEvents: bindSandboxEvents,
    VirtualFS: VirtualFS,
    ScenarioEngine: ScenarioEngine,
    DecisionSim: DecisionSim,
    getInstance: function (id) { return sandboxInstances[id] || null; }
  };
})();
