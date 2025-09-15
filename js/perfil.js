function salvarPerfil() {
  const fotoUrl = document.getElementById("fotoUrl").value.trim();

  if (!fotoUrl) {
    document.getElementById("mensagem").textContent = "Informe a URL da foto!";
    document.getElementById("mensagem").style.color = "red";
    return;
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");

  fetch("http://127.0.0.1:8080/perfil/insert", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    body: JSON.stringify({
      fotoUrl: fotoUrl
    }),
    headers: headers
  })
  .then(response => {
    if (!response.ok) throw new Error("Erro na resposta da API");
    return response.json();
  })
  .then(data => {
    const perfil_id = data.id;
    console.log("Id do Perfil salvo: ", perfil_id);
    localStorage.setItem('id_perfil', perfil_id);

    document.getElementById("mensagem").textContent = "Perfil cadastrado com sucesso!";
    document.getElementById("mensagem").style.color = "green";

    document.getElementById("perfilForm").reset();
  })
  .catch(error => {
    console.error('Erro!:', error);
    document.getElementById("mensagem").textContent = "Erro ao salvar o Perfil!";
    document.getElementById("mensagem").style.color = "red";
  });
}
