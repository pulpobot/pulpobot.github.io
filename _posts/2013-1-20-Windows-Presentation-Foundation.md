---
layout: post
title: Windows Presentation Foundation
category: post
---

As a small project, I wanted to become familiar with Windows Presentation Foundation with C# (.NET). To do so, I created a small pace calculator application using Visual Studio 2012.

<!--more-->

![Application](/images/wpf/application.png)

Creating an application in WPF is quite simple. After creating the project, you're presented with an XAML markup file and a CS file (for a C# project). There is a clear separation of data and presentation. The applications are built using the Model View ViewModel (MVVM) design pattern.

The interface can be constructed directly through the XAML markup or by dragging and dropping items from the toolbox onto the application window.

![Drag Drop](/images/wpf/drag-drop.png)

The default UI items are attractive enough for generic applications and utilities, but if a custom UI is desired, then Microsoft allows users to build a custom interface through their Expression Blend tool.

The next time I work with WPF, I would like to try the data binding functionality. Along with that, I'd like to render to a 3D context (Direct3D and/or OpenGL) for creating some form of 3D editing tool.