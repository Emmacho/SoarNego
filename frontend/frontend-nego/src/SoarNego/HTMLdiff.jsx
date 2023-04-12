// src/components/HTMLDiff.js
import React, { useEffect, useRef,useCallback } from "react";
import { HtmlDiffer } from "html-differ";
import { useHelpers, useRemirrorContext } from '@remirror/react';
import { WysiwygEditor } from '@remirror/react-editors/wysiwyg';

const htmlDiffer = new HtmlDiffer({
  ignoreAttributes: ["line-height","p"],
  compareAttributesAsJSON: [],
  ignoreWhitespaces: true,
  ignoreComments: true,
  ignoreEndTags: false,
  ignoreDuplicateAttributes: false
});

const compareHTML = (left, right) => {
  const diff = htmlDiffer.diffHtml(left, right);
  return diff;
};

const HTMLDiff = ({ left, right }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && left && right) {
      const differences = compareHTML(left, right);

      const result = differences.map(part => {
        if (part.added) {
          return `<ins class="diff-added">${part.value}</ins>`;
        } else if (part.removed) {
          return `<del class="diff-removed">${part.value}</del>`;
        } else {
          return part.value;
        }
      }).join("");

      containerRef.current.innerHTML = result;
    }
  }, [left, right]);

  if (!left || !right) {
    return <div>Both inputs must be provided.</div>;
  }

  return <div ref={containerRef} />;
};

export default HTMLDiff;
