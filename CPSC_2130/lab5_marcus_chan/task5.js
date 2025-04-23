function manipulateImage() {
    let image = new Image();
    image.src = "parrot.png";
    //change size
    let shrinkRatio = 4;

    image.onload = () => {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        canvas.width = image.width / shrinkRatio;
        canvas.height = image.height / shrinkRatio;
        document.body.append(canvas);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

    };
}

manipulateImage();

