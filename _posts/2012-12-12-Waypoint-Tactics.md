---
layout: post
title: Waypoint Tactics
category: post
---

Earlier in the semester I spent some time with pathfinding and waypoint systems. For the senior pre-production, Grant Parker (Designer), Jason Rauck (Designer), Matt Ide (Artist), and I have been developing a racing game in Unity3D. As we progressed through development of the prototype, the game needed a mechanism for tracking player progress on the track. That mechanism was a waypoint/pathfinding system that cached distance data about points around the track. As our team moves into senior production we're considered adding AI to help increase the number of opponents in the game. To help offset the challenge, I've started looking into waypoint tactics.

<!--more-->

<ul id="toc"></ul>

![Node Tracker](/images/waypoint-system/node-tracker.png)

In the [racing waypoint system](http://chrisbrough.com/post/2012/11/Racing-Waypoint-System/) nodes can be placed along the track and linked together for tracking player progress. While in the editor I preprocess the nodes using pathfinding to determine the distance around the track to the finish line. The cached data is then used in-game to set the player position. By considering waypoint tactics, the AI player will have data to determine the desired path when navigating around the track. 

## Technique

The technique involves using waypoint nodes with associated tactical information. Waypoints mark destinations isolated or linked destinations in a level. By adding tactical information, the AI can make practical decisions about the next action to take.

![Waypoint Tactics](/images/waypoint-tactics/shooter.png)

In this rough sketch, the shooter has several potential waypoints to maneuver between. A few critical waypoints have been marked, but in an actual implementation there would probably be numerous others. At some point the AI directed the shooter to take cover behind a wall; maybe the shooter's safety would be threatened out in the open. From here, the AI can calculate the next move.

Each of these tactical waypoints can contain additional information that used to decide the destination. In the sketch above, the player can choose between a wall, window, door, and water tower. The shooter is on the defensive while taking cover, but could potentially go on the offensive by moving up to the window or door, and shooting at potential enemies inside. Maybe the shooter is a sniper, and the ideal position would be the water tower. The AI can determine these choices by looking at the data that has been associated with each node. Each attribute can be associated with a weight (i.e., continuos tactics). So the shooter has 100% coverage behind the wall, 50% behind the window, and 0%-100% behind the door (open/closed).

![Room](/images/waypoint-tactics/room.png)

In this room there are numerous points of interest: inaccessible areas, defensive points, doors, and unknowns. In one case, the AI can use ordinary states or decisions to determine the next action, and then use the tactical waypoints to accommodate for the state or decision. Or the AI could use the tactical waypoints to help make the state change or decision. If the AI doesn't use the tactical waypoints in the process of determining in action, then the AI could make a "foolish" decision that has been finalized by the time the tactical information is used.

All of waypoints and associated data will either be created by a designer or automatically generated before or during gameplay. According to the sources referenced below, there seems to be a fine balance between computer automation and human intervention.  While there are algorithms automating node placement, those tend to be more prone to errors, and thus still need a human's oversight. Unlike the nodes themselves, the tactical attributes associated with nodes can be generated often times. There are numerous methods for analyzing and acquiring tactical data; maybe raycasting to determine the line of sight or analyzing the lighting to determine areas covered in shadows. The waypoint system for the racing game I'm working on generates each node's distance to the finish line by pathfinding before runtime.

There a lot of things to consider when dealing tactical waypoints, but at the root it's a simple system of nodes with attributes. Depending on the use, tactical waypoints can be a very powerful system for making AI decisions.

## Application

Waypoint tactics can be applied in a lot of different game genres. I think one of more obvious uses would be for controlling enemies in FPS game. Such opposition would need to handle navigating through the environment. The AI would actively  need to defend or oppose the opposition; possibly by finding cover or actively shooting. In Killzone, the AI dynamically evaluates the situation, and determines the appropriate action. The system uses threats, waypoints, attributes, and other constraints to make decisions. Any game that makes use of a waypoint system could benefit from the additional attributes associated with each point.

If we decide to move forward with adding AI opponents in our racing game, we'll have to consider additional tactical information that can be associated with each node. AI opponents will have to account for the difficulty of each path and where other cars have gone. Ideally, we would like to keep cars grouped together; so it might be beneficial if nodes could track where cars have been. Then the AI can analyze the current data, and determine the best path according to the current game state.

## Suitability

Waypoint tactics should work well on most platforms. Like many other systems, we must decide what is and isn't pre-cached. It's a balance between memory use and processing. If one of these areas is lacking or usage needs to be minimized for some reason, then the focus will need to be shifted to the other.

As presented in Artificial Intelligence for Games, waypoints may  repeat data for different states. For example, the cover at a position might change when the player is standing, crouched, or prone. Just that difference triples the amount of data needed if everything is pre-cached. Instead of storing all three states, store the most common, and then process the other ones when needed at runtime. This approach will end up processing more data more regularly; however, data could be processed over several frames to reduce the overhead.

These decisions should be made according to the constraints of the platform and needs of other systems. Our current racing game can afford the overhead of pre-caching the minute number of nodes needed, but a game with more expansive levels may not be able to.

## Sources

* Artificial Intelligence for Games - Waypoint Tactics, by Ian Millington and John Funge
* Game Programming: Gems 2 - Terrain Reasoning for 3D Action Games, by Mark A. DeLoura
* [Strategic and Tactical Reasoning with Waypoints](http://www.liden.cc/lars/WEB/Resume/Papers/2002_AIWisdom.pdf), by Lars Liden
* [Killzone's AI: Dynamic Procedural Tactics](http://www.slideshare.net/guerrillagames/killzones-ai-dynamic-procedural-tactics-9885496), by Arjen Beij and Remco Straatman