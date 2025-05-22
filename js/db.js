const dbName = "CatDB";
const storeName = "cats";
let db;

function initDB() {
  const request = indexedDB.open(dbName, 1);

  request.onerror = function (event) {
    console.error("Błąd podczas otwierania IndexedDB", event);
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Połączono z IndexedDB");
    if (typeof loadCats === "function") {
      loadCats();
    }
  };

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      console.log("Utworzono obiekt store:", storeName);
    }
  };
}

function addCat(cat) {
  const transaction = db.transaction([storeName], "readwrite");
  const store = transaction.objectStore(storeName);
  store.add(cat);

  transaction.oncomplete = function () {
    console.log("Kot dodany do bazy:", cat);
    if (typeof loadCats === "function") {
      loadCats();
    }
  };

  transaction.onerror = function (event) {
    console.error("Błąd zapisu do IndexedDB", event);
  };
}

function getAllCats(callback) {
  const transaction = db.transaction([storeName], "readonly");
  const store = transaction.objectStore(storeName);
  const request = store.getAll();

  request.onsuccess = function (event) {
    callback(event.target.result);
  };

  request.onerror = function (event) {
    console.error("Błąd odczytu z IndexedDB", event);
  };
}

window.addEventListener("DOMContentLoaded", () => {
  initDB();
});
