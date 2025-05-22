document.addEventListener("DOMContentLoaded", () => {
  const catImage = document.getElementById("catImage");
  const loadCatBtn = document.getElementById("loadCatBtn");

  async function loadRandomCat() {
    try {
      const response = await fetch("https://api.thecatapi.com/v1/images/search");
      const data = await response.json();
      const imageUrl = data[0].url;
      catImage.src = imageUrl;
    } catch (error) {
      console.error("Błąd podczas pobierania zdjęcia kota:", error);
      catImage.alt = "Nie udało się załadować zdjęcia kota. Sprawdź swoje połączenie z internetem.";
    }
  }

  loadCatBtn.addEventListener("click", loadRandomCat);

  loadRandomCat();
});

