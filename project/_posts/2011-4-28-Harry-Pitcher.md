---
layout: post
category: project
---

![Level](/images/harry-pitcher/level.png)

*Harry Pitcher* is a 2D platformer built in C++ using the [Allegro Game
Programming Library](http://alleg.sourceforge.net/). The gameplay consists of
navigating platforms, climbing ladders, shooting pitchforks, and dodging
enemies. While the design may be less appealing than other platformers, this
project was great mechanism for apply concepts that I learned during the game
architecture course at Champlain College.

The project was a collaberation between Rob Drury and myself. In addition to
the systems used in [snake game](/project/2011/03/Snake-Game), *Harry Pitcher*
made use of a menu system, localization, physics, level assets, sounds, and
save system.

<!--more-->

<ul id="toc"></ul>

## Menus

The menus consisted of a main menu, options menu, help menu, pause menu, and
end state menus. Navigation through the menus is done using a mouse; this was
accomplished by checking the coordinates and the click state of the mouse.

![Menu](/images/harry-pitcher/menu.png)

The options menu contains localization and a sound toggle. In the localization
menu, the user could choose english, french, or spanish. Localization for the
three languages were read from language specific files. The localized strings
were referenced using a simple hash function.

    english.txt

    Harry Pitcher --E
    Play (Continue)
    New Game

    french.txt

    ...

    spanish.txt

    ...

![Options](/images/harry-pitcher/options.png)

Unlike previous projects, it was important to include an instructional guide.
The graphic identifies the objects in the game and provides instructions for
playing. If *Harry Pitcher* was a more complex game a tutorial level or an
interactive help menu may be needed to aid in the understanding of the game.

![Help](/images/harry-pitcher/help.png)

Upon winning or loosing, the player is presented with screen stating the
result, and providing the option to restart or quit. These screens server their
purpose; however, they would be more useful if they presented the state of the
game (e.g., level #, time remaining, health remaining, enemies killed, score)
having won or lost.

![Win](/images/harry-pitcher/win-lose.png)

## Gameplay

The gameplay consists of two main elements: navigating platforms and avoiding
or destroying enemies.

Depending on how the levels are configured, they may contain pits. Upon falling
into a pit, the player will be engulfed in blood. The blood is represented by
a multi-frame animation triggered by a player entering a pit. If the player
prefers life over death, than the player can jump over the pit.

![Pit Animation](/images/harry-pitcher/pit-animation.png)
![Pit](/images/harry-pitcher/pit.png)

In addition to the pits, the player can navigate between platforms with
a ladder. As the player climbs, a ladder sound is played.

Throughout the game the player will encounter two types of enemies: chaser and
shooter. The chaser will follow the player when in range. The shooter will
remain locked on the right hand of the screen, and fire deadly projectiles at
the player.

![Enemy](/images/harry-pitcher/enemy.png)

To counter the enemies, the player has a limited quantity of pitch forks to
fire at enemies. The pitch forks are fired according to the last directional
movement and they will destroy the first enemy from the player to the end of
the currently visible screen (if one exists).

![Projectile](/images/harry-pitcher/projectile.png)

## Loading and Saving Data

The levels were loaded from a text file containing all of the associated data.
Levels consisted of the following information:

    Level # Level Type Level Data
    Ladder Positions
    Enemy Type Enemy Positions $

    ... Next Level ...

By separating the data from the source, it allowed me to regularly adjust the
level configuration without recompiling. In a later project,
[*Light*](/project/2011/11/Light/), I built a level editor that allowed for
in-game testing without exiting and reloading the entire game.

The save systems consists of saving the current level, the remaining
projectiles, and the remaining health at the end of each level or when quitting
the game. In future, I would like to allow for checkpoints and the ability to
save the state of the game at any time.
