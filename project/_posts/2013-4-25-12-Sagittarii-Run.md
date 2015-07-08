---
layout: post
title: Sagittarii Run
category: project
---

![Entrances](/images/sagittarii-run/entrances.jpg)

Over the course of 30 weeks I worked on a team of 1 producer, 3 programmers,
4 designers, 3 artists, and 1 qa tester. During this time I filled the role of
Lead Programmer on the team. The team chose to develop our game in Unity3D,
which would provide us an accessible interface and fast iteration time. We
initiated the development cycle by prototyping various concepts until we agreed
to develop a fast paced networked arcade racing game set near a black hole in
space. It's worth noting that our game, Sagittarii Run, won RPI Gamefest
“Excellence in Visuals Award” for the most impressive moment-to-moment visual
experience.

<!--more-->

<ul id="toc"></ul>

![Race](/images/sagittarii-run/race.jpg)

## Pre-Production

During my senior year at Senior year at Champlain College I worked on
pre-production and production for Sagittarii Run. The project was kicked off
with Grant Parker (Design), Jason Rauck (Design), Matt Ide (Artist), and
I (Programmer). For the first three and half months our team conceptualized
ideas, iterated on prototypes, and developed a vertical slice for the chosen
game. Through the entire development cycle we used an agile development
methodology.

### Prototyping

We kicked off pre-production by conceptualizing numerous designs, and
eventually we narrowed it down to a few concepts: a real-time strategy,
a platformer, and a racing game. After analyzing and realizing that the
development scope of the desired RTS game would be far too large for the size
of our team and the time that we had, we chose to cut it early. After narrowing
the concepts down to two ideas, we created initial prototypes to demonstrate
the desired game mechanics. Prior to starting production we agreed to use
Unity3D, which we found to be versatile and robust enough for any of our needs.
Unity is accessible, allows for fast iteration, and capable of a high level of
polish.

Over a few weeks we prototyped a platformer based around two characters in
a romantic relationship. For a demonstration of the concept, we designed and
developed a puzzle that had to be solved using a combination of the two
characters. The designers iterated on the concept, and proposed several
mechanics with which we prototyped; however, we realized that the concept in
the current state was not strong enough and was not a good fit for the team.

### Choosing An Idea

As we were iterating on the platformer, we had also been developing an initial
prototype of our racing game. The prototype demonstrated the high speed
experience along with a dimension switching mechanic which would be pivotal to
the game. As a team, we realized that we all had a strong interest in racing
and motor vehicles, so we came to the consensus that developing a racing
game would be the best fit for the team.

### Developing Vertical Slice

After iterating on different concepts and coming to a decision, we began
developing out racing prototype into a vertical slice of our desired vision. In
addition to developing the game in technical, design, and art facets, we also
spent time researching and planning the desired goal for the completed game at
the end of production. There were a few pivotal technical components to the
game that had to be implemented to bring the game to a functional state and
prepare it for the vertical slice: this included hover car and general racing
mechanics, networking, the node system, and dimension switching.

![Hover Car Prototype](/images/sagittarii-run/hover_car_prototype.png)

The hover car and general car mechanics took a lot of time to get them into
a playable state. Racing mechanics alone should not be underestimated, and
adding hovering adds a significant amount of complexity. With a lot of
research, iteration, and testing I was able to get a working hovering system in
place that functioned well on heightmaps, environmental objects, and extreme
ramps (e.g., a loop). The implementation was sufficient for our needs at the
time, but would need to be refactored into a more robust solution later.

As a racing game we wanted a competitive four to eight player experience. We
accomplished that by networking the game. Introducing networking meant that we
had to consider issues like choosing between client-to-client and
client-to-server, latency, and smoothing data. After some iteration and testing
we had the cars networked and moving smoothly. While there are limitations to
Unity's networking solution, it made it relatively quick to implement a working
solution; we even had networking working in one of our initial racing prototypes.

![Node System](/images/sagittarii-run/node_system.png)
![Unity Editor](/images/sagittarii-run/unity_editor.png)

