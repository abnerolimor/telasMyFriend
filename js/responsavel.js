// Carrega os endereços quando a página for carregada
window.onload = () => {
  fetch("http://127.0.0.1:8080/endereco/listaEndereco")
    .then(response => {
      if (!response.ok) throw new Error("Erro ao buscar endereços");
      return response.json();
    })
    .then(data => {
      const enderecoSelect = document.getElementById("endereco");

      data.forEach(endereco => {
        const option = document.createElement("option");
        option.value = endereco.id;
        option.textContent = `${endereco.rua}, ${endereco.numero} - ${endereco.cidade}`;
        enderecoSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Erro ao carregar endereços:", error);
      const enderecoSelect = document.getElementById("endereco");
      enderecoSelect.innerHTML = '<option value="">Erro ao carregar endereços</option>';
    });
};

// Função para salvar o responsável
function salvarResponsavel() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const idEndereco = document.getElementById("endereco").value;
  const rua = document.getElementById("endereco").value;
  const bairro  = document.getElementById("endereco").value;
  const numero = document.getElementById("endereco").value;
  const cep  = document.getElementById("endereco").value;
  const complemento = document.getElementById("endereco").value;
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!nome || !email || !telefone || !cpf || !idEndereco || !usuario || !senha) {
    document.getElementById("mensagem").textContent = "Preencha todos os campos!";
    document.getElementById("mensagem").style.color = "red";
    return;
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");

  fetch("http://127.0.0.1:8080/responsavel/cadresponsavel", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: headers,
    body: JSON.stringify({
      nome: nome,
      email: email,
      telefone: telefone,
      cpf: cpf,
      enderecoDto: {
        enderecoDto: {
          id: idEndereco, // ou null se for novo endereço
          rua: rua,
          numero: numero,
          bairro: bairro,
          cep: cep,
          complemento: complemento
        }
        
      },
      loginDto: {
        user: usuario,
        passowrd: senha
      }
    })
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
    console.error('Erro ao salvar responsável:', error);
    document.getElementById("mensagem").textContent = "Erro ao salvar o Responsável!";
    document.getElementById("mensagem").style.color = "red";
  });
}
