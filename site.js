const menuButton = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-links');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('form[data-mailto]').forEach(form => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(data.get('subject') || 'TriageConnect.ca website inquiry');
    const body = encodeURIComponent([...data.entries()].filter(([k]) => k !== 'subject').map(([k,v]) => `${k}: ${v}`).join('\n'));
    const email = form.dataset.mailto;
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });
});
