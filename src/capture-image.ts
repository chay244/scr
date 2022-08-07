async function captureImage() {
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
        canvas.toBlob((blob) => {
            console.log(blob);
        });

        const img = canvas.toDataURL();
        console.log(img);
    } catch (err) {
        console.log(err);
    }
}

export { captureImage }