// Create a function for the image manipulation
function manipulateImage() {
    let image = new Image();
    image.src = "parrot.png";

    image.onload = () => {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        document.body.appendChild(canvas);
        context.drawImage(image, 0, 0);
        let br = document.createElement("br");
        document.body.appendChild(br);
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        let rgba = imageData.data;

        // Loop through the image data
        for (let row = 0; row < image.height; row++) {  // row is y
            for (let col = 0; col < image.width; col++) { // col is x
                let i = row * image.width + col;
                //make a checkered grid with each square being 60 by 60
                //if the square is even, then invert the colors
                if (((Math.floor(row / 60) % 2) == 0 && (Math.floor(col / 60) % 2) == 0) || ((Math.ceil(row / 60) % 2) == 0 && (Math.ceil(col / 60) % 2) == 0)) {
                    let r = rgba[i * 4 + 0];
                    let g = rgba[i * 4 + 1];
                    let b = rgba[i * 4 + 2];
                    let a = rgba[i * 4 + 3];
                    inverseFilter(r, g, b, i);
                }
            }
        }

        let canvasModified = document.createElement("canvas");
        let contextModified = canvasModified.getContext("2d");
        canvasModified.width = image.width;
        canvasModified.height = image.height;
        document.body.appendChild(canvasModified);
        contextModified.putImageData(imageData, 0, 0);
        document.body.appendChild(br);

        function inverseFilter(r, g, b, i) {
            rgba[i * 4 + 0] = 255 - r;
            rgba[i * 4 + 1] = 255 - g;
            rgba[i * 4 + 2] = 255 - b;
        }
    }
}

manipulateImage();
