
/* CONFIGURATION DE SPMBOT */

const CONFIG = {
  clientId: "TON_ID_APPLICATION_DISCORD",
  supportUrl: "https://discord.gg/TON_INVITATION"
};

/* COMMANDES DU BOT */

const commands = [
  {
    name: "/help",
    description: "Affiche toutes les commandes.",
    category: "Général"
  },
  {
    name: "/ping",
    description: "Affiche la latence du bot.",
    category: "Général"
  },
  {
    name: "/info",
    description: "Informations sur le bot.",
    category: "Général"
  },
  {
    name: "/serverinfo",
    description: "Informations sur le serveur.",
    category: "Serveur"
  },
  {
    name: "/userinfo",
    description: "Informations sur un utilisateur.",
    category: "Serveur"
  }
];

/* LIEN D'INVITATION DISCORD */

const inviteUrl =
  "https://discord.com/oauth2/authorize" +
  "?client_id=" + encodeURIComponent(CONFIG.clientId) +
  "&permissions=0&scope=bot%20applications.commands";

document.querySelectorAll(".invite-link").forEach(link => {
  link.href = inviteUrl;
});

document.querySelectorAll(".support-link").forEach(link => {
  link.href = CONFIG.supportUrl;
});

/* AFFICHAGE DES COMMANDES */

const commandList = document.getElementById("commandList");
const searchInput = document.getElementById("commandSearch");
const emptyMessage = document.getElementById("emptyMessage");

function renderCommands(search = "") {
  const filtered = commands.filter(command => {
    const text = (
      command.name + " " +
      command.description + " " +
      command.category
    ).toLowerCase();

    return text.includes(search.toLowerCase().trim());
  });

  commandList.innerHTML = "";

  filtered.forEach(command => {
    const item = document.createElement("div");
    item.className = "command-item";

    const name = document.createElement("div");
    name.className = "command-name";
    name.textContent = command.name;

    const description = document.createElement("div");
    description.className = "command-description";
    description.textContent = command.description;

    const category = document.createElement("div");
    category.className = "command-description";
    category.textContent = "Catégorie : " + command.category;

    item.appendChild(name);
    item.appendChild(description);
    item.appendChild(category);

    commandList.appendChild(item);
  });

  emptyMessage.hidden = filtered.length > 0;
}

searchInput.addEventListener("input", function () {
  renderCommands(this.value);
});

/* MENU MOBILE */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", function () {
  const opened = nav.classList.toggle("active");

  menuToggle.textContent = opened ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(opened));
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function () {
    nav.classList.remove("active");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* ANNÉE AUTOMATIQUE */

document.getElementById("year").textContent =
  new Date().getFullYear();

/* INITIALISATION */

renderCommands();
