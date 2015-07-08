---
layout: post
title: Tic-Tac-Toe
category: project
---

![No Move](/images/tic-tac-toe/no-move.png)
![Computer Win](/images/tic-tac-toe/computer-win.png)

During a data structures and algorithms course at Champlain College,
I implemented a Computer vs. Player Tic-Tac-Toe game using
a [minimax](http://en.wikipedia.org/wiki/Minimax) tree. It's implemented so
that the computer always counters a player's attempt to win.  A tie is the best
outcome the player can earn in the game's current state.

<!--more-->

<ul id="toc"></ul>

## Difficulty

The program is configured to maximize the computer's chances, while minimizing
the user's (i.e., a 1-ply lookahead). The AI could be weakened if the program
was configured to use more than 1-ply, which would create a more practical
game. Adjusting the difficulty would be more applicable to games like Chess or
Checkers, where there are significantly more moves than in Tic-Tac-Toe.

## Choosing a Move

The computer chooses a move by looking at the one that maximizes the chance of
winning. When the board is empty, there are technically nine different possible
moves, but only three of those are unique.

                  |   |
                ---------
                  |   |
                ---------
                  |   |

                   /|\
                  / | \
                 /  |  \
                /   |   \
               /    |    \
              /     |     \

              o-----------o
     x|   |   |   |   |   |   |   |
    --------- | --------- | ---------
      |   |   |   | x |   |   |   |x
    --------- | --------- | ---------
      |   |   |   |   |   |   |   |
              o-----------o

                 maximum

       (-1)        (1)         (-2)

The best move is chosen by looking at the possible responses to a move. By
using a simple calculation:

    for all unique player responses
        max = computer possible win states - player possible win states
    take lowest max as maximum for move

            |   |
          ---------
            | x |
          ---------
            |   |

             / \
            /   \

      |   |       |   |
    ---------   ---------
     o| x |       | x |
    ---------   ---------
      |   |      o|   |

    6 - 4 = 2   5 - 4 = 1

    maximum for move = 1

The computer chooses to play the center of the board for the first move,
because it provides the highest chance of winning (i.e., 1 > -1 and -2). If
there were two moves that had the same maximum, then the computer would have to
find the move that minimizes the opponents chance of winning.

## Improvements

The game could use the option to adjust difficulty, which can be accomplished
by tweaking the amount of lookahead used when determining the computers next
move. In addition, it would be nice to allow either the computer or the player
to make the initial move, thus providing some variety in the gameplay.

## Source

* [Download](/source/tic-tac-toe/tic-tac-toe.zip)
