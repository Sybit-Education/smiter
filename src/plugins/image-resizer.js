/**
 * Function scaling an image from a file input to specified dimensions
 * If the specified dimensions are not proportional to image dimensions the output image will be cropped at center
 *
 * @param imageContent base64 encoded content of file
 * @param dimensions {{width: number, height: number}} Dimenstions of the output image
 * @returns {Promise<Blob | null>} Promise resolving to a scale image or a null if provided an invalid file type
 */
export default async function scaleImage(imageContent, dimensions) {
    // ensure the file is an image
    if (!imageContent.match(/image.*/)) {
        throw "No Image content!"
    }

    let data = ""
    await loadImage(imageContent).then(async image => {
        let canvas = document.createElement("canvas")
        canvas.width = image.width
        canvas.height = image.height
        const context = canvas.getContext("2d", {alpha: true})
        
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        
        while (canvas.width * 0.5 > dimensions.width) {
            canvas = resize(canvas, canvas.width / 2, canvas.height / 2)
        }

        if (image.height <= image.width) {
            const scaleProportions = dimensions.height / image.height
            const scaledWidth = scaleProportions * image.width
            canvas = resize(canvas, scaledWidth, dimensions.height)
        } else {
            const scaleProportions = dimensions.width / image.width
            const scaledHeight = scaleProportions * image.height
            canvas = resize(canvas, dimensions.width, scaledHeight)
        }
        data = canvas.toDataURL('image/png')
    })
    return data
}

/**
 * Resizes the canvas and its contents
 * To be used in while-loop of scaleImage(imageContent, dimensions)
 * From: https://morioh.com/a/872a8ce21d61/simple-image-resizing-in-the-browser
 * 
 * @param img the image to be drawn to the canvas
 * @param width canvas width
 * @param height canvas height
 * @returns {HTMLCanvasElement} resized canvas
 */
function resize(img, width, height) {
    const canvas = newCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
    return canvas;
}

/**
 * Creates a new canvas with the given height and width
 * To be used in resize(img, width, height)
 * From: https://morioh.com/a/872a8ce21d61/simple-image-resizing-in-the-browser
 * 
 * @param width
 * @param height
 * @returns {HTMLCanvasElement}
 */
function newCanvas(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

/**
 * Loads the image
 * References:
 * https://stackoverflow.com/questions/47622709/how-to-wait-for-the-multiple-images-to-load-in-the-canvas-and-convert-to-base64
 * https://stackoverflow.com/questions/2342132/waiting-for-image-to-load-in-javascript
 * https://stackoverflow.com/questions/37854355/wait-for-image-loading-to-complete-in-javascript
 *
 * @param src image source that is being loaded
 * @returns {Promise<Image>} loaded image
 */
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    })
}

