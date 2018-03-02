// 1. DEFINE YOUR VARIABLES
const sizePicker = document.querySelector('#sizePicker');
const colorPicker = document.getElementById('colorPicker');
const pixelCanvas = document.getElementById('pixel_canvas');

//2. ADD EVENT LISTENERS
//A. To create a function on 'Submit'
sizePicker.addEventListener('submit', function(e) {
    e.preventDefault();
    makeGrid();
});

// 3. GRID MAKER - Set the size of the cross stitch canvas
function makeGrid() {
    // DEFINE YOUR VARIABLES - user size input variables
    let gridHeight = document.getElementById('input_height').value;
    let gridWidth = document.getElementById('input_width').value;
    // removes the cells from last submit
    pixelCanvas.innerHTML = "";
    //DRAW GRID LOOP
    for (let i = 0; i < gridHeight; i++) {
        let row = pixelCanvas.insertRow(i);
        for (let j = 0; j < gridWidth; j++) {
            let cell = row.insertCell(j);

            //B. Event listener for coloring cells
            cell.addEventListener('click', function() {
                this.style.background = colorPicker.value;
            });
        }
    }
}
