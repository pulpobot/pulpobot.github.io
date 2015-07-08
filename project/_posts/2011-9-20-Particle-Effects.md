---
layout: post
title: Particle Effects
category: project
---

![Particle Effects](/images/particles/particle-effects.png)

This demo shows off several 2D particle effects. The effects include: fire,
rain, smoke, and trail.

<!--more-->

<ul id="toc"></ul>

## Effects

<iframe src="http://player.vimeo.com/video/31544516" width="600" height="330"
    frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen>
</iframe>

### Fire

The fire travels from the emitter origin upwards. As the article ages, the
particle shrinks and the color turns from orange to blue.

{% highlight csharp %}
sprite : Texture2D     // set to random preferred image
direction : Vector2    // set to random direction
position : Vector2     // set to random position around emitter origin
velocity : Vector2     // set to x = 0.1f, y = -4.0f
acceleration : Vector2 // set to zero
rotation : float       // set to zero
rotation_rate: float   // set to zero
initial_scale : float  // set to 0.6f
final_scale : float    // set to 0.05f
initial_color : float  // set to Orange * random between 0.0f and 1.0f
final_color : float    // set to Blue * random between 0.0f and 1.0f
age : int              // set to random between 0 and 10
fade_age : int         // set to preferred particle duration
{% endhighlight %}

### Rain

The rain travels towards the mouse position at different velocities based on
the size of the particle.

{% highlight csharp %}
// This is how the rotation and velocity of the particles are set

float rand = randomBetween(0.0f, 10.0f);

if (emmitter_origin.x < screen_width / 2)
{
    x = -((screen_width / 2) - emmitter_origin.x);
    y = -emmitter_origin.y;

    rotation = Math.Atan2(x, y);
    velocity = new Vector2(x * 0.005f * rand, -y * 0.005f * rand);
}
else
{
    x = emitter_origin.x - (screen_width / 2);
    y -emitter_origin.y;

    rotation = Math.Atan2(x, y);
    velocity = new Vector2(x * 0.005f * rand, -y * 0.005f * rand);
}
{% endhighlight %}

{% highlight csharp %}
sprite : Texture2D     // set to random preferred image
rand : float           // set to random between 0.0f and 1.0f
position : Vector2     // set to random position based on screen width and height
velocity : Vector2     // set to x = 0.1f, y = -4.0f
acceleration : Vector2 // set to zero
rotation : float       // set to align with mouse position
rotation_rate: float   // set to zero
initial_scale : float  // set to 2.0f * rand
final_scale : float    // set to initial_scale
initial_color : float  // set to White
final_color : float    // set to Black
age : int              // set to random between 0 and 10
fade_age : int         // set to preferred particle duration
{% endhighlight %}

### Smoke

The smoke travels according to the velocity and acceleration values, and the
colors changes according to it's position (orange glow near the bottom and gray
near the top).

{% highlight csharp %}
sprite : Texture2D     // set to preferred image
direction : Vector2    // set to random direction
position : Vector2     // set to random position around emitter origin
velocity : Vector2     // set to x = 0.1f * random, y = -0.02 * random - 3.4f
acceleration : Vector2 // set to x = 0.05f, y = 0.0f
rotation : float       // set to zero
rotation_rate: float   // set to -(pi/4) / 100.0f
initial_scale : float  // set to 1.0f
final_scale : float    // set to 0.0f
initial_color : float  // set to Orange
final_color : float    // set to White
age : int              // set to random between 0 and 10
fade_age : int         // set to preferred particle duration
{% endhighlight %}

### Trail

The trail follows the mouse position. Each particle shrinks and rotates as the
particles accelerate away from the spawn position.

{% highlight csharp %}
sprite : Texture2D     // set to preferred image
direction : Vector2    // set to random direction
position : Vector2     // set to mouse position
velocity : Vector2     // set to zero
acceleration : Vector2 // set to 0.1f * direction
rotation : float       // set to zero
rotation_rate: float   // set to -(pi/4)/100.0f
initial_scale : float  // set to 1.5f
final_scale : float    // set to 0.1f
age : int              // set to random between 0 and 10
fade_age : int         // set to preferred particle duration
{% endhighlight %}
