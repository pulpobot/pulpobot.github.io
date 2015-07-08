---
layout: post
title: Lines and Collisions
category: project
---

![Line Collisions](/images/line-collision/line-collision.png)

This small line collision demo demonstrates the rendering and collisions of
lines. The anchors change color based on the mouse position (above or below
a line).

<!--more-->

While XNA provides line lists and other primitives, I chose to draw lines with
a simple one pixel texture applied to a rectangle.

{% highlight csharp %}
// initialize

texture = new Texture2D(GraphicsDevice, 1, 1, false,
    SurfaceFormat.Color);
Int32[] pixel = { 0xFFFFFF };
texture.SetData<Int32>(pixel, 0, texture.Width * texture.Height);

// update

Vector2 firstPosition = new Vector2(10, 10);
Vector2 SecondPosition = new Vector2(100, 100);

Vector2 diff = secondPosition - firstPosition;
Vector2 scale = new Vector2(1.0f, diff.Length() / size);
float angle = (float)(Math.Atan2(diff.Y, diff.X)) - MathHelper.PiOver2;

// render

spriteBatch.Draw(texture, firstPosition, new Rectangle(0, 0, 1, 1),
    Color.White, angle, Vector2.Zero, scale, SpriteEffects.None, 1.0f);
{% endhighlight %}

<iframe src="http://player.vimeo.com/video/31550505" width="600" height="330"
    frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen>
</iframe>
