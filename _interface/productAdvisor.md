---
layout: gallery
category: ui
title: Product Advisor
width: 1200
height: 760
unit: px
app: Figma
image: interface/interface-cover.png
---

Product Advisor was ambitious project. The idea was to make a visual product filter and selection tool for electronic parts. Typically these parts are selected using filters an huge tables. It can be quite daunting and labor intensive. So the goal of this product selector was to make the process simpler, more accurate and quicker.

<figure class="mp-post-figure">
  <div class="mp-post-img mp-img-loader" data-src="{{ site.baseurl }}/assets/images/interface/limiting-filters.png" alt="Product Advisor App"></div>
  <figcaption class="mp-post-caption">Initial part location using a circle packing distribution interface.</figcaption>
</figure>

Users can see how many parts are in each given category and get an understanding of the taxonomy as they navigate to their desired selection. There is also a more traditional way to navigate with the list view on the side. Both interfaces are in sync to reinforce the ‘shape’ of the taxonomy.  See a [Circle Packing example](http://bl.ocks.org/mbostock/7607535)

<figure class="mp-post-figure">
  <div class="mp-post-img mp-img-loader" data-src="{{ site.baseurl }}/assets/images/interface/graph.png" alt="Product Advisor App"></div>
  <figcaption class="mp-post-caption">Limiting Filters and Part Visualizer.</figcaption>
</figure>

Users adjust limiting parameters of their part search such as, voltage ranges, package configurations, and applications. These course filters narrow the parts pool that the advisor has to process making it more accurate in the resulting part suggestions.

<figure class="mp-post-figure">
  <div class="mp-post-img mp-img-loader" data-src="{{ site.baseurl }}/assets/images/interface/results.png" alt="Product Advisor App"></div>
  <figcaption class="mp-post-caption">Recommendations.</figcaption>
</figure>

 The product advisor’s algorithm will select the best part based on the users input. Then it will select two alternate parts focusing on maximizing pricing and performance. From this recommend list the user can quickly purchase the part, find more information, and refine the filter parameters. 