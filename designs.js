
const DEFAULT_COLOR = '#8080ff'; // blue - default color for first color
const CLEAR_COLOR = '#ffffff'; // white -  default color for erasing

// Helper functions to set a color
function setDefaultValues() {
   $('#colorPicker').val(DEFAULT_COLOR);
}

/**
* @description Takes users inputs for height and width and creates table sith tr and td
* @constant {integer} number for height
* @constant {integer} number for width
* @returns grid
**/
function makeGrid() {   
   const height = $('#input_height').val();
   const width = $('#input_width').val();   
   const $table = $('#pixel_canvas');   
   for (let i = 0; i < height; i++) {
      const $row = $('<tr />');      
      // Create cells      
      for (let j = 0; j < width; j++) {
         // Add cell to current row         
         const $cell = '<td />';
         $row.append($cell);
      }      
      $table.append($row);
   }   
}

/** Function to clear the table after entering new values **/
function clearTable() {
   const $table = $('#pixel_canvas');
   $table.html('');
}

/**
 * Function paints the cell with chosen color
 * @param {$Element} $cell
 * @param {String} color
 **/
function paintCell($cell, color) {
   let colorPicker = $('#colorPicker').val();
   let chosenColor = color || colorPicker;
   $cell.css('background', chosenColor);
}

/**
* @description main function colects data from makeGrid functin, reade mouse movments on grid and paints accordingly
* @param {string} isDragging
* @returns grid with users chousen size, and paint he creates with mouse movments.
*/
(function runApplication() {
   // Main script   
   setDefaultValues();   
   $('#sizePicker').submit(function (event) {
      event.preventDefault();
      clearTable();
      makeGrid();
   });
   
   // Attach event listener on cell
   $('#pixel_canvas').on('click', 'td', function () {
      let $cell = $(this);
      paintCell($cell);   
   });
   
   // Draggable cell
   var isDragging = false;
   $('#pixel_canvas').on('mousedown', 'td', function () {
      isDragging = true;
   });
   
   $('#pixel_canvas').on('mousemove', 'td', function () {
      let $cell = $(this);
      if (isDragging) { 
         paintCell($cell);   
      }
   });
   /**
   * When mouse is up then we know dragging has ended
   * When mouse leaves the canvas. Set isDragging to false
   */
   $(document).on('mouseup mouseleave dragstart', function () {
      isDragging = false;
   });  
   
   //disable right click
   document.addEventListener('contextmenu', event => event.preventDefault());
})();

/** When user press button CLEAR - with animation it clears canvas **/
function eraseCanvas() {
   let x = 0;
   loop();   
   function loop() {
      const height = $('#input_height').val();
      const width = $('#input_width').val();
      let $cell = $('#pixel_canvas tr td:eq(' + x + ')')
      paintCell($cell, CLEAR_COLOR);   
      if ( x < (height * width)) {
         setTimeout(loop, 0);   
      }
      x ++; 
   }
}

//TODO: Add function for ereaser button

/**
* Use this line for checking errors
* throw new Error('hello');
*/
