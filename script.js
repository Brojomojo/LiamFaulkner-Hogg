// Footer year
const yearEl = document.getElementById('y');
if (yearEl) yearEl.textContent = new Date().getFullYear();


// Tabs
const tabButtons = document.querySelectorAll('[data-tab-target]');
const tabPanels = document.querySelectorAll('.tab-panel');
function setActiveTab(button) {
    tabButtons.forEach(btn => {
        const active = (btn === button);
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', String(active));
    });
    const target = button.getAttribute('data-tab-target');
    const id = target.replace('#', '');
    tabPanels.forEach(p => { p.hidden = (p.id !== id); });
}
if (tabButtons.length) {
    tabButtons.forEach(btn => btn.addEventListener('click', () => setActiveTab(btn)));
    setActiveTab(tabButtons[0]);
}


// Mobile hamburger menu
const hamb = document.querySelector('.hamburger');
const nav = document.getElementById('primary-nav');
if (hamb && nav) {
    hamb.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('show');
        hamb.setAttribute('aria-expanded', String(isOpen));
    });
    // Close menu if a link is clicked (nice UX on mobile)
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        nav.classList.remove('show');
        hamb.setAttribute('aria-expanded', 'false');
    }));
}


// Modal (Contact)
const openButtons = document.querySelectorAll('[data-open-modal]');
const modal = document.getElementById('contact-modal');
const closeButtons = modal ? modal.querySelectorAll('[data-close-modal]') : [];


function openModal() {
    if (!modal) return; modal.hidden = false; document.body.style.overflow = 'hidden';
    // move focus to first input for accessibility
    const first = modal.querySelector('input, textarea, button'); if (first) first.focus();
}
function closeModal() { if (!modal) return; modal.hidden = true; document.body.style.overflow = ''; }


openButtons.forEach(btn => btn.addEventListener('click', e => { e.preventDefault(); openModal(); }));
closeButtons.forEach(btn => btn.addEventListener('click', closeModal));
if (modal) {
    // Close on backdrop click
    modal.addEventListener('click', e => { if (e.target.matches('.modal-backdrop')) closeModal(); });
    // Close on Esc key
    window.addEventListener('keydown', e => { if (!modal.hidden && e.key === 'Escape') closeModal(); });
}


// Contact form validation (client-side)
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault(); // prevent page reload for this demo


        // Clear previous errors
        form.querySelectorAll('.error').forEach(s => s.textContent = '');


        const name = form.elements.namedItem('name');
        const email = form.elements.namedItem('email');
        const message = form.elements.namedItem('message');


        let valid = true;


        if (!name.value.trim()) {
            name.nextElementSibling.textContent = 'Please enter your name.';
            valid = false;
        }
        // Simple email pattern (not perfect, but fine for client-side)
        const emailPat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailPat.test(email.value)) {
            email.nextElementSibling.textContent = 'Please enter a valid email address.';
            valid = false;
        }
        if (!message.value.trim()) {
            message.nextElementSibling.textContent = 'Please write a short message.';
            valid = false;
        }


        const result = form.querySelector('.form-result');
        if (!valid) {
            result.hidden = false;
            result.textContent = 'Please fix the highlighted fields.';
            return;
        }


        // At this point, you would send the data to a backend or service.
        // For a static GitHub Pages site you can:
        // - Use a mailto: link, or
        // - Use a form service (Formspree, Netlify Forms, Basin, etc.).
        result.hidden = false;
        result.textContent = 'Thanks! Your message has been validated locally. Connect a form service to actually send it.';


        // Optional: close the modal after a short delay
        setTimeout(() => { closeModal(); form.reset(); result.hidden = true; }, 1200);
    });
}