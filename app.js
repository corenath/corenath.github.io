const list = document.getElementById("article-list");
const articleView = document.getElementById("article-view");
const contentEl = document.getElementById("article-content");
const backBtn = document.getElementById("back");

backBtn.addEventListener("click", () => {
  location.hash = "";
});

let articles = [];

fetch("articles.json")
  .then(r => r.json())
  .then(data => {
    articles = data;
    renderList();
    onHashChange();
  });

function renderList() {
  articles.forEach(a => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${a.id}`;
    link.textContent = a.title;
    li.appendChild(link);
    list.appendChild(li);
  });
}

async function onHashChange() {
  const id = location.hash.slice(1);
  const article = articles.find(a => a.id === id);
  if (!article) {
    articleView.classList.add("hidden");
    return;
  }

  const md = await fetch(`articles/${article.file}`).then(r => r.text());
  contentEl.innerHTML = marked.parse(md);
  articleView.classList.remove("hidden");
}

window.addEventListener("hashchange", onHashChange);