# Classic Paint

A simple implementation of the classic Microsoft Paint program.

This is something I've been wanting to try for a while and I was pleased with how quickly it came together.

**[Try it here!](https://bl.ocks.org/OwenKLenz/raw/8312321e79c957cbbd001bb8d1b30faa/)**

### How It Works
- `mousemove` events fire when the user clicks and drags the mouse on the canvas.
- Each event places an absolutely positioned pixel (`div` element) of the selected color and brush size under the mouse pointer.
- `click` event listeners are used to react to brush size and color selections
- When submitting a hex code color, logic in the `submit` event listener ensures that a valid hex code was entered and warns the user if not.

### Features
- 4 default colors to choose from
- 3 different brush sizes
- Enter a 3 digit hex code (000 to fff) for many more color options (4096 to be exact)
- A reset button for when your artistic skills fail you

### Future Plans
- The ability to save your drawings
- Adding a "paint can" option to fill regions in
- "real" line functionality that isn't just a series of dots with a frequency limited by the ability of my browser to process `mousemove` events
