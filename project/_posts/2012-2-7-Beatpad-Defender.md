---
layout: post
title: Beatpad Defender
category: project
---

![Beatpad Defender](/images/beatpad-defender/beatpad-defender.png)

Beatpad Defender is a musical tower defense game. The goal is to stop the
incoming creeps (enemies) from taking control of the beatpad. The player must
place guitar (projectile), drum (area of effect), and cymbal (splash) towers to
defend the beatpad controls. The placement and upgrade configuration of the
towers will create a unique musical experience on every play through.

Beatpad Defender was a collaborative project between, Timothy Scribner
(Producer), Griffen Fargo (Designer), Philip Holland (Designer), Steve Cannon
(Designer), Joshua Stowe (Artist), and myself (Programmer) for a game
production course.

<!--more-->

<ul id="toc"></ul>

## Producing a Game

This project was developed over the course of a semester in a game production
course. The goal of this project was to create:

> "a fully designed, documented and tested game prototype"

Our small team, consisting of a producer, two designers, an artist, and
a programmer worked hard to develop the prototype.  After brainstorming
a number of different ideas, our team agreed on a tower defense game involving
music.

![Sketches](/images/beatpad-defender/sketches.png)

During the conceptualization faze of development, our artist, Joshua Stowe,
quickly sketched up the basic components of our game. The above sketches show
the initial beatpad, towers, and enemies. When we completed the prototype, the
game closely resembled the initial concept.

## Tools Used

