const loginForm = document.querySelector("#login form");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const emailCheck = inputEmail.value;
    const passwordCheck = inputPassword.value

    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify({
            email: emailCheck,
            password: passwordCheck,
        })
    });
    if (reponse.ok) {
        const result = await reponse.json();
        const token = result.token
        window.localStorage.setItem("token", token);
        alert("Connexion réussie !")
        window.location.href = "index.html";
    } else {
        alert("Erreur dans l'email ou le mot de passe");
    }
});