---
layout: post
title: Heightmaps with Google Elevations
category: project
---

![Elevation](/images/elevations/elevation-9.png)

In the last few days I've been working on rewriting all of my core graphics and math code in a data-oriented design pattern. With the base system rewritten, I decided to implement terrain generation from Google Elevations API using REST.

<!--more-->

<ul id="toc"></ul>

## Setup

I'm currently using [Premake](http://industriousone.com/premake) -- a simple Lua based project configuration system -- to quickly generate Make files and Visual Studio project files. Adding a new project is as simple writing the source and adding Lua configuration file.

The current project depends on [GLFW](http://www.glfw.org/), [LibCurl](http://curl.haxx.se/libcurl/), and [TinyThread](http://tinythreadpp.bitsnbites.eu/). GLFW is used for context/window creation and input handling. LibCurl retrieves the JSON file based on the provided address. And TinyThread provides a minimal cross-platform threading library, which currently separates the demo into a loading and main thread. 

![Elevation](/images/elevations/elevation-7.png)

## Google Elevations

The [Google Elevations API](https://developers.google.com/maps/documentation/elevation/) provides a simple access point to elevation data across Earth. By feeding latitude and longitude, Google will return a list of data in the preferred format (XML or JSON).

### Requirements

As a non-business user, there is a 2,500 request/day or 25,000 locations/day limit, whichever comes first (from my experience, this seems to be a soft limit). Each request can consist of up to 512 locations. The URLs constructed for requests can have no more than 2048 characters. The URL must be encoded to accommodate for batched requests with a significant number of locations. In addition to the numerical requirements, the elevation data must be shown in conjunction with a Google map. If I continue working on this project, then I'll add support for displaying a Google map.

**Due to the restrictions on the data, I will NOT be distributing the data or source.** The sole intent of the project is to learn more about Google API access, REST, and graphics techniques.

### Encoding

Using the [Encoded Polyline Algorithm](https://developers.google.com/maps/documentation/utilities/polylinealgorithm) the URL can be condensed to fit up to 512 locations. On average I was able to fit 490 - 500 locations into a URL. The URLs consist of an encoded absolute starting position and then as many relative positions as desired.

	https://maps.googleapis.com/maps/api/elevation/json?sensor=false&locations=enc:rbwrI_ntv_@owH?owH?

The above URL has the encoded absolute position: `rbwrI_ntv_@` and an incremented relative position: `owH?`.

The project currently supports any rectangular heightmap up to 150 x 150, which equates to 22,500 locations (under the 25,000 request limit). The process for making the request consisted of taking the dimensions, encoding the starting position, and encoding the increment amount. If the number of requested locations overflows the max URL length, then I find the absolute position for each successive URL and feed in the remaining positions.

Since completing this, I also broke the encoding part of the code and posted it
[here](https://github.com/ChrisBrough/google_coordinate_encoder). The code can
be added to a project or compiled to library. An array of coordinates can be
encoded by passing it into the encode function with a corresponding array for
the encoded results.

## Loading

![Elevation](/images/elevations/elevation-5.png)

When the application is started, a default size grid without height data is generated. I've currently separated the application into two threads: main and loading. It could be further separated, but this is sufficient for now.

### Threading

While the main thread takes general input (e.g., camera movement) and renders the scene, the loading thread waits for a user request to retrieve data. As of now there are two options: load data from cache or request data from Google. I temporarily save a few of the previous requests locally for debugging and loading (that way if I run out of requests, I have a small amount of data to fall back on).

On every web request, the retrieved data is checked to ensure that the response is `OK` according to [Google's Elevation Responses](https://developers.google.com/maps/documentation/elevation/#ElevationResponses). Once the data has been confirmed it's merged into the main cache for the current set of requests (this ensures that the data for each request URL is valid before adding to the usable data). On bad requests, errors are handled, and invalid data is discarded. 

Once data has been retrieved from either the web or a local file into memory, it's parsed, and loaded into the heightmap.

### Parsing

For this project, I chose to retrieve data in JSON. To simplify the parsing, I ignore objects and array elements, and instead I search for the `"elevation"` string and the corresponding value. This could be improved by taking objects into account and only searching for one elevation per object. Or on the other end of the spectrum, the parser could be generalized to accommodate for retrieving data from different sources.

Once the parsed data is populated into a flat array, a flag is set, and the main thread can consume the new data. If the width and height of the heightmap changed, then the main thread resizes and the heights are copied into the vertex buffer object.

![Elevation](/images/elevations/elevation-2.png)

Since everything is currently using [POD](http://en.wikipedia.org/wiki/Plain_old_data_structure) structures, it would painless to write this out to a binary, and avoid parsing the file every time. I wouldn't be able to apply this to the Google Elevation data due to their restrictions, but perlin noise or other open data might be worthy contenders.

## Data-Oriented Design

As of recently, I've taken an interest in a data-oriented design, which has been discussed by [Noel Llopis](http://gamesfromwithin.com/data-oriented-design), [Niklas Frykholm](http://bitsquid.blogspot.com/2012/09/a-new-way-of-organizing-header-files.html), and many others. 

Mike Acton said it best - "Where there's one, there's more than one."

While the scope of the entire project and core code is fairly minimal, I've taken it upon to write this without the unnecessary and often scary stl abuse and abstraction code (no evil virtual functions). Anything that processes data, takes a contiguous array of POD data, which cuts out needless caches misses. This design makes processing data in parallel much simpler. In future projects I intend to continue using a data first methodology.
