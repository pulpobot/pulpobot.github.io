---
layout: post
title: Quadtree Level of Detail for Heightmaps
category: project
---

![Terrain Angle - Detail Low](/images/quadtree/terrain-angle-low.png)

![Terrain Angle - Detail High](/images/quadtree/terrain-angle-high.png)

As a final project in the 3D Graphics Programming course at Champlain College (taught by [John Pile](http://alaska-john-portfolio.blogspot.com/)), we were tasked with the following:


> Research, implement, and present an “advanced graphics” technique.

I chose to implement level of detail (lod) for terrains
([heightmaps](http://www.videotutorialsrock.com/opengl_tutorial/terrain/text.php))
using a quadtree, C++, and OpenGL. In this technical write up, I will be
describing the process and techniques I used to create the quadtree and level
of detail implementation.

<!--more-->

<ul id="toc"></ul>

## Representing the Terrain with Triangle Fans

![Triangle Fan](/images/quadtree/triangle-fan-lod.png)

The terrain is created using triangle fans. The terrain must be a power of two
(e.g., 256 x 256, 512 x 512). In _Figure 1_, the terrain is set to the lowest
level of detail with one triangle fan. At this stage, the center point and all
outer points (NW, NE, SE, SW) are enabled. If a higher level of detail is
desired (it probably is), then _Figure 1_ can be broken into smaller sections.
_Figure 2_ shows an additional triangle fan being added to the north-west
quadrant. When a higher lod triangle fans is added, the enabled points of the
lower lod triangle fan must be reconfigured. From _Figure 1_ to _Figure 2_ the
lowest level of detail would disable the north-west point, and enable the north
and west points added by the new triangle fan. _Figure 3_ shows the combined
triangle fans (white points = lower lod triangle fan, red points = higher lod
triangle fan, red/white points = lower and higher lod triangle fan).
For a more comprehensive look at this process, please see Thater Ulrich's
article, [Continuous LOD Terrain Meshing Using Adaptive
Quadtrees](http://www.gamasutra.com/view/feature/131841/continuous_lod_terrain_meshing_.php?page=1).

## Initializing, Updating, and Drawing the Quadtree

The next step is to take the triangle fan data, and store it in quadtree. I constructed the quadtree with the following components:

    * 1 parent nodes : type quadtree
    * 4 child nodes : type quadtree
    * 4 neighbor nodes (north, south, east, west) : type quadtree
    * 1 center point (x, y, z) : type vector3 or float[3]
    * 4 outer points (x, y, z) : type vector3 or float[3]

The first step is the initialization of the data. For this project, I chose to initialize all of the data (all levels of detail) at runtime; a more efficient technique might be to load the terrain in chunks, or only load levels of detail when you need them. The triangle fan in _Figure 1_ can be added to the quadtree by creating a node and adding the (center and outside) points as data. To initialize a higher lod, a child of the previous node can be created. The initialize function would look something like:

    instantiate nodes
    setup node positions
    while width of current node is greater than one
        call initialize on child nodes

<iframe src="http://player.vimeo.com/video/40787028" width="600" height="600" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

![Terrain Details Overhead](/images/quadtree/terrain-overhead-flat.png)

The next step is to update which nodes and node points should be enabled. This
is determined by the camera's distance from a particular point. The formula
([source](http://people.cs.ubc.ca/~heidrich/Papers/WSCG.98.pdf)) determining
which nodes should be enabled is as follows:

    length = distance between point and camera
    d = width or depth of quad
    C = constant
    (length/d) < C

The other portion of the update is determining which points in each triangle fan are enabled (as _Figures 1-3_ show). Points will be enabled depending on whether child nodes are enabled. The update function would look something like:

    if lod is enabled (i.e., (length/d) < C)
        then set node to enabled
        then determine which points are enabled in current node
        then call update on child nodes

![Terrain](/images/quadtree/terrain.png)

Finally, the data stored by the initialize function and manipulated by the update function should be drawn. The exact structure of the draw function will be determined by the way the data is stored. The draw function would look something like:

    if node is enabled
        then draw node
        then call draw on child nodes

## Limitations, Progress, and Additional Features

The quadtree level of detail implementation that I described works, but there are many improvements that could be made. As of now, there are three main things that need to be improved or fixed: t-junctions/cracks, popping, and performance.

![T-Junction](/images/quadtree/triangle-fan-t-junction.png)

T-Junctions or cracks, occur when there is a change in the level of detail between neighboring nodes. The result of a t-junction, as shown in _Figure 4_ by the additional red point, is gap in the terrain. This can be solved by checking the neighbor nodes to see if an additional point needs to be added. I'm currently in the process of fixing the t-junctions. I've implemented the traversals necessary for determining neighboring nodes; now I just need to correctly enable the additional points.

![Popping](/images/quadtree/triangle-fan-popping.png)

Popping is another issue that arises when apply level of detail to terrains. Points are removed from the terrain when reducing the level of detail. If there's a large difference between points, then the terrain may drastically increase or decrease in height. The red point in _Figure 5_ is a point that could potentially be disabled, if it was, then the height at that point would be nonexistent. A potential solution could be to check the distance between points, and if there greater than a certain amount, then the point should be enabled.

The level of detail implementation, in comparison to full detail triangle strips, has improved the performance. While the performance has improved, there are number of techniques that could be used to make a significant improvement. As of now, the entire terrain is being updated, when only the portion in view need to be. I've started looking into frustum culling, which would drastically reduce the number of calculations and calls for every frame. This would cut out unnecessary time spent on the terrain that is out of view.

<iframe src="http://player.vimeo.com/video/40787128" width="600" height="600" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

![Water Ripple](/images/quadtree/terrain-water.png)

In addition to the level of detail implementation, I have added a water ripple effect and height based color effect in the vertex shader using:

### Water Ripple
    time = elapsed time
    distance = distance from center
    vertex.y = (sin((distance + time)/100)) * 20

### Height Base Color
    percent = position between min and max height
    color = mix(minColor, maxColor, percent);

I've enjoyed working on this project over the past couple of weeks, and I intend to continue working on my implementation. In the near future, I hope to fix some of the issues I described above, as well as implement new features.

<iframe src="http://player.vimeo.com/video/40784896" width="600" height="600" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
