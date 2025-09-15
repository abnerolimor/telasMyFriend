function salvarCatalogo() {
  const item = document.getElementById("item").value.trim();
  const descricao = document.getElementById("descricao").value.trim();

  if (!item || !descricao) {
    document.getElementById("mensagem").textContent = "Preencha todos os campos!";
    document.getElementById("mensagem").style.color = "red";
    return;
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");

  fetch("http://127.0.0.1:8080/catalogo/insert", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    body: JSON.stringify({ item, Descricao: descricao }),
    headers: headers
  })
  .then(response => {
    if (!response.ok) throw new Error("Erro na resposta da API");
    return response.json();
  })
  .then(data => {
    const catalogo_id = data.id;
    console.log("Id do Catálogo salvo: ", catalogo_id);
    localStorage.setItem('id_catalogo', catalogo_id);

    document.getElementById("mensagem").textContent = "Catálogo cadastrado com sucesso!";
    document.getElementById("mensagem").style.color = "green";

    document.getElementById("catalogoForm").reset();
  })
  .catch(error => {
    console.error('Erro!:', error);
    document.getElementById("mensagem").textContent = "Erro ao salvar o Catálogo!";
    document.getElementById("mensagem").style.color = "red";
  });
}
