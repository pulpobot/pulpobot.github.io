---
layout: post
title: Tools and TCP Networking
category: post
---

![Bezier Curve Server Client](/images/bezier-curve/bezier-server-client.png)

On and off for the past several weeks I've begun implementing different functionality to allow me to stream changes over the network from an editor window to the viewer window. Ideally, when I complete this I'll be able to add, remove, and modify vertices in models in the editor and stream the changes to the viewer.

<!--more-->

<ul id="toc"></ul>

## Networking

The goal of the project was to begin developing a networked toolset that streamed changes from different editors to the main scene view. I used my bezier curve implementation for the initial demonstration to generate a curve and then stream control point changes to the viewer window over TCP. In this demo, I needed to guarantee that data would arrive reliably and in order. If I needed more configuration options for different data, then I'd probably write a layer over UDP to handle different levels of reliability.

### NodeJS

When I initially started, I was going to develop a small editor in NodeJS using [Node Webkit](https://github.com/rogerwang/node-webkit) and WebGL that communicates with my C++ viewer application. With a bit of setup, I was able to get the a NodeJS  script and C++ application communicating fairly quickly; however, due to the lack of time, I decided to stick with a C++ to C++ application. If I had a more robust JavaScript backend in place, then this might be a good way of rapidly creating cross platform tools. Although, if cross platform is unnecessary, then I might look at C# (.NET) and WPF.

### C Sockets

I implemented the connection layer using Winsock and Berkley sockets for cross platform development. The basic process of setting up the sockets is:

Server:
	startup > create > bind > listen > close > shutdown

Client:
	startup > create > connect > close > shutdown

For the demo, I set the sockets to nob-blocking, allowing me to receive data without stalling the application. If I extend the project further, I'll probably use a blocking socket with a separate thread for streaming changes.

## Ray Picking

I'm currently in the process of getting an implementation of ray picking in place for mouse clicking in 3D space. The the following procedure:

	screen space > normalized screen space (-1 to 1) > object space

Applying the inverse view projection matrix to the normalized screen point should produce the correct point in 3D space, but I haven't received the expected results. I plan continue working on this, and updating this with more details upon completion.
