// Claude Code 학습 스튜디오 — 퀴즈 시스템
(function () {
  "use strict";

  function render(projectId, questions) {
    var saved = getSavedAnswers(projectId);

    var html = '<div class="quiz" data-project="' + projectId + '">';

    if (saved && saved.completed) {
      html += renderResult(saved.score, questions.length);
    }

    html += questions.map(function(q, i) {
      var userAnswer = saved ? saved.answers[i] : undefined;
      var isAnswered = userAnswer !== undefined;

      var optionsHTML = q.options.map(function(opt, j) {
        var classes = "quiz__option";
        if (isAnswered) {
          if (j === q.answer) classes += " quiz__option--correct";
          else if (j === userAnswer && j !== q.answer) classes += " quiz__option--wrong";
        }
        return '<button class="' + classes + '" data-question="' + i + '" data-option="' + j + '"' +
          (isAnswered ? " disabled" : "") + '>' +
          '<span class="quiz__option-letter">' + String.fromCharCode(65 + j) + '</span>' +
          '<span>' + escapeHtml(opt) + '</span></button>';
      }).join("");

      var explanationHTML = isAnswered
        ? '<div class="quiz__explanation' + (userAnswer === q.answer ? " quiz__explanation--correct" : " quiz__explanation--wrong") + '">' +
          '<strong>' + (userAnswer === q.answer ? "정답!" : "오답!") + '</strong> ' +
          escapeHtml(q.explanation) + '</div>'
        : "";

      return '<div class="quiz__question" id="q' + i + '" data-index="' + i + '">' +
        '<h3 class="quiz__question-title">문제 ' + (i + 1) + '. ' + escapeHtml(q.question) + '</h3>' +
        '<div class="quiz__options">' + optionsHTML + '</div>' +
        explanationHTML + '</div>';
    }).join("");

    html += '<div class="quiz__actions">' +
      '<button class="quiz__submit" id="quiz-submit"' +
      (saved && saved.completed ? ' style="display:none"' : '') +
      '>결과 확인</button>' +
      '<button class="quiz__reset" id="quiz-reset">다시 풀기</button>' +
      '</div></div>';

    return html;
  }

  function renderResult(score, total) {
    var pct = Math.round((score / total) * 100);
    var message = pct === 100 ? "완벽해요! 🎉"
      : pct >= 80 ? "훌륭해요! 👏"
      : pct >= 60 ? "잘했어요! 💪"
      : "다시 도전해보세요! 📚";

    return '<div class="quiz__result">' +
      '<div class="quiz__result-score">' + score + ' / ' + total + '</div>' +
      '<div class="quiz__result-pct">' + pct + '%</div>' +
      '<div class="quiz__result-msg">' + message + '</div></div>';
  }

  function bindEvents(projectId, questions) {
    document.querySelectorAll(".quiz__option").forEach(function(btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "true";

      btn.addEventListener("click", function() {
        var qi = parseInt(btn.dataset.question);
        var oi = parseInt(btn.dataset.option);
        var q = questions[qi];
        var questionEl = btn.closest(".quiz__question");

        if (questionEl.dataset.answered) return;
        questionEl.dataset.answered = "true";

        var allOpts = questionEl.querySelectorAll(".quiz__option");
        allOpts.forEach(function(opt) {
          opt.disabled = true;
          var optIdx = parseInt(opt.dataset.option);
          if (optIdx === q.answer) opt.classList.add("quiz__option--correct");
          if (optIdx === oi && oi !== q.answer) opt.classList.add("quiz__option--wrong");
        });

        var isCorrect = oi === q.answer;
        var explEl = document.createElement("div");
        explEl.className = "quiz__explanation" + (isCorrect ? " quiz__explanation--correct" : " quiz__explanation--wrong");
        var strong = document.createElement("strong");
        strong.textContent = isCorrect ? "정답! " : "오답! ";
        explEl.appendChild(strong);
        explEl.appendChild(document.createTextNode(q.explanation));
        questionEl.appendChild(explEl);

        saveAnswer(projectId, qi, oi);
      });
    });

    var submitBtn = document.getElementById("quiz-submit");
    if (submitBtn) {
      submitBtn.addEventListener("click", function() {
        var saved = getSavedAnswers(projectId);
        if (!saved) return;

        var score = 0;
        for (var i = 0; i < questions.length; i++) {
          if (saved.answers[i] === questions[i].answer) score++;
        }

        saved.score = score;
        saved.completed = true;
        localStorage.setItem("studio-quiz-" + projectId, JSON.stringify(saved));

        var quizEl = document.querySelector('.quiz[data-project="' + projectId + '"]');
        if (quizEl) {
          var resultDiv = document.createElement("div");
          resultDiv.innerHTML = renderResult(score, questions.length);
          quizEl.insertBefore(resultDiv.firstChild, quizEl.firstChild);
        }
        submitBtn.style.display = "none";
        localStorage.setItem("studio-progress-" + projectId + "-quiz", "done");
      });
    }

    var resetBtn = document.getElementById("quiz-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", function() {
        localStorage.removeItem("studio-quiz-" + projectId);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      });
    }
  }

  function saveAnswer(projectId, questionIndex, optionIndex) {
    var saved = getSavedAnswers(projectId) || { answers: {}, score: 0, completed: false };
    saved.answers[questionIndex] = optionIndex;
    saved.total = document.querySelectorAll(".quiz__question").length;
    localStorage.setItem("studio-quiz-" + projectId, JSON.stringify(saved));
  }

  function getSavedAnswers(projectId) {
    var raw = localStorage.getItem("studio-quiz-" + projectId);
    if (!raw) return null;
    try { return JSON.parse(raw); }
    catch (e) { return null; }
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  window.StudioQuiz = { render: render, bindEvents: bindEvents };
})();
