// ==UserScript==
// @name         Bitbucket code highlight
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add syntax highlight on bitbucket pull requests
// @author       Johnatan Dias
// @match        https://bitbucket.org/**/*
// @grant        none
// ==/UserScript==

/*global hljs: true */

(function () {
  "use strict";

  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href =
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.1/styles/default.min.css";
  document.body.appendChild(style);

  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.1/highlight.min.js";
  document.body.appendChild(script);

  const languagesMap = {
    js: "javascript",
    json: "javascript",
    py: "python",
  };

  const higthligthCode = () => {
    const filesContainer = document.querySelectorAll("section.iterable-item");

    filesContainer.forEach((fileContainer) => {
      const fileExtension = fileContainer.dataset.filename.split(".").pop();
      const language = languagesMap[fileExtension] || fileExtension;

      const linesOfCodeContainer = document.querySelectorAll(
        '.udiff-line:not([data-highlighted="true"])'
      );

      linesOfCodeContainer.forEach((lineOfCodeElement) => {
        lineOfCodeElement.classList.add(language);

        lineOfCodeElement.dataset.highlighted = "true";
        lineOfCodeElement.style.backgroundColor = "transparent";
        lineOfCodeElement.style.padding = "0";
        hljs.highlightBlock(lineOfCodeElement);
      });
    });
  };

  const mutationObserver = new MutationObserver(higthligthCode);

  mutationObserver.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true,
  });

  window.addEventListener("scroll", higthligthCode, false);
})();
