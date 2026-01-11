const list = document.getElementById("article-list");
const titleEl = document.getElementById("article-title");
const contentEl = document.getElementById("article-content");

let articles = [];

fetch("articles.json")
  .then(r => r.json())
  .then(data => {
    articles = data;
    renderList();
    renderArticle();
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

async function renderArticle() {
  const id = location.hash.slice(1);
  const article = articles.find(a => a.id === id);
  if (!article) return;

  titleEl.textContent = article.title;

  const md = await fetch(`articles/${article.file}`).then(r => r.text());
  contentEl.innerHTML = marked.parse(md);
}

window.addEventListener("hashchange", renderArticle);