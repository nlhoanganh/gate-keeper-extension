(() => {
    let id = 0;
    let name = "name";
    let video = document.createElement("video");
    let button = document.createElement("button");
    let canvas = document.createElement("canvas");
    let buttonVerify = document.createElement("button");

    video.setAttribute("width", 500);
    video.setAttribute("height", 400);

    button.innerText = 'Capture';
    buttonVerify.innerText = 'Verify';


    document.body.append(video)
    document.body.append(button)
    document.body.append(buttonVerify)
    document.body.append(canvas)

    canvas.width = video.width;
    canvas.height = video.height;

    // video.setAttribute('style', 'display: none')
    // canvas.setAttribute('style', 'display: none')   
    button.setAttribute('id', 'capture')
    buttonVerify.setAttribute('id', 'verify')


    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
            name = prompt("Enter user name");
            id = prompt("Enter user ID");
            video.srcObject = stream;
            video.play();
        })
        .catch((err) => {
        console.error(`An error occurred: ${err}`);
    });

    button.addEventListener('click', async function capture() {
        const base64Faces = await recordFaces(50, 2000);
        sendTrainingRequest(id, name, base64Faces);
    })

    buttonVerify.addEventListener('click', async function capture() {
        const base64Faces = await recordFaces(15, 500);
        sendVerifyFacesRequest(base64Faces);
    })

    async function recordFaces(captureCount, totalTime) {
        const images = [];
        const interval = totalTime / captureCount;
        const context = canvas.getContext("2d");
    // Capture images at regular intervals
        for (let i = 0; i < captureCount; i++) {
            await new Promise(resolve => setTimeout(resolve, interval));
      
            // Draw video frame to canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Get image data
            const imageData = canvas.toDataURL().split('base64,')[1];
            images.push(imageData);
            
            console.log(`Captured image ${i + 1}/${captureCount}`);
        }

        console.log(images);
        return images;
    }

    function sendTrainingRequest(id, name, faces) {
        fetch("http://localhost:8080/face-regconition/train", {
            method: "POST",
            body: JSON.stringify({
                id: id,
                name: name,
                base64Images: faces
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => console.log(response))
        .then((json) => console.log(json));
    }

    async function sendVerifyFacesRequest(faces) {
        const response = await fetch("http://localhost:8080/face-regconition/verify", {
            method: "POST",
            body: JSON.stringify({
                base64Faces: faces
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        const name = await response.text();
        alert(name)
    }
})();