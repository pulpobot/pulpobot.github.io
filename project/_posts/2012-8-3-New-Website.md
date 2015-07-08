---
layout: post
title: New Website
category: project
---

![New Website](/images/new-website/new-website.png)

Last year (around August 2011), I wrote the initial version of my website. It
contained personal details and project details condensed into several 500 by
300 px pages. This was sufficient for the time, but I need more space for
extended projects posts and blog posts. This year, I decided to write a new
website that's not limited by scale and allows me to easily add new content.

There a lot of options when it comes to presenting information in a blog
format. *WordPress* and *Blogger* are often used, but I wanted full control of
the website. With those blogging engines, I could have created a theme or
grabbed an overused generic theme, but such tools obscure the data from the
user. Instead I chose to use [*Jekyll*](http://jekyllrb.com/). *Jekyll* is a static
blog generator, which allows content generation from [markdown]() files. Using
such a tool means that deploying new content to the website can be done with
a few short steps: 1) create markdown file, 2) run generator, 3) push results
to git repository.

<!--more-->

<ul id="toc"></ul>

## Previous Version of My Website

The previous version of my website presented the necessary personal information, as
well as limited overview of my projects. The home page was limited to contact
information and a link to my résumé. Due to the condensed form of the website,
a user would have to navigate away from the home page to get to content.

![Old Home](/images/new-website/old-home.png)

Beyond the home page there was a short about me page, a skill set page, and
a project page. The projects page contained a slider showing the different
projects. Each page could have about two tweets worth of information (about 300
characters). That's no where near enough to describe the details of a project.
This led me to rewriting my website.

![Old Projects](/images/new-website/old-projects.png)

## Using Jekyll to Generate Website

After familiarizing myself with several different static blog generators
([*Jekyll*](http://jekyllrb.com/), [*Hyde*](http://ringce.com/hyde),
[*Chyrp*](http://chyrp.net/)), I chose to use *Jekyll* because it meets all of my
requirements:

* must be able to write posts in markdown (no [cms](http://en.wikipedia.org/wiki/Content_management_system))
* must be able to filter posts into blog and project sections
* must be capable of pagination when listing posts
* must be able to completely customize the visual appearance
* must be cable of highlighting code
* must be stable/reliable

After confirming that *Jekyll* met all of my requirements, it was a matter of
configuring the folder structure, styling the html, writing posts, and
generating the website.

### Structure

Structuring a *Jekyll* website is a matter setting up the proper folder structure
and setting the proper tags. My website builds upon the following folder
structure:

    *
    ├── _layouts/
    │    ├── default.html
    │    ├── post.html
    │    -
    ├── _posts/
    │    ├── 2012-8-3-New-Website.md
    │    -
    ├── _site/
    │    ├── (generated website goes here)
    │    -
    ├── css/
    │    ├── style.css
    │    -
    ├── _config.yml
    ├── index.html
    -

The `default.html` contains the HTML frame for all pages using the default
layout. It contains the header, navigation, content, sidebar, and footer. The
content section of the layout is set to a content
[liquid](http://liquidmarkup.org/) tag, and *Jekyll* will replace the tag with
the generated content. The content is derived from markdown files, which
reference the `post.html` layout. For the purpose of my website, the two are
sufficient, but in a more extensive website *Jekyll* is capable of using
additional layouts.

### Styling

I chose a simple design consisting of a light foreground, a dark background,
and a blue accent for links. I used a few external resources to accentuate
certain details of the page:

* denim pattern from [Subtle Patterns](http://subtlepatterns.com/dark-denim/)
* title font from [The League of Moveable
  Type](http://www.theleagueofmoveabletype.com/ostrich-sans)
* header font from [The League of Moveable
  Type](http://www.theleagueofmoveabletype.com/league-gothic)

Since the majority of the website is styled in CSS, I wanted to create a fluid
layout that would scale to the browser size. Using [CSS Media
Queries](http://www.w3.org/TR/css3-mediaqueries/), I was able to create CSS
styles that were specific to a set of page sizes. I chose to use three size:
small, medium, and (you guessed it) large. The small size targets mobile
devices, while the medium and large sizes target tablets and PCs.

![Comparison](/images/new-website/comparison.png)

If you can, try resizing the page; you'll notice the layout snapping to the
correct scale according to the current width of the browser. Once the media
queries are in place, it's just a matter of reconfiguring the layout. In the
small stylesheet, the div styles are overwritten to force the divs to display
at full width in a single vertical column:

{% highlight css %}
div {
    width:auto !important;
    display:block !important;
    clear:both !important;
    float:none !important;
}
{% endhighlight %}

In addition to setting the page up with different stylesheets, I also enabled
the viewport meta tag to lock the scale on mobile screens:

{% highlight html %}
<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable-no" />
{% endhighlight %}

### Writing Posts

Adding new content to the website couldn't be simpler. I create a new markdown
file according to the naming convention `year-month-day-title.md` in either the
blog posts folder or the project posts folder. At which point I fill in the
[YAML Front Matter](http://yaml.org/), which consists of a layout, title, and
category tag:

    ---
    layout: post
    title: New Website
    category: post
    ---

    ...

If necessary I can use the `<!--more-->` tag to specify the excerpt length to
show when browsing through posts, and I can even add a `<ul id="toc"></ul>` tag
to insert a table of contents (generated from the page headers). At this point,
it's a matter of using [markdown](http://daringfireball.net/projects/markdown/)
to write the content of a post.

### Generating Website

Generating the website is probably the <s>hardest</s> easiest step. All I have
to do is execute `jekyll --server` from within root project directory. Once
the website is generated, I deploy it via a git post-update hook.
