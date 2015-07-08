---
layout: post
title: The Super Awesome Snake Game
category: project
---

![Snake](/images/snake/snake.png)

*The Super Awesome Snake Game* is an adaption of the classic [snake
game](http://en.wikipedia.org/wiki/Snake_video_game). C++ and the Win32 API
were used to develop the game during a game architecture course at Champlain
College. Snake uses several systems that are commonly used in the architecture
of games, which include input, graphics, animations, events, messages, assets,
interface, entities, physics, state, and time.

Given that the project was developed in a short period of time, the systems
used could only be developed to a primitive state. While the initial systems
were primitive, this has sparked an interest in researching and expanding upon
these systems. In a later project, [*Light*](/project/2012/02/Light/), I furthered the development of
these systems and introduce new functionality.

<!--more-->

<ul id="toc"></ul>

## Gameplay

The goal of the game is to grow a snake by collecting food. Once the necessary
amount of food has been collected, the player will proceed to the next level.
The player has a limited number of retries before there health runs and the
game is reset. To increase the difficulty, the number of enemies spawned
increases in each level.

![Level](/images/snake/level.png)

If the player is in dire need of health, the screen will transition into an
alert state. The screen will become red, warning the player that any mistakes
could end the snake growing journey.

![Alert](/images/snake/alert.png)

If at any point the player runs out of lives or time, the player will be
presented with a game over screen listing the current score, the high score,
and the final level played.

![Game Over](/images/snake/game-over.png)

## Storing and Moving the Snake

The snake can be stored in a linked list. The list would consist of a head
node that references the head of the snake and linked nodes which reference
the body of the snake `x-x-x-x-x-o`. The snake data consists of position,
and a sprite (ASCII character) or a sprite animation (multiple ASCII characters).

    for node in snake list (starting from end of list):
        if node does not equal head:
            change snake position to node + 1 (moving closer to head)
    set head to new position

    o-x-x-x-x         to     x-x-x-x-x
            |       ------>  |       |
            x-x-x-x          o       x-x-x

## Asset Management

Assets consist of text files that define the ASCII characters to use for each
object in the game. The game pulls in data for the snake (head and body),
health, frame, enemies, and collectibles. Enemies contained a simple two frame
animation (easily extendible for longer animations). Each frame of the
animation would be stored in a text file with the specified ASCII characters to
use. For such a small project, an std map was sufficient for storing assets;
however, in a more intensive game where processing speed and memory
management really count, it would be ideal to augment a data structure to
fit the needs of the project.

## Saving

For this game, the only critical piece of information that needed persistence
between sessions is the high score. The high score was tracked and stored to
file on every session. In future projects, saving and serializing data is
essential to the game experience.

## Future

While I have no immediate plans to improve or change the project, it might be
interesting to create a level system that loads unique levels from text files.
A level system could introduce barriers, obstacles, doorways, and a number of
other objects that are more stimulating than the repetitive spawning of enemies.

    o       = Snake Head
    x       = Snake Body
    *       = Barriers
    ] and [ = Door
    F       = Food
    E       = Enemy

    +--------------+    +--------------+
    |* * * * *     |    |             *|
    |* * * * *     |    |  E  o F  * * |
    |* *        E  |    |     |   * * *|
    |    o-x-x     ]----[ x-x-x  * * * |
    |        |     |    |       * * * *|
    |* * F   x  * *|    |  * * * * * * |
    |* *        * *|    | * * * * * * *|
    +--------------+    +--------------+
