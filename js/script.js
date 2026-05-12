const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snapBtn = document.getElementById("snap-btn");
const photoCountDisplay = document.getElementById("photo-count");
const miniPreview = document.getElementById("mini-preview");
const switchBtn = document.getElementById("switch-camera");

let photoArray = [];

// start camera
async function initCamera(enviromnment) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: enviromnment, // use back camera
        width: { ideal: 1920 },
        height: { ideal: 1080 },
      },
      audio: false,
    });
    video.srcObject = stream;
  } catch (err) {
    console.error("Camera toegang geweigerd:", err);
    alert("Geef toestemming voor de camera om deze app te gebruiken.");
  }
}

// take photos
function takePhoto() {
  const context = canvas.getContext("2d");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imgData = canvas.toDataURL("image/jpeg", 0.7);

  photoArray.push(imgData);

  updateUI();

  video.style.opacity = "0.5";
  setTimeout(() => (video.style.opacity = "1"), 100);
}

// 4. UI bijwerken (Teller en Mini-preview)
function updateUI() {
  // Update teller
  photoCountDisplay.innerText = `${photoArray.length} foto's`;

  // Laat de laatste foto zien in het mini-preview vakje
  if (photoArray.length > 0) {
    const lastPhoto = photoArray[photoArray.length - 1];
    miniPreview.innerHTML = `<img src="${lastPhoto}" style="width:100%; height:100%; object-fit:cover; border-radius:4px;">`;
  }

  // Log de array naar de console (handig voor debuggen in VS Code)
  console.log("Totaal aantal foto's in geheugen:", photoArray.length);
}

snapBtn.addEventListener("click", takePhoto);
switchBtn.addEventListener("click", initCamera("user"));

initCamera("environment");
