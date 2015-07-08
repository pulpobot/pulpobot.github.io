---
layout: post
title: Maze Solver
category: project
---

![Exit](/images/maze/exit.gif)
![No Exit](/images/maze/no-exit.gif)

The maze solver is a small C++ console application made to locate a maze's exit
(if one exists). It's currently configured to except any 12 x 12 maze written
to a text file.

<!--more-->

<ul id='toc'></ul>

## Mazes

The mazes are constructed from a text file of 1s (walls) and 0s (empty spaces).
The application solves the maze by following the [*right-hand
rule*](http://en.wikipedia.org/wiki/Maze_solving_algorithm#Wall_follower). The
following are a couple of maze examples that adhere to the *right-hand rule*:

    Exit                        No Exit

    1 1 1 1 1 1 1 1 1 1 1 1     1 1 1 1 1 1 1 1 1 1 1 1
    1 0 0 0 1 0 0 0 0 0 0 1     1 0 0 0 1 0 0 0 0 0 0 1
    0 0 1 0 1 0 1 1 1 1 0 1     1 0 1 0 1 0 1 1 1 1 0 1
    1 1 1 0 1 0 0 0 0 1 0 1     1 1 1 0 1 0 0 0 0 1 0 1
    1 0 0 0 0 1 1 1 0 1 0 0     1 0 0 0 0 1 1 1 0 1 0 1
    1 1 1 1 0 1 0 1 0 1 0 1     1 1 1 1 0 1 0 1 0 1 0 1
    1 0 0 1 0 1 0 1 0 1 0 1     1 0 0 1 0 1 0 1 0 1 0 1
    1 1 0 1 0 1 0 1 0 1 0 1     1 1 0 1 0 1 0 1 0 1 0 1
    1 0 0 0 0 0 0 0 0 1 0 1     1 0 0 0 0 0 0 0 0 1 0 1
    1 1 1 1 1 1 0 1 1 1 0 1     1 1 1 1 1 1 0 1 1 1 0 1
    1 0 0 0 0 0 0 1 0 0 0 1     1 0 0 0 0 0 0 1 0 0 0 1
    1 1 1 1 1 1 1 1 1 1 1 1     1 1 1 1 1 1 1 1 1 1 1 1


## Source

* [Download](/source/maze/maze.zip)
