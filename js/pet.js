function salvarPet() {
  const nome = document.getElementById("nome").value.trim();
  const idade = document.getElementById("idade").value.trim();
  const raca = document.getElementById("raca").value.trim();
  const porte = document.getElementById("porte").value;
  const sexo = document.getElementById("sexo").value;
  const responsavel = document.getElementById("responsavel").value.trim();
  const cor = document.getElementById("cor").value.trim();

  if (!nome || !idade || !raca || !porte || !sexo || !responsavel || !cor) {
    document.getElementById("mensagem").textContent = "Preencha todos os campos!";
    document.getElementById("mensagem").style.color = "red";
    return;
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");

  fetch("http://127.0.0.1:8080/pet/insert", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    body: JSON.stringify({
      nome: nome,
      idade: idade,
      raca: raca,
      porte: porte,
      sexo: sexo,
      responsavel: responsavel,
      cor: cor
    }),
    headers: headers
  })
  .then(response => {
    if (!response.ok) throw new Error("Erro na resposta da API");
    return response.json();
  })
  .then(data => {
    const pet_id = data.id;
    console.log("Id do Pet salvo: ", pet_id);
    localStorage.setItem('id_pet', pet_id);

    document.getElementById("mensagem").textContent = "Pet cadastrado com sucesso!";
    document.getElementById("mensagem").style.color = "green";

    document.getElementById("petForm").reset();
  })
  .catch(error => {
    console.error('Erro!:', error);
    document.getElementById("mensagem").textContent = "Erro ao salvar o Pet!";
    document.getElementById("mensagem").style.color = "red";
  });
}
