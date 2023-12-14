let loadStatus = false;

function applyStyles(elem, styles) {
  for (const [key, value] of Object.entries(styles)) {
    elem.style[key] = value;
  }
}

function pickRandomUser(selectedUser, users, animationDuration = 2000) {
  let animationInterval;
  let animationStartTime = Date.now();

  function updateAnimation() {
    const randomIndex = Math.floor(Math.random() * users.length);
    selectedUser.textContent = `Sorteando: ${users[randomIndex]}`;

    if (Date.now() - animationStartTime >= animationDuration) {
      clearInterval(animationInterval);
      const finalIndex = Math.floor(Math.random() * users.length);
      selectedUser.textContent = `Sorteado: ${users[finalIndex]}`;

      applyStyles(selectedUser, {
        color: '#f9ff00',
        border: '2px solid blue',
        padding: '10px',
        borderRadius: '5px',
      });
    }
  }

  animationInterval = setInterval(updateAnimation, 100);
}

function showNameList(users) {
  const container = document.createElement("div");
  applyStyles(container, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    padding: "20px",
    overflowY: "scroll",
    zIndex: "9999",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  });

  const title = document.createElement("h2");
  title.textContent = `Lista de ${users.length} Usuários`;
  container.appendChild(title);

  const selectedUser = document.createElement("div");
  applyStyles(selectedUser, {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  });

  container.appendChild(selectedUser);

  const pickButton = document.createElement("button");
  pickButton.textContent = "Sortear Usuário";
  applyStyles(pickButton, {
    marginBottom: "20px",
  });

  pickButton.onclick = () => {
    pickRandomUser(selectedUser, users);
  };

  container.appendChild(pickButton);

  const list = document.createElement("ul");
  applyStyles(list, {
    listStyle: "none",
    padding: "0",
    maxHeight: "60vh",
    overflowY: "auto",
    width: "100%",
    textAlign: "center",
    backgroundColor: "rgb(94 66 202 / 50%)",
    fontSize: "x-large",
  });

  for (const user of users) {
    const listItem = document.createElement("li");
    listItem.textContent = user;
    applyStyles(listItem, {
      padding: "10px",
      borderBottom: "1px solid #ccc",
    });
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
