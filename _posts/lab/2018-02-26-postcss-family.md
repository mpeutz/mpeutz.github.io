---
layout: lab-article
permalink: lab/postcss-family/
title: Postcss Family plugin
exerpt: Family is a set of 26 smart Postcss functions which will help you to manage the style of :nth-child elements, in an easy and classy way.
source: https://github.com/mpeutz/postcss-family
img: lab/family.png
imgTitle: family
category: lab
tags:
  - tag: postcss
  - tag: family
  - tag: nth-child
---

<style type="text/css">
/* stylelint-disable */
.list {
    list-style: none;
    padding: 0;
    margin: 0;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-flow: row wrap;
    counter-reset: fam; 
}
.list li {
    float: left;
    padding: 0.5em 0;
    margin: 4px 0;
    margin-right: 4px;
    margin-bottom: 5px;
    background: rgba(255,255,255,0.5);
    background: linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.6));
    border-radius: 3px;
    background-color: #eee;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.list li:before {
    counter-increment: fam;
    content: counter(fam)
}

.controls {
    display:flex;
    justify-content: flex-end;
        flex-wrap: wrap;
    align-items: center;
    margin-bottom: 36px;
}

.controls p {
    display: inline-block;

    font-family: sans-serif;
    font-size: 12px;
    margin-right: 8px;
    margin-bottom: 0;
}

.deleteMe,
.addMe {
    display: inline-block;
    width: 36px;
    margin-right: 5px;
    cursor: pointer;
    text-align: center;
    border-radius: 4px;
    border: 2px solid currentColor;
    font-size: 32px;
    line-height: 28px;
    user-select: none;
}

.deleteMe:hover,
.addMe:hover {
    color: #eb5757;
    border-color: currentColor;
}

.list.first li:nth-child(-n+3),
.list.last li:nth-last-child(-n+3),
.list.after-first li:nth-child(n+6),
.list.from-end li:nth-last-child(3),
.list.between li:nth-child(n+3):nth-child(-n+6),
.list.even-between li:nth-child(even):nth-child(n+3):nth-child(-n+12),
.list.odd-between li:nth-child(odd):nth-child(n+3):nth-child(-n+13),
.list.n-between li:nth-child(3n):nth-child(n+3):nth-child(-n+12),
.list.all-but li:not(:nth-child(3)),
.list.each li:nth-child(3n),
.list.every li:nth-child(3n),
.list.from-first-last li:nth-child(2),
.list.from-first-last li:nth-last-child(2),
.list.middle li:nth-child(6),
.list.all-but-first-last li:nth-child(n+3):nth-last-child(n+3),
.list.first-of li:nth-last-child(10):first-child,
.list.last-of li:nth-of-type(10):nth-last-of-type(1),
.list.at-least li:nth-last-child(n+510), .list.at-least li:nth-last-child(n+10) ~ li,
.list.at-most li:nth-last-child(-n+5):first-child, .list.at-most li:nth-last-child(-n+5):first-child ~ li,
.list.in-between li:nth-last-child(n+5):nth-last-child(-n+10):first-child, .list.in-between li:nth-last-child(n+5):nth-last-child(-n+10):first-child ~ li,
.list.first-child li:first-of-type,
.list.last-child li:last-of-type,
.list.even li:nth-child(even),
.list.odd li:nth-child(odd),
.list.first-last li:first-child,
.list.first-last li:last-child,
.list.unique li:only-child,
.list.only li:only-child,
.list.all-but-first li:not(:first-child),
.list.all-but-last li:not(:last-child),
.list.not-unique li:not(:only-child) {
    background: #eb5757;
    font-weight: bold;
    color: white;
}
/* stylelint-enable */
</style>

