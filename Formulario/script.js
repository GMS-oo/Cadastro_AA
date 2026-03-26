function realizarLogin(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;

    if (nome) {
        alert("Bem-vindo(a), " + nome + "! Vamos para o próximo passo.");
        
       
    }
}