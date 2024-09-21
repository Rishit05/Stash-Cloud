const uploadForm = document.getElementById("uploadForm");
const fileInput = document.getElementById("fileInput");
const uploadStatus = document.getElementById("uploadStatus");
const documentList = document.getElementById("documentList");
const searchInput = document.getElementById("searchInput");
const loginForm = document.getElementById("loginForm");
const loginStatus = document.getElementById("loginStatus");
const dmsSection = document.getElementById("dms-section");
const loginSection = document.getElementById("login-section");

let documents = [];
let loggedIn = false;

// Handle login form submission
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Mock login validation
    if (username === "admin" && password === "password") {
        loggedIn = true;
        loginStatus.textContent = "";
        loginSection.classList.add("hidden");
        dmsSection.classList.remove("hidden");
    } else {
        loginStatus.textContent = "Invalid credentials. Please try again.";
    }
});

// Handle form submission for uploading documents
uploadForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const file = fileInput.files[0];
    if (file) {
        documents.push(file.name);
        uploadStatus.textContent = `Uploaded: ${file.name}`;
        fileInput.value = "";
        updateDocumentList();
    } else {
        uploadStatus.textContent = "No file selected.";
    }
});

// Display document list with delete option
function updateDocumentList() {
    documentList.innerHTML = "";
    documents.forEach((doc, index) => {
        const li = document.createElement("li");
        li.textContent = doc;

        // Create delete button for each document
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = function () {
            deleteDocument(index);
        };

        li.appendChild(deleteButton);
        documentList.appendChild(li);
    });
}

// Filter documents based on search input
function searchDocuments() {
    const query = searchInput.value.toLowerCase();
    const filteredDocs = documents.filter((doc) =>
        doc.toLowerCase().includes(query)
    );
    documentList.innerHTML = "";
    filteredDocs.forEach((doc, index) => {
        const li = document.createElement("li");
        li.textContent = doc;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = function () {
            deleteDocument(index);
        };

        li.appendChild(deleteButton);
        documentList.appendChild(li);
    });
}

// Delete a document
function deleteDocument(index) {
    documents.splice(index, 1);
    updateDocumentList();
}
