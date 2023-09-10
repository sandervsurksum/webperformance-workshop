You can use the webperf-snippets as a Snippet in the Chrome DevTools Sources tab.

1. Copy any of the WebPerf Snippets
2. [Open Chrome DevTools](https://developer.chrome.com/docs/devtools/open/)
3. Select the Sources tab
4. Select the Snippets sub tab
5. Click New snippet button, e.g. [LCP](https://github.com/nucliweb/webperf-snippets#largest-contentful-paint-lcp)
6. Write the snippet name, LCP
7. Paste the copied code at the right area
8. Run the snippet

## Core Web Vitals

### Largest Contentful Paint (LCP)

List the Largest Contentful Paint in the console and add a blue dotted line in the LCP element.

```js
/**
 * PerformanceObserver
 */
const po = new PerformanceObserver((list) => {
  let entries = list.getEntries();

  entries = dedupe(entries, "startTime");

  /**
   * Print all entries of LCP
   */
  entries.forEach((item, i) => {
    console.dir(item);
    console.log(
      `${i + 1} current LCP item : ${item.element}: ${item.startTime}`
    );
    /**
     * Highlight LCP elements on the page
     */
    item.element ? (item.element.style = "border: 5px dotted blue;") : "";
  });

  /**
   * LCP is the lastEntry in getEntries Array
   */
  const lastEntry = entries[entries.length - 1];
  /**
   * Print final LCP
   */
  console.log(`LCP is: ${lastEntry.startTime}`);
});

/**
 * Start observing for largest-contentful-paint
 * buffered true getEntries prior to this script execution
 */
po.observe({ type: "largest-contentful-paint", buffered: true });

function dedupe(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
```

### Cumulative Layout Shift (CLS)

```js
try {
  let cumulativeLayoutShiftScore = 0;
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        cumulativeLayoutShiftScore += entry.value;
      }
    }
  });

  observer.observe({ type: "layout-shift", buffered: true });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      observer.takeRecords();
      observer.disconnect();

      console.log(`CLS: ${cumulativeLayoutShiftScore}`);
    }
  });
} catch (e) {
  console.error(`Browser doesn't support this API`);
}
```

### Time To First Byte

Measure the time to first byte, from the document

```js
new PerformanceObserver((entryList) => {
  const [pageNav] = entryList.getEntriesByType("navigation");
  console.log(`TTFB (ms): ${pageNav.responseStart}`);
}).observe({
  type: "navigation",
  buffered: true,
});
```