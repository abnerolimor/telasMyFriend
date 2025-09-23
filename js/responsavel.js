let listaEnderecos = []; // vai guardar todos os endereços

// Carrega os endereços ao iniciar a página
window.onload = () => {
  fetch("http://127.0.0.1:8080/endereco/listaEndereco")
    .then(res => {
      if (!res.ok) throw new Error("Erro ao buscar endereços");
      return res.json();
    })
    .then(data => {
      listaEnderecos = data; // salva os endereços no array
      const enderecoSelect = document.getElementById("endereco");
      enderecoSelect.innerHTML = '<option value="">Selecione um endereço</option>';

      data.forEach(endereco => {
        const option = document.createElement("option");
        option.value = endereco.id;
        option.textContent = `${endereco.rua}, ${endereco.numero} - ${endereco.bairro}`;
        enderecoSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Erro ao carregar endereços:", error);
      const enderecoSelect = document.getElementById("endereco");
      enderecoSelect.innerHTML = '<option value="">Erro ao carregar endereços</option>';
    });
};

// Função para preencher campos de endereço automaticamente
function preencherEndereco() {
  const idSelecionado = document.getElementById("endereco").value;
  const endereco = listaEnderecos.find(e => e.id == idSelecionado);

  if (!endereco) return;

  // Criar campos dinamicamente se quiser mostrar no formulário
  // Aqui apenas guardamos para enviar no fetch
  document.getElementById("endereco").dataset.rua = endereco.rua;
  document.getElementById("endereco").dataset.numero = endereco.numero;
  document.getElementById("endereco").dataset.bairro = endereco.bairro;
  document.getElementById("endereco").dataset.cep = endereco.cep;
  document.getElementById("endereco").dataset.complemento = endereco.complemento;
}

// Adiciona evento onchange no select
document.getElementById("endereco").addEventListener("change", preencherEndereco);

// Função para salvar responsável
function salvarResponsavel() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const idEndereco = document.getElementById("endereco").value;

  if (!nome || !email || !telefone || !cpf || !idEndereco) {
    const msg = document.getElementById("mensagem");
    msg.textContent = "Preencha todos os campos!";
    msg.style.color = "red";
    return;
  }

  const enderecoSelect = document.getElementById("endereco");

  const payload = {
    nome: nome,
    email: email,
    telefone: telefone,
    cpf: cpf,
    enderecoDto: {
      id: idEndereco
    //   rua: enderecoSelect.dataset.rua,
    //   numero: enderecoSelect.dataset.numero,
    //   bairro: enderecoSelect.dataset.bairro,
    //   cep: enderecoSelect.dataset.cep,
    //   complemento: enderecoSelect.dataset.complemento
     },
  };

  console.log("Payload enviado:", JSON.stringify(payload));

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*"); // preservando conforme solicitado

  fetch("http://127.0.0.1:8080/responsavel/cadresponsavel", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: headers,
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (!response.ok) throw new Error("Erro na resposta da API");
    return response.json();
  })
  .then(data => {
    console.log("Responsável cadastrado:", data);
    localStorage.setItem('id_responsavel', data.id);

    const msg = document.getElementById("mensagem");
    msg.textContent = "Responsável cadastrado com sucesso!";
    msg.style.color = "green";

    document.getElementById("responsavelForm").reset();
  })
  .catch(error => {
    console.error("Erro ao salvar responsável:", error);
    const msg = document.getElementById("mensagem");
    msg.textContent = "Erro ao salvar o Responsável!";
    msg.style.color = "red";
  });
}