function salvarEstoque() {
  const valorUnitario = parseFloat(document.getElementById("valorUnitario").value);
  const quantidade = parseInt(document.getElementById("quantidade").value);

  if (isNaN(valorUnitario) || isNaN(quantidade)) {
    document.getElementById("mensagem").textContent = "Preencha corretamente todos os campos!";
    document.getElementById("mensagem").style.color = "red";
    return;
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");

  fetch("http://127.0.0.1:8080/estoque/insert", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    body: JSON.stringify({ valorUnitario, quantidade }),
    headers: headers
  })
  .then(response => {
    if (!response.ok) throw new Error("Erro na resposta da API");
    return response.json();
  })
  .then(data => {
    const estoque_id = data.id;
    console.log("Id do Estoque salvo: ", estoque_id);
    localStorage.setItem('id_estoque', estoque_id);

    document.getElementById("mensagem").textContent = "Estoque cadastrado com sucesso!";
    document.getElementById("mensagem").style.color = "green";

    document.getElementById("estoqueForm").reset();
  })
  .catch(error => {
    console.error('Erro!:', error);
    document.getElementById("mensagem").textContent = "Erro ao salvar o Estoque!";
    document.getElementById("mensagem").style.color = "red";
  });
}
