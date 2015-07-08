---
layout: post
title: Bezier Curves
category: post
---

![Golden Spiral](/images/bezier-curve/golden-spiral.png)

Several weeks ago I implemented a Wavefront OBJ importer for bezier curves. I implemented it in C++ as an extension to the graphics base code that I had been working on prior to this. The implementation allows me to import and render any bezier curve that follows the Wavefront documented format.

<!--more-->

<ul id="toc"></ul>

## Overview

The vertices on the bezier curve are generated using a parametric equation. In the linear form, the equation is defined as `(1 - t) * p0 + t * p1`. The inputs consist of the `control points (p0…pX)` and a `t` value from 0.0 to 1.0. Once I acquired an understanding of the parametric curves and figured out the wavefront specifications it was a matter creating a small interface for importing, managing, and rendering the curves.

![Bezier Curve Points Debug](/images/bezier-curve/bezier-curve-points-debug.png)

The goal for me in this project was not to find the most performant solution, but to implement a functioning program to interpret and represent the data in OpenGL. If I were to extend this, I would probably evaluate the use of STL, dynamic memory allocations, and the interface.

While STL and dynamic allocations were sufficient for the needs of the project, in a production setting it would probably be more conducive to use custom collections with [custom allocators](http://chrisbrough.com/project/2013/01/Allocators/), or at least custom allocators.

The other thing I would do is to isolate this project into it's own library, that way there are no dependencies on the base code. The interface would be expose the data needed by rendering, animation, physics, etc. without creating a dependency, and thus allowing the code to be plugged into different code bases.

Also, for fun I implemented a fibonacci/golden spiral generator (see first image).

## Source

* [Download](/source/bezier-curve/bezier-curve.zip) - This is the bezier curve portion of the code; this will not compile as it depends on the base code, which will not be distributed at this time.
