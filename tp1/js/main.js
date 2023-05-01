
import { createMarkup, removeClass, addClass } from "./class.js";

const header = createMarkup('header', "", document.body);
const nav = createMarkup('nav', '', header);
for (let i = 0; i < 4; i++) {
  createMarkup('button', ``, nav, [{ name: "class", value: "btn" }, { name: "id", value: "btn" + i }]);
}

let btnTous = document.getElementById('btn0');
let btnHtml = document.getElementById('btn1');
let btnCss = document.getElementById('btn2');
let btnJs = document.getElementById('btn3');
btnTous.innerText = "Tous";
btnHtml.innerText = "HTML";
btnCss.innerText = "CSS";
btnJs.innerText = "JS";

let btns = document.getElementsByClassName('btn');
for (let i = 0; i < btns.length; i++) btns[i].classList.add('btn-success');

const main = createMarkup('main', "", document.body);

const articles = [];

for (let i = 0; i < 5; i++) {
  articles.push(createMarkup('article', ``, main, [{ name: "class", value: "card display" }, { name: "id", value: "artHtml" + i }]));
}
for (let i = 0; i < 5; i++) {
  articles.push(createMarkup('article', ``, main, [{ name: "class", value: "card display" }, { name: "id", value: "artCss" + i }]));
}
for (let i = 0; i < 6; i++) {
  articles.push(createMarkup('article', ``, main, [{ name: "class", value: "card display" }, { name: "id", value: "artJs" + i }]));
}

for (let i = 0; i < articles.length; i++) {
  let p = createMarkup('p', '', articles[i], [{ name: "class", value: "p" }, { name: "id", value: "p" + i }]);
  if (i < 5) p.innerText = "Article sur le HTML";
  else if (i >= 5 && i < 10) p.innerText = "Article sur le CSS";
  else p.innerText = "Article sur le JS";
};

const articleHtml = ['artHtml1', 'artHtml2', 'artHtml3', 'artHtml4', 'artHtml5'];
const articleCss = ['artCss1', 'artCss2', 'artCss3', 'artCss4', 'artCss5'];
const articleJs = ['artJs1', 'artJs2', 'artJs3', 'artJs4', 'artJs5', 'artJs6'];

for (let i = 0; i < btns.length; i++) {
  btns[i].onclick = manageBtnClick;
};

const displayAll = () => {
  articleHtml.forEach(id => removeClass(id));
  articleJs.forEach(id => removeClass(id));
  articleCss.forEach(id => removeClass(id));
};

displayAll();

function manageBtnClick(event) {
  if (event.target.id === 'btn0') {
    displayAll();

  } else if (event.target.id === 'btn1') {
    articleCss.forEach(id => addClass(id));
    articleJs.forEach(id => addClass(id));
    articleHtml.forEach(id => removeClass(id));

  } else if (event.target.id === 'btn2') {
    articleHtml.forEach(id => addClass(id));
    articleJs.forEach(id => addClass(id));
    articleCss.forEach(id => removeClass(id));

  } else if (event.target.id === 'btn3') {
    articleHtml.forEach(id => addClass(id));
    articleCss.forEach(id => addClass(id));
    articleJs.forEach(id => removeClass(id));
  }
};





