---
layout: post
title: Spacewar - Networking Game Jam
category: post
---

![Spacewar](/images/spacewar/spacewar.png)

In the last Networking for Games class we spent two and half hours doing game jam with a networked game. The goal of the game jam was to build *[Spacewar!](http://en.wikipedia.org/wiki/Spacewar!)* in XNA. With the challenge in hand, Alex Tardif and I joined forces, and recreated the nostalgic game. 

<!--more-->

Given the challenge of making *Spacewar!* in a limited time frame, we chose to use my code base which was already oriented for a networked top-down shooter. While far from perfect, the codebase was sufficient for the needs of the game. At this point we began hacking in the necessary changes to create *Spacewar!*.

Our task list consisted of the following:

- Ship Movement
- Ship Health
- Star Gravity
- Visuals

Before the game jam, I had already built in the necessary systems to pass data with headers. Anything new that we needed to send between clients, like health, could be painlessly added:

	declare new packet header type
	
	sender:
		send packet header type
		send packet data
	
	receiver:
		read packet header type
		read packet data, and take appropriate action

We were able to achieve the desired handling of the ship after making a few changes to the way acceleration was applied. Health was a simply a matter of adding and syncing a damage value for each ship. And the stars gravitational pull was achieved using the following calculation:
	
	float pullPercentage = (currentDistanceFromCenter/maxDistanceDistanceFromCenter)
	Vector2 pullDirection = centerPosition - currentPosition
	Vector2 pullVelocity = pullPercentage *  pullDirection * 0.8 * time

When the ships or projectiles fell under a certain distance from the star they would be destroyed.

After getting the desired functionality into the game and testing it over the network, we improved the artistic direction. The art assets used were from the following sources: [background](http://wallpapertube.com/space/star-background) and [ship](http://scratch.mit.edu/projects/Targethero/1027217).

At this point a working version of *Spacewar!* in XNA. The video below shows two ships battling it out in a networked session (currently supports up to 8 players).

<iframe src="http://player.vimeo.com/video/52236503?badge=0" width="500" height="281" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

The following video shows a single ship orbiting the center of the screen. Once the ship was maneuvered into the desired position it successfully orbited the star without user input.

<iframe src="http://player.vimeo.com/video/52237911?badge=0" width="500" height="281" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

The game jam was fun session for rapidly developing a networked game. It demonstrated the additional challenges that arise when trying to network games in a limited time frame. Overall we were pretty successful in replicating *Spacewar!*. There were only couple of known bugs at the end: a projectile destruction issue (fixed) and player spawn inconsistency between clients. This definitely reinforced my desire for improving the architecture (as I have time, I've been refactoring my code in a separate branch of my git repository). 