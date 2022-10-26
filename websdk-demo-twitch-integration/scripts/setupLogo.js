function setupLogo(program) {
  const tempClient = program.client_id === "qKZUOVbYzftb8K3rszWfPSHPmMF1Ys0mfh3GDEn3";
  const src = tempClient
    ? "https://cf-blast-storage.livelikecdn.com/assets/6e4b0f28-4b66-4e8b-a861-408ba91ba458.png"
    : "https://websdk.livelikecdn.com/demo/assets/images/logo.svg";

  const logo = document.querySelector(".logo");
  const img = document.createElement('img');
  img.src = src;
  if(tempClient) {
    logo.style.padding = '0.5rem';
    img.style.height = '3rem';
  }
  logo.append(img);
}