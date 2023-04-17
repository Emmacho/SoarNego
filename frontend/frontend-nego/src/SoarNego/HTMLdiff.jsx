import React, { useEffect, useRef } from "react";
import { HtmlDiffer } from "html-differ";

const htmlDiffer = new HtmlDiffer({
  ignoreAttributes: ["line-height", "p"],
  compareAttributesAsJSON: [],
  ignoreWhitespaces: true,
  ignoreComments: true,
  ignoreEndTags: false,
  ignoreDuplicateAttributes: false,
});

const compareHTML = (left, right) => {
  const diff = htmlDiffer.diffHtml(left, right);
  return diff;
};

const cleanHTML = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.innerHTML;
};

const HTMLDiff = ({ left, right }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && left && right) {
      const differences = compareHTML(left, right);

      const result = differences
        .map((part) => {
          if (part.added) {
            return `<ins class="diff-added">${part.value}</ins>`;
          } else if (part.removed) {
            return `<del class="diff-removed">${part.value}</del>`;
          } else {
            return part.value;
          }
        })
        .join("");

      const cleanedResult = cleanHTML(result);
      containerRef.current.innerHTML = cleanedResult;
    }
  }, [left, right]);

  if (!left || !right) {
    return <div>Both inputs must be provided.</div>;
  }

  return <div ref={containerRef}></div>;
};

export default HTMLDiff;
