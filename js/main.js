// Barra fixa: fica sólida ao sair da capa
const nav = document.getElementById('nav');
const hero = document.querySelector('.hero');

new IntersectionObserver(([entry]) => {
  nav.classList.toggle('nav--solid', !entry.isIntersecting);
}, { rootMargin: '-80px 0px 0px 0px' }).observe(hero);

// Elementos aparecem ao entrar na tela
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
reveals.forEach((el) => revealObs.observe(el));

// Serviços: abre/fecha os detalhes ao toque (um por vez)
const items = document.querySelectorAll('.menu__item');
const toggleItem = (item) => {
  const open = item.classList.contains('is-open');
  items.forEach((el) => {
    el.classList.remove('is-open');
    el.setAttribute('aria-expanded', 'false');
  });
  if (!open) {
    item.classList.add('is-open');
    item.setAttribute('aria-expanded', 'true');
  }
};
items.forEach((item) => {
  item.addEventListener('click', () => toggleItem(item));
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(item);
    }
  });
});

// Botão fixo some enquanto o botão da capa está visível
const fab = document.querySelector('.fab');
const heroBtn = document.querySelector('.hero .btn');
if (fab && heroBtn) {
  new IntersectionObserver(([entry]) => {
    fab.classList.toggle('fab--hidden', entry.isIntersecting);
  }, { threshold: 0.5 }).observe(heroBtn);
}
