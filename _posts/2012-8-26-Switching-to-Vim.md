---
layout: post
title: Switching to Vim
category: post
---

![Vim](/images/vim/vim.png)

Since the start of 2012 I've committed myself to using Vim in my daily
workflow. I've been familiar with Vim and the command line (bash) for several
years, but it wasn't until I a had a course in Linux programming that I became
completely fascinated by the power of these tools. While IDE's (e.g., Visual
Studio, Xcode, Eclipse) and text editors (e.g., TextMate, BBEdit, Notepad++)
are sufficient for their purpose, I wanted to become proficient in something
that would significantly heighten my productivity.

After becoming familiar with the base set of controls, I knew that Vim was for
me. The possible Vim configurations are endless... I'm continually configuring
[my setup](https://github.com/ChrisBrough/dotfiles/) to suit my needs. I am by
no means an expert of Vim, but in the past year I've become comfortable using
Vim for anything from web (JavaScript, HTML, CSS) to game development (C, C#,
C++).

<!--more-->

<ul id="toc"></ul>

Vim's three modes (normal, insert, visual) + navigational keys (h, j, k, l)
make editing files so much more efficient than the standard text editor (i.e.,
keyboard & mouse). While it took some time breaking my habbit of grabbing the
mouse, it was well worth it.

## Software

While you can use Vim from the command line, I've chosen to use the standalone
versions: [MacVim](http://code.google.com/p/macvim/) and
[gVim](http://www.vim.org/download.php) depending on the current OS I'm on
(MacOS, Windows, or Linux); the majority of my configurations work without
fault on all three OS's and on any recent version of Vim (7.2+). If I'm on
Windows, I also install [Git CLI](http://msysgit.github.com/) for basic bash
commands and of course, git (you can also use
[msysGit](http://msysgit.github.com/) or [Cygwin](http://www.cygwin.com/) as
more comprehensive alternatives).

When I can't use Vim, and I'm using Visual Studio or MonoDevelop I make use of
Vim plugins. For Visual Studio, I use the
[VsVim](http://visualstudiogallery.msdn.microsoft.com/59ca71b3-a4a3-46ca-8fe1-0e90e3f79329)
extension which emulates many of the important controls that are found in Vim.
As for MonoDevelop, it has a built Vim plugin that enables the base modes and
controls from Vim.

## Configuration

Please see my [README](https://github.com/ChrisBrough/dotfiles) file and/or my
[vimrc](https://github.com/ChrisBrough/dotfiles/blob/master/vimrc) for more
details on the specific configurations I used to configure Vim to my liking.

## Plugins

### Management

If you intend on installing plugins, then I highly recommend using
either [Pathogen](https://github.com/tpope/vim-pathogen) or
[Vundle](https://github.com/tpope) to manage installed plugins. I've used
both of these without an issue, but I have recently switched to Vundle for it's
ease of installing plugins (i.e., `:BundleInstall <name of plugin>`). While
using pathogen, I installed all of my plugins as [git
submodules](http://git-scm.com/book/en/Git-Tools-Submodules), which allowed me
to easily mange and update plugins with ease.

### Version Control

I primarily use git to version my source code, so I figured it would be nice to
have git integration in Vim. I've adopted
[Fugitive](https://github.com/tpope/vim-fugitive) and
[gitv](https://github.com/gregsexton/gitv) into my git workflow (by the way,
[this](http://nvie.com/posts/a-successful-git-branching-model/) is a fantastic
git branching model). Fugitive compliments the command line interface in just
the right ways. If you'd like to know more, see
[this](http://vimcasts.org/episodes/fugitive-vim---a-complement-to-command-line-git/)
Fugitive screencast series. In addition to Fugitive, I began using gitv (a gitk
equivalent for Vim) for viewing the repository log, branches, etc. While these
plugins are not necessary, they make git that much more convenient.

### File Navigation

Among the hanful of plugins that I use on a daily basis,
[CtrlP](https://github.com/kien/ctrlp.vim) is on the forefront. CtrlP allows me
to quickly navigate between files, with only a few keystrokes. I've configured
CtrlP to open when I press leader + t (`,t`), and then all I have to do is type
a few characters of a file name to open it. For me, this a MUST have plugin!

### Other

Those are just a small subset of the plugins that I use. The complete list of
plugins that I'm currently using are listed at the top of my
[vimrc](https://github.com/ChrisBrough/dotfiles/blob/master/vimrc) file. Some
of my other favorites include:
[Powerline](https://github.com/Lokaltog/vim-powerline),
[AutoComplPop](https://bitbucket.org/ns9tks/vim-autocomplpop/), and
[SnipMate](https://github.com/msanders/snipmate.vim). Be warned, if you venture
into the world of Vim plugins, you may never find your way out!

## Tools of the Trade

As a programmer, the editor is probably the most important tool that I use.
Since I'm exposed to it for hours upon hours every day, it only seemed
appropriate to configure it to my liking. Until something better (maybe [Light
Table](http://www.kickstarter.com/projects/ibdknox/light-table)) comes along,
I think Vim will be my daily driver for a while.

## Useful Links

* [vim.org](http://www.vim.org/) - documentation, wiki, plugins, downloads
* [Vim Casts](http://vimcasts.org/) - vim screencasts
* [vim-scripts](https://github.com/vim-scripts) - github repository of vim scripts

## Credits

Here are few sources that I used when configuring my setup.

* [Ryan Bates](https://github.com/ryanb/dotfiles) - folder structure and rake
  install file
* [Steve Losh](https://github.com/sjl/dotfiles) - general configurations
* [Yan Pritzker](https://github.com/skwp/dotfiles) - general configurations