Now that we had a functioning car in the desired form, it was time to implement
the waypoint system, which was critical to tracking the players and applying
gameplay events. For details on the system, see my previous entry
[here](http://chrisbrough.com/post/2012/11/Racing-Waypoint-System/). While
doing that system, I also became familiar with extending and creating custom
editors in Unity. This reduced the setup time significantly, and made the setup
process reasonably easy. Since then I've become quite a bit more familiar with
extending the editors, creating new views, and adding custom manipulation for the
scene which could further simplify the process of creating and using these
systems.

The waypoint system enabled us to easily assign dimension switching nodes
to nodes in the system. During production we further developed the system to
support dynamic rift spawning and accommodated for the overhauled dimension
switching system.

## Production

![Lave Cave](/images/sagittarii-run/lava_cave.jpg)

After exploring various concepts, prototyping, and creating a vertical slice of
our desired experience we moved into production where we fulfilled the play
experience that we set out to achieve. In production, our team expanded from
four to twelve working tirelessly for fifteen more weeks to refactor,
implement, and polish all of the systems in the game.

### Solidifying and Refining Design

![Mine Rails](/images/sagittarii-run/mine_rails.jpg)

There were a few major changes that the team decided to make starting at the
beginning of production. Those included: changing the race from a loop to
a sprint, defying gravity, and overhauling the dimension system.

Since there were a lot of changes in elevation throughout the track it meant
that at certain point the player would have to fight an up hill battle to get
back to the start line. Changing the races from a loop to a long sprint
(between 4-7 minutes per track) gave the player more variety and alleviated the
elevation based issues.

In the initial prototype, the loop obstacle was the only way to challenge
gravity. In the final game we wanted the player to be capable of driving on
surfaces in all directions. In one of the finished tracks, there's a massive
space ship that the hover cars fly into; in the ship they race together on
the floor, ceiling, and the walls. It's a far more intense experience especially
when you see other cars racing upside down.

Finally, the initial dimension system that we had was confusing and led to
a lot of difficulty for players. One of the dimensions would mutate the state
of the track around you, but often that would disorient the player and lead to
them crashing. To solve this and another problem, we decided that would we transport
the player to a separate platform where the goal would be to avoid the
obstacles and reach the end of the rift. The reward for going into the rift was
getting an advancement on the track, which would move the car closer to the
nearest car. For cars struggling to stay in the race, this was a great solution
to rubberband the players together and create a tight grouping. By revamping
this system, this increased the amount of fun and competition that was
experienced as players competed.

### Adding and Refactoring Systems

![Loop](/images/sagittarii-run/loop.jpg)

As programmers, we worked together to refactor and implement these changes into
the pre-existing game. It took a lot of iteration to get the
hover car working in all directions, but it eventually came together. We
considered and tried a few different approaches, including: raycasting the
environment to determine the appropriate response for the car, using a loose
connection to a spline to keep the car on a desired path, and using trigger volumes
to realign the player on the track. Based on our conceptual considerations and
testing, we found that the trigger volumes provided the most consistent and
reliable result. The new system allowed the car to realign to any surface with
the appropriate volumes. If we had more time, we could have even extended the
editor and scene view to support quick placement of volumes along the track.

![Rift Entrance](/images/sagittarii-run/rift_entrance.jpg)
![Inside Rift](/images/sagittarii-run/inside_rift.jpg)

The other most significant change was improving the wayoint system to better
support dynamic rift spawning and creating a rift area where players would try
to traverse a platform impeded by obstacles. The new
rifts were far more fun and created an intense challenge for a few moments. The
rift included dynamic spawning of obstacles and falling platforms.

![Car Select](/images/sagittarii-run/car_select.jpg)

In addition to the gameplay, it was necessary to have a complete GUI that was
consistent with an arcade experience. We kept the options to a minimum, and
created a very engaging car select screen and level select screen that could be
controlled with a racing wheel.

### Reaching The Finish Line

![Finish Line](/images/sagittarii-run/finish_line.jpg)

In the final weeks of the project, the team worked hard on all front to polish
and remove any bugs from the game. The levels were tweaked, the art was given
the final touches, and the code was improved to remove any know bugs.

A lot of time and work was put into this project by all members of the team.
The experience was really gratifying and helped to reinforce previous
experience I've had working on large teams on game development. As with other
projects I've worked on, this has helped to confirm my interest in working with
really passionate people in such a creative environment!

![Playing](/images/sagittarii-run/playing.jpg)

### Trailer

At the end of the semester all of the teams presented their finished games to
fellow students, professors, and numerous game developers from the east coast.
It was exciting to officially reveal the finished game that we had been working
so hard on. Along with the presentation, anyone was able to jump on a computer
and join a racing session.

<iframe width="560" height="315" src="http://www.youtube.com/embed/rseivPo3hGE" frameborder="0" allowfullscreen></iframe>

The process of designing, visualizing, programming, and bringing a game to
life with others is an amazing process that I want to continue to be apart of
in the future!
