/**
 * In this file, the HTMLDiff component accepts two HTML strings, left and right, 
 * and displays their differences using the HtmlDiffer library. 
 * The HtmlDiffer is configured with specific options, and the compareHTML function 
 * uses it to generate the differences between the input HTML strings. 
 * The cleanHTML function is used to clean the generated 
 * HTML differences for better viewing. 
 * The component updates the displayed differences 
 * using the useEffect hook whenever the input HTML strings change. 
 * If both inputs are not provided, an error message is displayed.
 * */

import React, { useEffect, useRef } from "react";
/** @library https://github.com/bem/html-differ  */ 
import { HtmlDiffer } from "html-differ";

// Create a new HtmlDiffer instance with the specified options
const htmlDiffer = new HtmlDiffer({
  ignoreAttributes: ["line-height", "p"],
  compareAttributesAsJSON: [],
  ignoreWhitespaces: true,
  ignoreComments: true,
  ignoreEndTags: false,
  ignoreDuplicateAttributes: false,
});

// Function to compare the left and right HTML content and return the differences
const compareHTML = (left, right) => {
  const diff = htmlDiffer.diffHtml(left, right);
  return diff;
};

// Function to clean the HTML using DOMParser for better viewing
const cleanHTML = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.innerHTML;
};

// HTMLDiff component accepts left and right HTML content and displays their differences
const HTMLDiff = ({ left, right }) => {
  const containerRef = useRef(null);

  // Update the displayed differences whenever the left or right content changes
  useEffect(() => {
    if (containerRef.current && left && right) {
      const differences = compareHTML(left, right);

      // Map the differences to appropriate HTML elements (ins and del) and join the result
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

      // Clean the result using the cleanHTML function
      const cleanedResult = cleanHTML(result);
      containerRef.current.innerHTML = cleanedResult;
    }
  }, [left, right]);

  // Return an error message if both inputs are not provided
  if (!left || !right) {
    return <div>Both inputs must be provided.</div>;
  }

  // Render the container div and set its ref to containerRef
  return <div ref={containerRef}></div>;
};

export default HTMLDiff;
