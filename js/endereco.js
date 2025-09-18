function salvarEndereco() {
  const rua = document.getElementById("rua").value.trim();
  const numero = document.getElementById("numero").value.trim();
  const bairro = document.getElementById("bairro").value.trim();
  const cep = document.getElementById("cep").value.trim();
  const complemento = document.getElementById("complemento").value.trim();

  if (!rua || !numero || !bairro || !cep) {
    document.getElementById("mensagem").textContent = "Preencha todos os campos obrigatórios!";
    document.getElementById("mensagem").style.color = "red";
    return;
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");

  fetch("http://127.0.0.1:8080/endereco/cadendereco", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    body: JSON.stringify({ rua, numero, bairro, cep, complemento }),
    headers: headers
  })
  .then(response => {
    if (!response.ok) throw new Error("Erro na resposta da API");
    return response.json();
  })
  .then(data => {
    const endereco_id = data.id;
    console.log("Id do Endereço salvo: ", endereco_id);
    localStorage.setItem('id_endereco', endereco_id);

    document.getElementById("mensagem").textContent = "Endereço cadastrado com sucesso!";
    document.getElementById("mensagem").style.color = "green";

    document.getElementById("enderecoForm").reset();
  })
  .catch(error => {
    console.error('Erro!:', error);
    document.getElementById("mensagem").textContent = "Erro ao salvar o Endereço!";
    document.getElementById("mensagem").style.color = "red";
  });
}
