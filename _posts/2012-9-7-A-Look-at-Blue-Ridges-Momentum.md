---
layout: post
title: A Look at Blue Ridge's Momentum
category: post
---

As a small assignment for a game networking course at Champlain College, we
were tasked to briefly write about a UDP or TCP networked game. The
Transmission Control Protocol (TCP) splits up data into manageable chunks and
guarantees ordered delivery. The User Datagram Protocol (UDP) is a simplified
protocol that does not guarantee delivery. The right protocol should be
determined by the game's specific needs. While it might seem reasonable to mix
and match protocols, it appears that trying to mix TCP and UDP can cause packet
loss ([source](http://goo.gl/8j1lT)).

<!--more-->

While I was searching for a game, I stumbled upon an older networked mobile
game from 2004 in the Game Developer magazine. The game is called *Momentum*,
and it was built by Blue Ridge for LG and Audiovox mobile phones.  Six players
network their phones together, and compete to find coins in a shared maze. The
game concept was inspired by old arcade games that quickly engage the user.

At the time, real time mobile play was an issue due to the high latency (ping
times peaking at almost two seconds). To mitigate the issue, the developers
created a "look-ahead mechanism", which would allow them to determine players
movement in advance. With the network limitations of older mobile phones, the
chosen protocol became important to the reliability of the game. Initially they
chose to use TCP, but this caused drawing and sound glitches while waiting for
the packet acknowledgement. To fix this, the developers switched to UDP, which
reduced packet overhead and provided a more consistent experience. Since they
still needed much of the functionality of TCP (i.e., automatic retries, packet
ordering), they had to recreate the functionality.

Over the course of the project, the developers dealt with a numerous other
networking, performance, and design hurdles. By the end, Blue Ridge successfully
created a game that was well received by the critics. Since the release of
*Momentum* in 2004, there's been an astonishing change to the mobile industry.

If you'd like to read more about *Momentum*, see Game Developer magazine's
October 2004 issue.
