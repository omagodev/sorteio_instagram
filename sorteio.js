let loadStatus = false;

function showNameList(users) {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  container.style.padding = "20px";
  container.style.overflowY = "scroll";
  container.style.zIndex = "9999";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "center";

  const title = document.createElement("h2");
  title.textContent = `Lista de ${users.length} Usuários`;
  container.appendChild(title);

  const selectedUser = document.createElement("div");
  selectedUser.style.fontSize = "24px";
  selectedUser.style.fontWeight = "bold";
  selectedUser.style.marginBottom = "20px";
  container.appendChild(selectedUser);

  function pickRandomUser() {
    let animationInterval;
    let animationDuration = 2000; // Duração da animação em milissegundos
    let animationStartTime = Date.now();

    // Função para atualizar o nome exibido durante a animação
    function updateAnimation() {
      const randomIndex = Math.floor(Math.random() * users.length);
      selectedUser.textContent = `Sorteando: ${users[randomIndex]}`;

      if (Date.now() - animationStartTime >= animationDuration) {
        clearInterval(animationInterval);
        const finalIndex = Math.floor(Math.random() * users.length);
        selectedUser.textContent = `Sorteado: ${users[finalIndex]}`;
        selectedUser.style.color = "#f9ff00";
        selectedUser.style.border = "2px solid blue";
        selectedUser.style.padding = "10px";
        selectedUser.style.borderRadius = "5px";
      }
    }

    // Inicia a animação
    animationInterval = setInterval(updateAnimation, 100);
  }

  const pickButton = document.createElement("button");
  pickButton.textContent = "Sortear Usuário";
  pickButton.style.marginBottom = "20px";
  pickButton.onclick = () => {
    pickRandomUser();
  };
  container.appendChild(pickButton);

  const list = document.createElement("ul");
  list.style.listStyle = "none";
  list.style.padding = "0";
  list.style.maxHeight = "60vh";
  list.style.overflowY = "auto";
  list.style.width = "100%";
  list.style.textAlign = "center";
  list.style.backgroundColor = "rgb(94 66 202 / 50%)";
  list.style.fontSize = "x-large";

  for (const user of users) {
    const listItem = document.createElement("li");
    listItem.textContent = user;
    listItem.style.padding = "10px";
    listItem.style.borderBottom = "1px solid #ccc";
    list.appendChild(listItem);
  }
  container.appendChild(list);

  const closeButton = document.createElement("button");
  closeButton.textContent = "Fechar";
  closeButton.style.marginTop = "20px";
  closeButton.onclick = () => {
    container.remove();
  };
  container.appendChild(closeButton);

  document.body.appendChild(container);
}

function loadAlgorithm() {
  const button_load = document.querySelector(
    "svg[aria-label='Carregar mais comentários']"
  );

  if (loadStatus) {
    const loding = document.querySelector(
      ".x78zum5.xl56j7k.xdt5ytf.x10l6tqk.x1nrll8i.xwa60dl.x11lhmoz"
    );

    if (loding) {
      console.log("ainda carregando...");
      setTimeout(() => {
        loadAlgorithm();
      }, 1000);
      return;
    } else {
      console.log("terminou");
      loadStatus = false;
    }
  }

  if (!button_load) {
    const users = [];
    console.log("finalizou o processo de carregamento");
    document.querySelectorAll("._a9z6._a9za ._a9ym").forEach((user) => {
      const username = user.querySelector("._a9zr ._a9zc");
      users.push(username.textContent);
    });
    showNameList(users);
    return;
  }

  console.log(`Comentários carregados...`);
  loadStatus = true;
  button_load.parentNode.parentNode.click();
  setTimeout(() => {
    loadAlgorithm();
  }, 1000);
}

function main() {
  // Cria um botão
  const button = document.createElement("button");
  button.textContent = "Iniciar algoritmo";
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.zIndex = "9999";

  button.addEventListener("click", () => {
    loadAlgorithm();
  });

  document.body.appendChild(button);
}

main();
