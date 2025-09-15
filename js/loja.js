function salvarLoja() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const endereco = document.getElementById("endereco").value.trim();

  if (!nome || !email || !telefone || !cpf || !endereco) {
    document.getElementById("mensagem").textContent = "Preencha todos os campos!";
    document.getElementById("mensagem").style.color = "red";
    return;
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");

  fetch("http://127.0.0.1:8080/loja/insert", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    body: JSON.stringify({ nome, email, telefone, cpf, endereco }),
    headers: headers
  })
  .then(response => {
    if (!response.ok) throw new Error("Erro na resposta da API");
    return response.json();
  })
  .then(data => {
    const loja_id = data.id;
    console.log("Id da Loja salva: ", loja_id);
    localStorage.setItem('id_loja', loja_id);

    document.getElementById("mensagem").textContent = "Loja cadastrada com sucesso!";
    document.getElementById("mensagem").style.color = "green";

    document.getElementById("lojaForm").reset();
  })
  .catch(error => {
    console.error('Erro!:', error);
    document.getElementById("mensagem").textContent = "Erro ao salvar a Loja!";
    document.getElementById("mensagem").style.color = "red";
  });
}
