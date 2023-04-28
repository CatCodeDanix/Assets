const css = document.querySelectorAll('link[rel="stylesheet"]');
const js = document.querySelectorAll('script[src]');
const cssSection = document.getElementById('css');
const jsSection = document.getElementById('js');

function copyUrl(el) {
  const url = el.parentElement.previousElementSibling.textContent;
  navigator.clipboard.writeText(url);
  el.style.backgroundColor = 'green';
  setTimeout(() => {
    el.style.backgroundColor = '#0d6efd';
  }, 1000);
}

function addToUi(file) {
  const isCss = file.href ? true : false;
  const table = isCss
    ? cssSection.lastElementChild.firstElementChild
    : jsSection.lastElementChild.firstElementChild;
  const html = `
  <tr>
    <td>${isCss ? file.href.split('/').at(-1) : file.src.split('/').at(-1)}</td>
    <td>${isCss ? file.href : file.src}</td>
    <td>
      <button class="btn btn-primary" type="button" onclick="copyUrl(this)">Copy</button>
    </td>
  </tr>
  `;
  table.insertAdjacentHTML('beforeend', html);
}

[...css, ...js].forEach(file => {
  addToUi(file);
});