This is a postcss port of the awesome [Family.scss](http://lukyvj.github.io/family.scss/) plugin

> Family is a set of **26** smart Postcss functions which will help you to manage
> the style of `:nth-child`'ified elements, in an easy and classy way.
> *- Family.scss*

## Why

When I was using sass to build my css I fell in love with the Family.scss plugin. It made complex nth-child selector a breeze to write. So when I moved to postcss I looked for a port of it. To my dismay there was none, there were a few attempts but no usable version. That is when I decided that if I wanted it I would have to build it and postcss-family was born.

## Usage

You can call the family command using the at rule `@fam` followed by the appropriate keyword and parameter (if applicable).

This plugin requires postcss nesting called after postcss-family

```css
/* input.css */
ul li {
  background: red;

  @fam first(3) {
    background: blue;
  }
}
```

```css
/* output.css */
ul li {
  background: red;
}
ul li:nth-child(-n + 3) {
  background: blue;
}
```

## PostCSS-Family Available keywords

### Sequence Queries

##### First
```css
@fam first(3);
```
<div class="controls">
    <ul class="list first"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### Last
```css
@fam last(3);
```
<div class="controls">
    <ul class="list last"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### After-First
```css
@fam after-first(5);
```
<div class="controls">
    <ul class="list after-first"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### From-end
```css
@fam from-end(3);
```
<div class="controls">
    <ul class="list from-end"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### Between
```css
@fam between(3, 6);
```
<div class="controls">
    <ul class="list between"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### Even-Between
```css
@fam even-between(3, 12);
```
<div class="controls">
    <ul class="list even-between"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### Odd-Between
```css
@fam odd-between(3, 13);
```
<div class="controls">
    <ul class="list odd-between"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### N-between
```css
@fam n-between(3, 3, 13);
```
<div class="controls">
    <ul class="list n-between"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### All-but
```css
@fam all-but(3);
```
<div class="controls">
    <ul class="list all-but"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### each
```css
@fam each(3);
```
<div class="controls">
    <ul class="list each"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### every
```css
@fam every(3);
```
<div class="controls">
    <ul class="list every"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### middle
```css
@fam middle(11);
```
<div class="controls">
    <ul class="list middle"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### All-but-first-last
```css
@fam all-but-first-last(2);
```
<div class="controls">
    <ul class="list all-but-first-last"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### From-first-last
```css
@fam from-first-last(2);
```
<div class="controls">
    <ul class="list from-first-last"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>

### Quantity Queries
##### first-of
```css
@fam first-of(10);
```
<div class="controls">
    <ul class="list first-of"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### last-of
```css
@fam last-of(10);
```
<div class="controls">
    <ul class="list last-of"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### at-least
```css
@fam at-least(10);
```
<div class="controls">
    <ul class="list at-least"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### at-most
```css
@fam at-most(5);
```
<div class="controls">
    <ul class="list at-most"><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### in-between
```css
@fam in-between(5, 10);
```
<div class="controls">
    <ul class="list in-between"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>


#### No Parameter Queries
---
##### first-child
```css
@fam first-child;
```
<div class="controls">
    <ul class="list first-child"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### even
```css
@fam even;
```
<div class="controls">
    <ul class="list even"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### odd
```css
@fam odd;
```
<div class="controls">
    <ul class="list odd"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### all-but-first
```css
@fam all-but-first;
```
<div class="controls">
    <ul class="list all-but-first"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### all-but-last
```css
@fam all-but-last;
```
<div class="controls">
    <ul class="list all-but-last"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### first-last
```css
@fam first-last;
```
<div class="controls">
    <ul class="list first-last"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### unique
```css
@fam unique;
```
<div class="controls">
    <ul class="list unique"><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### only
```css
@fam only;
```
<div class="controls">
    <ul class="list only"><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>
---
##### not-unique
```css
@fam not-unique;
```
<div class="controls">
    <ul class="list not-unique"><li></li><li></li></ul>
    <p>Add or Remove items:</p> <div class="addMe">+</div><div class="deleteMe">–</div>
</div>


More function documentation: [family.scss](http://lukyvj.github.io/family.scss/);
*This port is missing the child-index mixin.*
