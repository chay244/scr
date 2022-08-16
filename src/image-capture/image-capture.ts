import { SUPPORTED_IMAGE_FORMATS } from "../modals/formats";

function imageCapture(format: 'Blob'): Promise<Blob>;
function imageCapture(format: 'Base64'): Promise<string>;
async function imageCapture(format: SUPPORTED_IMAGE_FORMATS = 'Blob') {
    try {

        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: { mediaSource: 'screen' } as unknown as boolean,
        });
        const track = stream.getVideoTracks()[0];

        const image = new ImageCapture(track);

        const bitmap = await image.grabFrame();

        track.stop();

        const canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const context = canvas.getContext('2d');
        context?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

        if (format === 'Blob') {
            // canvas.getContext("bitmaprenderer").transferFromImageBitmap(bitmap);
            return await new Promise((res) => canvas.toBlob(res));
        }

        if (format === 'Base64') {
            return canvas.toDataURL();
        }
    } catch (err) {
        console.log(err);
    }
}

export { imageCapture }
