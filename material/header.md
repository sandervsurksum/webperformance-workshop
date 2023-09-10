# Optimal header order

Issues within the <head> tag of your HTML document can lead to a gap between TTFB and Start Render. This gap represents the delay that occurs before your users start seeing any pixels being painted on their screens. This delay can be due to a number of reasons, often related to inefficient or incorrect use of elements within the <head> tag. Large CSS files, render-blocking JavaScript, improperly used meta tags, or simply an excessive amount of data within the <head> tag can all contribute to this performance delay.

This article will serve as your comprehensive guide to successfully implement and optimise a performing <head> tag. 

First of all make sure that your had tag is valid!
Only put the following elements in your head tag: 

```
<title>
<base>
<link>
<style>
<meta>
<script>
<noscript>
<template>
```

As stated above the head is responsible for delaying the start render. Make sure to remove as much as possible from the head.

Move low priority script to the closing </body> tag

Remove any redirects in the head

Reduce the size of payload (only put stuff that is actually used on the page)

After cleaning up the head we can change the order of the items in the head.

The order of the head is really important because the browser will handle each script or differently. For instance, if JavaScript files are positioned after CSS, the downloading of the JavaScript will be postponed until the CSS is fully downloaded.

Harry Roberts made a study of anylysing the head tag. He found out that there's an optimal order for performance. 

The optimal order for the <head> tag is:

```
* <meta charset />
* <meta name="viewport" />
* <title>
* preconnect/dns-prefetch
* <script src="" async></script>
* <script>// Inline JS</script>
* <script src=""></script>
* <link rel="stylesheet" />
* <style>/* Inline CSS */</style>
* preload
* <script src="" defer></script>
* prefetch`/`prerender
* Everything else (icons, Open Graph, etc.)
```

Keep in mind to test this thourogly because there could always be some usecase where this doesn't work well. 