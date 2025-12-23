const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(`Failed to download image from ${url}`);

    img.src = url;
  });
}

// Function to download all images
function downloadImages() {
  // Reset UI
  output.innerHTML = "";
  errorDiv.innerHTML = "";
  loading.classList.remove("hidden");

  const promises = images.map((img) => downloadImage(img.url));

  Promise.all(promises)
    .then((imgs) => {
      loading.classList.add("hidden");
      imgs.forEach((img) => output.appendChild(img));
    })
    .catch((err) => {
      loading.classList.add("hidden");
      errorDiv.innerText = err;
    });
}

btn.addEventListener("click", downloadImages);
