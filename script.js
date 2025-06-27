(() => {
    let video = document.createElement("video");
    let button = document.createElement("button");
    let canvas = document.createElement("canvas");

    video.setAttribute("width", 500);
    video.setAttribute("height", 400);

    button.innerText = 'Capture';
    button.addEventListener('click', () => {
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        console.log(canvas.toDataURL().split('base64,')[1]);
    })


    document.body.append(video)
    document.body.append(button)
    document.body.append(canvas)

    canvas.width = video.width;
    canvas.height = video.height;

    video.setAttribute('style', 'display: none')
    canvas.setAttribute('style', 'display: none')   


    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
        })
        .catch((err) => {
        console.error(`An error occurred: ${err}`);
        });
})();