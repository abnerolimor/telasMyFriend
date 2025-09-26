<<<<<<< HEAD
function salvarpet() {

=======
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
>>>>>>> bed63b96279a33de6f6db5c1e75a785afc974870
  const nome = document.getElementById("nome").value.trim();
  const idade= document.getElementById("idade").value.trim();
  const raca = document.getElementById("raca").value.trim();
<<<<<<< HEAD
  const sexo= document.getElementById("sexo").value.trim();
  const urlImagem = document.getElementById("urlImagem").value.trim();
  const responsavel= document.getElementById("responsavel").value.trim();

=======
  const porte = document.getElementById("porte").value;
  const sexo = document.getElementById("sexo").value;
  const responsavelId = document.getElementById("responsavel").value;
  const cor = document.getElementById("cor").value.trim();

  if (!nome || !idade || !raca || !porte || !sexo || !responsavelId || !cor) {
    exibirMensagem("Preencha todos os campos!", "red");
    return;
  }
>>>>>>> bed63b96279a33de6f6db5c1e75a785afc974870

  var headers = new Headers();
  headers.append("Content-Type", "application/json");

<<<<<<< HEAD
  fetch("http://127.0.0.1:8080/pet/insert", {

    method: "POST",
    mode: "cors",
    cache: "no-cache",

    body: JSON.stringify({
      nome: nome,
      idade: idade,
      raca: raca,
      sexo: sexo,
      urlImagem: urlImagem,
      responsavel: responsavel
    }),
     
    headers: headers

 
  }).then(response => {
    if (!response.ok) {
      throw new Error("Erro na resposta da API");
    }
    return response.json();
  }).then(  data =>  {

    const professor_id = data.id;
    console.log("Id do registro salvo: ", pet_id);

    window.location.href = "sucesso.html"

    localStorage.setItem('id_pet', pet_id);

  }).catch(error => console.error('Erro!:', error));


=======
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
>>>>>>> bed63b96279a33de6f6db5c1e75a785afc974870
}





// const form = document.getElementById('form-pet');
// const petsContainer = document.getElementById('pets-container');

// // Array para armazenar pets em memória
// const pets = [];

// form.addEventListener('submit', function(event) {
//   event.preventDefault();

//   // Capturar valores do formulário
//   const novoPet = {
//     id: Date.now(), // gera um id simples único
//     nome: form.nome.value.trim(),
//     idade: form.idade.value.trim(),
//     raca: form.raca.value.trim(),
//     porte: form.porte.value,
//     sexo: form.sexo.value,
//     responsavel: form.responsavel.value.trim(),
//     cor: form.cor.value.trim()
//   };

//   // Adiciona no array pets
//   pets.push(novoPet);

//   // Atualiza lista na tela
//   renderPets();

//   // Reseta o formulário
//   form.reset();
//   form.nome.focus();
// });

// function renderPets() {
//   petsContainer.innerHTML = '';

//   if (pets.length === 0) {
//     petsContainer.innerHTML = '<p>Nenhum pet cadastrado.</p>';
//     return;
//   }

//   pets.forEach(pet => {
//     const petDiv = document.createElement('div');
//     petDiv.classList.add('pet-item');

//     petDiv.innerHTML = `
//       <p><strong>Nome:</strong> ${pet.nome}</p>
//       <p><strong>Idade:</strong> ${pet.idade}</p>
//       <p><strong>Raça:</strong> ${pet.raca}</p>
//       <p><strong>Porte:</strong> ${pet.porte}</p>
//       <p><strong>Sexo:</strong> ${pet.sexo}</p>
//       <p><strong>Responsável:</strong> ${pet.responsavel}</p>
//       <p><strong>Cor:</strong> ${pet.cor}</p>
//     `;

//     petsContainer.appendChild(petDiv);
//   });
// }

// // Inicializa lista vazia
// renderPets();
