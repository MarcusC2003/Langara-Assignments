function manipulateImage() {
    let image = new Image();
    image.src = "parrot.png";

    image.onload = () => {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        let rgba = imageData.data;
        // yellow, light yellow, light blue, blue, dark blue, green yellow, white, dark green
        let palette = [[204, 145, 45], [243, 227, 82], [79, 140, 187], [3, 60, 113], [22, 29, 445], [163, 140, 28], [255, 255, 255], [20, 43, 14]];

        for (let row = 0; row < image.height; row++) {
            for (let col = 0; col < image.width; col++) {
                let pixel_i = row * image.width + col;
                let r = rgba[pixel_i * 4 + 0];
                let g = rgba[pixel_i * 4 + 1];
                let b = rgba[pixel_i * 4 + 2];
                let c1 = [r, g, b];
                let min = 0;
                for (let c = 1; c < 8; c++) {
                    if (distance(c1, palette[c]) < distance(c1, palette[min])) {
                        min = c;
                    }
                }
                rgba[pixel_i * 4 + 0] = palette[min][0];
                rgba[pixel_i * 4 + 1] = palette[min][1];
                rgba[pixel_i * 4 + 2] = palette[min][2];
            }
        }

        let canvasModified = document.createElement("canvas");
        let contextModified = canvasModified.getContext("2d");
        canvasModified.width = image.width;
        canvasModified.height = image.height;
        document.body.appendChild(canvasModified);
        contextModified.putImageData(imageData, 0, 0);
        let br = document.createElement("br");
        document.body.appendChild(br);
    }
}

function distance(c1, c2) {
    r1 = c1[0];
    g1 = c1[1];
    b1 = c1[2];
    r2 = c2[0];
    g2 = c2[1];
    b2 = c2[2];

    return Math.sqrt(Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2));
}

manipulateImage(); 