As a team we chose to use [Unity3D](http://unity3d.com/). Unity3D enabled us to
quickly prototype our tower defense game. The project was managed using
[Redmine](http://www.redmine.org/), and collaboration was done using a git
repository.

## Creating Maps

![Map](/images/beatpad-defender/map.png)

The tile maps (i.e., the beatpad playing fields) were created through a simple
text file system. With a list of keys, the designers could construct a new map
by creating a grid of keys to represent the map (normally 12 x 12 or less).

    0 = No Build
    1 = Build
    2 = Path

    0 0 0 0 0
    2 2 1 1 1
    0 2 2 2 1
    0 1 1 2 2

This system worked well for the scope of the project, but in the future,
I would consider creating a GUI editor to simplify the process.

## Tempo Bar

![Tempo Bar](/images/beatpad-defender/tempo-bar.png)

Since the game is musically focused, the tempo bar plays a critical role. The
tempo bar can be configured to the desired beat per minute (BPM); the default
BPM is 120. When the game starts, the tempo bar will scroll across the tile map
at the current BPM. Each column of tiles is considered the length of one beat.
While on a beat, the tempo bar will highlight the currently active column. The
towers can be configured to fire on half, quarter, eighth, and sixteenth notes.
In addition, towers can be set to play on a specific set of beats:

1. fire on every beat
2. fire every time the tempo bar is active over a tower
3. fire on every x number of beats

Setting the tower to play on certain notes or beats will change the rate of
fire. The following functionality demonstrate the process of moving the tempo
bar and activating towers.

    initialize:
        beats_per_second = beats_per_minute / seconds per minute (set to 60.0)
        time_per_note = (1.0 / beats_per_second) / notes per beat (set to 4.0)
        time_counter = 0.0

    update:
        time_counter += delta time
        if time_counter >= time_per_note:
            time_counter = 0
            play towers active on current note and beat
            if complete beat:
                iterate tempo bar by one

Configuring the tempo bar and towers will significantly alter the gameplay
experience. Increasing the BPM can take the game from a relaxed to urgent
state. As of now, the BPM is constant in each level. It might be interesting to
try creating a mode that changes the BPM at different point in a level or after
milestones (e.g., a power-up for killing 10 enemies).

## Towers

![Towers](/images/beatpad-defender/towers.png)

The prototype contains three towers: guitar, drum, and cymbal. Each of the
towers contains three upgrades, which alters the visual, the sound , and the
stats.

### Guitar

The guitar tower is a base tower that rotates and fires projectiles in a single
direction. To accomplish that behavior the tower does the following checks and
actions:

    if any enemies are in range:
        find and target enemy closest to exit
        fire projectile at enemy

### Drum

The drum tower is an area of effect tower, which fires projectiles in all
directions. To accomplish that behavior the tower does the following checks and
actions:


    if any enemies are in range:
        fire projectiles in all directions

### Cymbal

The cymbal tower is splash tower that fires projectiles and causes splash
damage over time after a projectile collision. To accomplish that behavior the
tower does the following checks and actions:

    if any enemies are in range:
        find and target enemy closest to exit
        fire projectile at enemy
        if projectile collides with enemy:
            spawn splash visual
            apply damage to enemies within radius of splash

## Enemies

![Enemies](/images/beatpad-defender/enemies.png)

All three enemies act in the same way; they move from tile to tile until they
die or reach the exit. Each enemy is given a set of unique values (i.e.,
health, armor, and speed).

### Behavior

The enemies follow a pre-defined path loaded in from the map text files. When
an enemies reaches a corner, I determine the new direction, and rotate the
enemy models accordingly.

![Moving Enemies](/images/beatpad-defender/moving-enemies.png)

Enemies move between the centers of the tiles. If an enemy is moving between
two tiles, then we know that the enemy is aligned with at least one of the two
axes (see the above diagram). Using a simple if-statement I can easily
determine the direction the enemy is facing:

    for all enemies:
        if enemy_position.x < tile_position.x:
            set enemy direction to west
        else if enemy_position.x > tile_position.x:
            set enemy direction to east
        else if enemy_position.z < tile_position.z:
            set enemy direction to north
        else if enemy_position.z > tile_position.z:
            set enemy direction to south

By doing that check, the enemies will be faced in the same direction as their
movement. If an enemy dies or reaches the exit, the model is removed, and the
player is rewarded or punished, respectively.

### Waves

Instead of endless stream of enemies for each level, the enemies are spawned in
waves. Each level contains a text file detailing the waves to spawn. The enemy
wave text file looks like:

    Path #, Enemy Type, Enemy Count, Enemy Spawn Time (seconds)

    1, Small, 3, 2.0
    2, Medium, 5, 3.0
    1, Large, 2, 10.0

After reading in the waves, they will be spawned in succession. To alleviate
pressure on the player, the waves are spawned with short pause in between. By
default the pause is set to two tempo bar passes; however, the pause can be
configured to the preferred length of time.

## Heads-Up Display

The heads-up display (HUD) displays the vital information to the player.
Information is displayed in the *LCD* screens at the top and side of the
screen, and in the sliders to the side of the screen.

### Top Display

![Towers](/images/beatpad-defender/hud-towers.png)

The top display contains information about the towers. When a level starts, the
display shows the different types of towers. Towers can be purchased from this
screen by dragging the mouse from a tower icon to an empty tile. If one of the
tower icons is clicked, then it will open the tower details.

![Tower Details](/images/beatpad-defender/hud-tower-details.png)

The tower details show the basic information about the tower: range, rate, and
damage (currently missing the cost of the tower). Like the initial tower
screen, towers can be purchased by dragging the mouse from the tower icon to an
empty tile. After purchasing a tower, the player can click the tower to show
it's details.

![Tower Upgrade Details](/images/beatpad-defender/hud-tower-upgrade-details.png)

The purchased tower's detail menu shows the current stats, the potential
upgrade stats, the cost to upgrade, and the payment for selling. Using the
on-screen buttons, the player can upgrade the towers up to three times as long
as they have enough money.

### Side Display

The side display shows the level, wealth, player damage, enemy damage, wave
progression, and the spawn delay (i.e., the time before spawning a new wave).

![Controls](/images/beatpad-defender/hud-controls.png)

We used several native beatpad controls and displays to present the player with
information. The volume is displayed as a bar graph in an LCD screen; the
currents status of the game is displayed through four sliders; and, the level
and wealth are displayed in another LCD screen.

## Improving the Prototype

As a prototype, this demo does a good job in demonstrating the core mechanic of
our game. If this were to transition into a full game, then there are a number
of needed improvements.

### Enemy AI

The enemies are currently limited to following a single path from point **A**
(entrance) to point **B** exit. The inclusion of dynamic pathing or the use of
multiple paths at the same time might improve the experience. A dynamic path
would involve giving the enemy a start and end point, and it would search for
the path of least resistance. The player would likely have to use the entire
map to defend against the oncoming enemies.

The enemies currently follow a single path, and spawns are delayed between
enemies. It would be more exciting if enemies spawned as mobs or swarms. To do
something like this, I would have to make sure that enemies only spawned in
unoccupied spaces. The enemies would also have to navigate around each other if
they moved at variable speeds.

### Visuals and Interactivity

All of the menus function in their current state; however, they could all use
a facelift to better convey the necessary information. Simple things like
graying out unavailable information or creating popover menus for towers would
make a world of difference to the user experience.

The initial concept included animated enemies with special entrance and exit
animations. As we expected, time would not allow for extensive animations. The
static models work perfectly fine for functionality, but they don't create the
immersion that animated models would. Animations could include attacking towers
and the beatpad.

### Sound

As a game centered around music, the use of sounds is the most critical
component of the game. For the prototype, we used a limited sound bank, that
included unique sounds for each tower and tower upgrade. This yielded twelve
sounds, I think it would be beneficial to give the player the opportunity to
configure tower sounds to their liking. It might even make sense to tie it into
a level progression or reward system. As a musically focus game, it makes
sense to allow for more sound configuration.

### And More

It might be interesting to consider a touch based version for tablets that
includes a functional beatpad. Maybe a networked multiplayer version involving
players on both defensive and offensive sides. There's never a shortage of
improvements or new ideas.

Building the prototype took a lot of work, and while hectic at times, it was
a pleasure to develop. Thanks to everyone on the team! (Timothy Scribner
(Producer), Griffen Fargo (Designer), Philip Holland (Designer), Steve Cannon
(Designer), and Joshua Stowe (Artist).

## Download

Feel free to download and play the game in the current state, but please note
that there are still a number of bugs.

* [Windows](http://cl.ly/IhAS)
* [Mac OSX](http://cl.ly/Ii7k)
