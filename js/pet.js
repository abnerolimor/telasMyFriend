document.addEventListener("DOMContentLoaded", carregarResponsaveis);

function carregarResponsaveis() {
  fetch("http://127.0.0.1:8080/responsavel")
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar responsáveis");
      return response.json();
    })
    .then(data => {
      const select = document.getElementById("responsavel");
      data.forEach(resp => {
        const option = document.createElement("option");
        option.value = resp.id; // valor = id
        option.textContent = resp.nome; // exibe o nome
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Erro ao buscar responsáveis:", error);
      exibirMensagem("Erro ao carregar responsáveis!", "red");
    });
}

function salvarPet() {
  const nome = document.getElementById("nome").value.trim();
  const idade = document.getElementById("idade").value.trim();
  const raca = document.getElementById("raca").value.trim();
  const porte = document.getElementById("porte").value;
  const sexo = document.getElementById("sexo").value;
  const responsavelId = document.getElementById("responsavel").value;
  const cor = document.getElementById("cor").value.trim();

  if (!nome || !idade || !raca || !porte || !sexo || !responsavelId || !cor) {
    exibirMensagem("Preencha todos os campos!", "red");
    return;
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  fetch("http://127.0.0.1:8080/pet/cadpet", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      nome,
      idade,
      raca,
      porte,
      sexo,
      cor,
      responsavelDto: { id: Number(responsavelId) }
    }),
    headers
  })
    .then(response => {
      if (!response.ok) throw new Error("Erro na resposta da API");
      return response.json();
    })
    .then(data => {
      console.log("Pet salvo:", data);
      localStorage.setItem("id_pet", data.id);

      exibirMensagem("Pet cadastrado com sucesso!", "green");
      document.getElementById("petForm").reset();
    })
    .catch(error => {
      console.error("Erro!:", error);
      exibirMensagem("Erro ao salvar o Pet!", "red");
    });
}

function exibirMensagem(texto, cor) {
  const msg = document.getElementById("mensagem");
  msg.textContent = texto;
  msg.style.color = cor;
}
