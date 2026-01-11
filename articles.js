const articles = [
  {
    id: "1",
    title: "Pierwsza myśl",
    content: `
    Pierwsza myśl jest zawsze najważniejsza.
    `
  },
  
];

const listView = document.getElementById("list-view");
const articleView = document.getElementById("article-view");
const list = document.getElementById("article-list");

const titleEl = document.getElementById("article-title");
const contentEl = document.getElementById("article-content");
const backBtn = document.getElementById("back");

articles.forEach(article => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = `#${article.id}`;
  a.textContent = article.title;
  li.appendChild(a);
  list.appendChild(li);
});

function render() {
  const id = location.hash.slice(1);
  const article = articles.find(a => a.id === id);

  if (!article) {
    listView.classList.remove("hidden");
    articleView.classList.add("hidden");
    return;
  }

  titleEl.textContent = article.title;
  contentEl.textContent = article.content;

  listView.classList.add("hidden");
  articleView.classList.remove("hidden");
}

window.addEventListener("hashchange", render);
backBtn.addEventListener("click", () => {
  location.hash = "";
});

render();