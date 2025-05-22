document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("catForm");
  const catList = document.getElementById("catList");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const cat = {
      name: formData.get("name"),
      gender: formData.get("gender"),
      birthdate: formData.get("birthdate"),
      breed: formData.get("breed"),
    };

    if (!cat.name || !cat.gender || !cat.birthdate || !cat.breed) {
      alert("Wypełnij wszystkie pola!");
      return;
    }

    addCat(cat);
    form.reset();
  });
});

function loadCats() {
  const catList = document.getElementById("catList");
  catList.innerHTML = "";

  getAllCats((cats) => {
    if (cats.length === 0) {
      catList.innerHTML = "<li>Brak zapisanych kotów.</li>";
      return;
    }

    cats.forEach((cat) => {
      const li = document.createElement("li");
      li.textContent = `${cat.name} (${cat.gender}), ur. ${cat.birthdate}, rasa: ${cat.breed}`;
      catList.appendChild(li);
    });
  });
}

