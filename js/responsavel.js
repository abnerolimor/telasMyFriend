function salvarResponsavel() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const cpf = document.getElementById("cpf").value.trim();

  if (!nome || !email || !telefone || !cpf) {
    document.getElementById("mensagem").textContent = "Preencha todos os campos!";
    document.getElementById("mensagem").style.color = "red";
    return;
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");

  fetch("http://127.0.0.1:8080/responsavel/insert", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    body: JSON.stringify({
      nome: nome,
      email: email,
      telefone: telefone,
      cpf: cpf
    }),
    headers: headers
  })
  .then(response => {
    if (!response.ok) throw new Error("Erro na resposta da API");
    return response.json();
  })
  .then(data => {
    const responsavel_id = data.id;
    console.log("Id do Responsável salvo: ", responsavel_id);
    localStorage.setItem('id_responsavel', responsavel_id);

    document.getElementById("mensagem").textContent = "Responsável cadastrado com sucesso!";
    document.getElementById("mensagem").style.color = "green";

    document.getElementById("responsavelForm").reset();
  })
  .catch(error => {
    console.error('Erro!:', error);
    document.getElementById("mensagem").textContent = "Erro ao salvar o Responsável!";
    document.getElementById("mensagem").style.color = "red";
  });
}
