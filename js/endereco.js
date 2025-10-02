function salvarEndereco() {
  const rua = document.getElementById("rua").value.trim();
  const numero = document.getElementById("numero").value.trim();
  const bairro = document.getElementById("bairro").value.trim();
  const cidade = document.getElementById("cidade").value.trim();
  const cep = document.getElementById("cep").value.trim();
  const complemento = document.getElementById("complemento").value.trim();

  if (!rua || !numero || !bairro || !cidade || !cep) {
    document.getElementById("mensagem").textContent = "Preencha todos os campos obrigatórios!";
    document.getElementById("mensagem").style.color = "red";
    return;
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  fetch("http://127.0.0.1:8080/endereco/cadendereco", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    body: JSON.stringify({
      rua,
      numero,
      bairro,
      cidade,
      cep,
      complemento
    }),
    headers: headers
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro na resposta da API");
      }
      return response.json();
    })
    .then(data => {
      const endereco_id = data.id;
      localStorage.setItem('id_endereco', endereco_id);

      // Mostra modal estilizado
      mostrarModal();

      // Limpa mensagem (caso havia erro anterior)
      document.getElementById("mensagem").textContent = "";
    })
    .catch(error => {
      console.error('Erro!:', error);
      document.getElementById("mensagem").textContent = "Erro ao salvar o Endereço!";
      document.getElementById("mensagem").style.color = "red";
    });
}

// Função para exibir o modal
function mostrarModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block";

  document.getElementById("btn-cadastrar-outro").onclick = function () {
    modal.style.display = "none";
    document.getElementById("enderecoForm").reset();
  };

    document.getElementById("btn-avancar").onclick = function () {
    window.location.href = "tela_inicial.html"; // Altere para a URL correta
  };
}
