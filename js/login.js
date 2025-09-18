function salvarLogin() {
  const user = document.getElementById("user").value.trim();
  const passowrd = document.getElementById("passowrd").value.trim();

  if (!user || !passowrd) {
    document.getElementById("mensagem").textContent = "Preencha todos os campos!";
    document.getElementById("mensagem").style.color = "red";
    return;
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");

  fetch("http://127.0.0.1:8080/login/cadlogin", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    body: JSON.stringify({ user, passowrd }),
    headers: headers
  })
  .then(response => {
    if (!response.ok) throw new Error("Erro na resposta da API");
    return response.json();
  })
  .then(data => {
    const login_id = data.id;
    console.log("Id do Login salvo: ", login_id);
    localStorage.setItem('id_login', login_id);

    document.getElementById("mensagem").textContent = "Login cadastrado com sucesso!";
    document.getElementById("mensagem").style.color = "green";

    document.getElementById("loginForm").reset();
  })
  .catch(error => {
    console.error('Erro!:', error);
    document.getElementById("mensagem").textContent = "Erro ao salvar o Login!";
    document.getElementById("mensagem").style.color = "red";
  });
}
