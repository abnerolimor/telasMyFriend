// Carregar endereços assim que a página abrir
document.addEventListener("DOMContentLoaded", carregarEnderecos);

function carregarEnderecos() {
  fetch("http://127.0.0.1:8080/endereco/listaEndereco") // ajuste para sua rota real
    .then(response => {
      if (!response.ok) throw new Error("Erro ao buscar endereços");
      return response.json();
    })
    .then(data => {
      const select = document.getElementById("endereco");
      data.forEach(endereco => {
        const option = document.createElement("option");
        option.value = endereco.id; // backend deve retornar id
        option.textContent = endereco.rua + ", " + endereco.numero; // personalize
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Erro ao carregar endereços:", error);
    });
}

function salvarLoja() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const enderecoId = document.getElementById("endereco").value;

  if (!nome || !email || !telefone || !cpf || !enderecoId) {
    document.getElementById("mensagem").textContent = "Preencha todos os campos!";
    document.getElementById("mensagem").style.color = "red";
    return;
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  fetch("http://127.0.0.1:8080/loja/cadloja", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    body: JSON.stringify({
      nome: nome,
      email: email,
      telefone: telefone,
      cpf: cpf,
      enderecoDto: { id: enderecoId } // ✅ manda dentro do objeto
    }),
    headers: headers
  })
  .then(response => {
    if (!response.ok) throw new Error("Erro na resposta da API");
    return response.json();
  })
  .then(data => {
    const loja_id = data.id;
    console.log("Id da Loja salva: ", loja_id);

    localStorage.setItem("id_loja", loja_id);

    document.getElementById("mensagem").textContent = "Loja cadastrada com sucesso!";
    document.getElementById("mensagem").style.color = "green";

    document.getElementById("lojaForm").reset();
  })
  .catch(error => {
    console.error("Erro!:", error);
    document.getElementById("mensagem").textContent = "Erro ao salvar a Loja!";
    document.getElementById("mensagem").style.color = "red";
  });
}
