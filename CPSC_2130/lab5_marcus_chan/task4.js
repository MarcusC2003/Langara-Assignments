function manipulateImage() {
    let image = new Image();
    image.src = "parrot.png";

    // Change size
    let shrinkRatio = 4;

    image.onload = () => {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        // document.body.appendChild(canvas);


        let canvasModified = document.createElement("canvas");
        let contextModified = canvasModified.getContext("2d");
        canvasModified.width = Math.floor(image.width / shrinkRatio);
        canvasModified.height = Math.floor(image.height / shrinkRatio);
        document.body.appendChild(canvasModified);

        let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        let rgba = imageData.data;
        let smallImageData = new ImageData(canvasModified.width, canvasModified.height);
        let smallRgba = smallImageData.data;

        //checking to see which pixels it takes
        // for (let row = 0; row < canvas.height; row += shrinkRatio) {
        //     for (let col = 0; col < canvas.width; col += shrinkRatio) {
        //         let i = row * image.width + col;
        //         rgba[i * 4 + 0] = 255;
        //         rgba[i * 4 + 1] = 0;
        //         rgba[i * 4 + 2] = 0;
        //         rgba[i * 4 + 3] = 0;
        //         smallCount++;
        //     }
        // }
        let smallCount = 0;
        for (let row = 0; row < canvas.height; row += shrinkRatio) {
            for (let col = 0; col < canvas.width; col += shrinkRatio) {
                let i = row * image.width + col;
                smallRgba[smallCount * 4 + 0] = rgba[i * 4 + 0];
                smallRgba[smallCount * 4 + 1] = rgba[i * 4 + 1];
                smallRgba[smallCount * 4 + 2] = rgba[i * 4 + 2];
                smallRgba[smallCount * 4 + 3] = rgba[i * 4 + 3];
                smallCount++;
            }
        }
        // context.putImageData(imageData, 0, 0);
        contextModified.putImageData(smallImageData, 0, 0);
    };
}

manipulateImage();
