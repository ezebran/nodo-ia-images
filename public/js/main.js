const onSubmit = (e) => {
  e.preventDefault();

  document.querySelector(".msg").textContent = "";
  document.querySelector("#image").src = "";

  const prompt = document.querySelector("#prompt").value;

  if (prompt === "") {
    alert("Ingrese una descripción");
    return;
  }

  generateImageRequest(prompt);
};

const generateImageRequest = async (prompt) => {
  try {
    showSpinner();
    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error("Ocurrio un error y la imagen no se pudo generar correctamente");
    }

    const data = await response.json();
    const imgUrl = data.data;

    document.querySelector("#image").src = imgUrl;
    removeSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
};

// Add spinner to screen
const showSpinner = () =>
  document.querySelector(".spinner").classList.add("show");

// Remove spinner from  screen
const removeSpinner = () =>
  document.querySelector(".spinner").classList.remove("show");

document.querySelector("#image-form").addEventListener("submit", onSubmit);
