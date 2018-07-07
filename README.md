# Memory Game Project

## Table of Contents
* [Instructions](#instructions)
* [Dependencies](#dependencies)
* [Contributing](#contributing)
* [License](#license)



## Instructions

Memory Game is the traditional game where you match 2 cards at a time.

1. This version has 2 modes -- the defalut Classic Mode & Image Reveal mode.  To access the Image reveal mode, where a background image is revealed at the end of the game, select the picture icon in the icon bar. It will turn red when it is in Reveal Mode. There are approximately 12 background images of which one is randomly chosen for each game.

2. The player also has the option of choosing from 4 different card sets from the Mix drop down menu.

3. To reload the game, press the reset button.

4. I put the timer at the bottom to make it less distracting. Stop the timer by clicking on it if you don't want it to run.

5. I implemented functionality so that more that 2 cards at once are not selectable.

6. Star rating decreases with move increments (from 5 to 1).

7. TODO : refine responsive background images using Window.matchMedia in JavaScript. This still needs some attention as I'm not satisfied with the result. Used Grunt to generate the files. 

## Dependencies
The game requires access to both Google Fonts & FontAwesome. Links to these fonts are referenced in the index.html file.
       ```
       https://use.fontawesome.com/releases/v5.1.0/css/all.css
	   https://fonts.googleapis.com/css?family=Coda
       https://fonts.googleapis.com/css?family=Montserrat&effect=neon
       https://fonts.googleapis.com/css?family=Fjalla+One
       ```


## Contributing

Ideas regarding JavaScript media queries were found in Stack Overflow & W3 Schools.

Background image photos taken by Abbie & using Uzu & Enlight Photofox for effects. Background hand drawn to vector to png by Abbie. Ceramic monster models used in photos created by CNewlin.com.

## License

MIT License

Copyright (c) [2018] [Abbie Weisenbloom]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.