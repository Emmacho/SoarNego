// src/components/HTMLDiff.js
import React from "react";
import DiffMatchPatch from "diff-match-patch";

const removeHtmlTags = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  const paragraphs = div.getElementsByTagName("p");
  let result = "";

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    result += paragraph.textContent || paragraph.innerText || "";

    if (i < paragraphs.length - 1) {
      result += "\n\n";
    }
  }

  return result;
};

const compareHTML = (left, right) => {
  const dmp = new DiffMatchPatch();
  const leftText = removeHtmlTags(left);
  const rightText = removeHtmlTags(right);
  const diff = dmp.diff_main(leftText, rightText);
  dmp.diff_cleanupSemantic(diff);
  return dmp.diff_prettyHtml(diff);
};

const HTMLDiff = ({ left, right }) => {
  if (!left || !right) {
    return <div>Both inputs must be provided.</div>;
  }

  const result = compareHTML(left, right);
  return <div dangerouslySetInnerHTML={{ __html: result }} />;
};

export default HTMLDiff;
