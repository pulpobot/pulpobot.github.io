---
layout: post
title: Racing Waypoint System
category: post
---

![Node Tracker](/images/waypoint-system/node-tracker.png)

I'm currently working on a racing game with Grant Parker (Designer), Jason Rauck (Designer), and Matt Ide (Artist). Racing games need to be able to track the position of the players, so in a recent sprint I developed a waypoint system with support for branching and margining paths. The system provides an easy mechanism for placing and connecting nodes (i.e., waypoints) around the track.

<!--more-->

<ul id="toc"></ul>

## Tracking

![Scene](/images/waypoint-system/scene.png)

The goal of the system is to track the position of the cars on the track. To track the position of cars I use three checks:

1. current lap count
2. current node distance to end
3. car distance to nearest node

Getting the above information is simple when the race track has a single path from start to end, because the data can be stored in a single linked list. Since our game supports branching and merging paths, finding a node's distance to the end of the track is a little more difficult. If a node is placed before a shortcut, then there are two or more potential paths to the end with different lengths. To solve this I employed a pathfinder to determine the distance of the nodes.

## Pathfinding

![Pathfinding](/images/waypoint-system/pathfinding.png)

The pathfinder simple traversed through the nodes in the directed graph, and gave each node a distance to the end. I initially set up the pathfinder to find the shortest path; however, it quickly became obvious that the results would yield paths that are potentially shorter for cars before a shortcut than after one.

![Pathfinding Diagram](/images/waypoint-system/pathfinding-diagram.png)

In the diagram above, car #1 is in first place and car #2 is second place when using the shortest path pathfinder. Since car #1 is not on the shortcut, it should not be assumed that the player will take a better path. To fix this, I instead search for the longest path from each node to the end node. Using the longest paths car #1 is in second place and car #2 is in first place. Car #1 would have to either take a shortcut (that has shorter path) or pass car #2 to take the lead.

I calculate the paths for all of the nodes before runtime using Unity3D's serializer. The current system has worked well so far, and with some minor changes it can be used as waypoint and checkpoint system. 

## Lap Counter

Part of a racing game is tracking the lap counter (either incrementing to a count or decrementing from a count). If the track only has one path, then I can track to see if the player hit all of the nodes before hitting the end node. Since there's a potential for multiple paths, I don't have a simple way of determine which nodes the player should hit before reaching the end node. While it's possible to figure it out, I would also have to account for the player turning around and changing paths. In order to avoid unnecessary complexity, I decided to keep track of the intended, reverse intended, and actual hit order of the player in three integers. 

Using a 32-bit int I store the previous node id in the left 16-bits and the current node id in the right 16-bits for the intended order. Then I take the reverse to get the reverse intended order. 

{% highlight cpp %}

bool isCounting = true;

int lapCount = 0;

int endNodeId = 0;
int preEndNodeId = 10;

int intendedHitOrder = 0;
int reverseIntendedHitOrder = 0;
int actualHitOrder = 0;

intendedHitOrder = preEndNodeId;
intendedHitOrder <<= 16;
intendedHitOrder += endNodeId;

reverseIntendedHitOrder = endNodeId;
reverseIntendedHitOrder <<= 16;
reverseIntendedHitOrder += preEndNodeId;

{% endhighlight %}

Whenever the current node changes, just shift the current node to the previous slot, and add the current node id.

{% highlight cpp %}

actualHitOrder <<= 16;
actualHitOrder += currentHitNodeId;

{% endhighlight %}

Once the hit orders are set, we can determine when to increment/decrement the lap counter. The bool `isCounting` is set to true when the players `actualHitOrder` equals the `intendedHitOrder`, and false otherwise. If the player goes in reverse through the start point, then the counter is turned off until the player returns through the start point in the intended order; when the player returns through the start point, the `actualHitOrder` is reset and nothing is added to the counter because the player never went around the track.

{% highlight cpp %}

if (isCounting && intendedHitOrder == actualHitOrder)
{
	lapCount++;
	actualHitOrder = 0;
}
else if (intendedHitOrder == actualHitOrder)
{
	isCounting = true;
	actualHitOrder = 0;
}
else if (reverseIntendedHitOrder == actualHitOrder)
{
	isCounting = false;
	actualHitOrder = 0;
}

{% endhighlight %}

This is a full proof strategy as long as you have collision walls or an automatic reset to keep the players on the track. Otherwise players can increment/decrement their lap count by circumventing the start point (i.e., navigating to the other side of the start point without going in reverse through it or going around the track).

## Editor

![Editor](/images/waypoint-system/editor.png)

Since we're developing the game in Unity3D, I extended the inspectors to support creating, connecting, and deleting nodes using buttons or key commands. I also added a small connection wizard for connecting and disconnecting nodes in the graph. Once all of the nodes are placed, then the system calculates the distance from each node to the end node. If any of the nodes are added, changed, or removed then the system can refresh the path distances. 

In the future, I'll extend scene to support quick placement and connection of nodes with the mouse. Once I've improved the systems and the editor interface, I'll release a race tracker package.
