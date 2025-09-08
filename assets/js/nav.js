const btn = document.getElementById('navToggle')
const closeBtn = document.getElementById('navClose')
const overlay = document.getElementById('mobileNavOverlay')
const panel = document.getElementById('mobileNavPanel')
const backdrop = document.getElementById('mobileNavBackdrop')
const closeLinks = document.querySelectorAll('[data-close-nav]')

let justOpened = false
let lastFocused = null

function openNav() {
  if (!overlay.classList.contains('hidden')) return
  lastFocused = document.activeElement
  overlay.classList.remove('hidden')
  overlay.setAttribute('aria-hidden', 'false')
  requestAnimationFrame(() => {
    panel.classList.remove('-translate-x-full')
  })
  document.body.classList.add('overflow-hidden')
  btn.setAttribute('aria-expanded', 'true')
  justOpened = true
  setTimeout(() => { justOpened = false }, 300)
}

function closeNav(force = false) {
  if (justOpened && !force) return
  panel.classList.add('-translate-x-full')
  overlay.setAttribute('aria-hidden', 'true')
  setTimeout(() => {
    overlay.classList.add('hidden')
    document.body.classList.remove('overflow-hidden')
    btn.setAttribute('aria-expanded', 'false')
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus()
  }, 200)
}

function toggleNav(e) {
  e.preventDefault()
  e.stopPropagation()
  if (overlay.classList.contains('hidden')) openNav()
  else closeNav(true)
}

btn.addEventListener('click', toggleNav, { passive: false })
btn.addEventListener('touchend', toggleNav, { passive: false })
backdrop.addEventListener('click', () => closeNav())
closeBtn.addEventListener('click', e => { e.stopPropagation(); closeNav(true) })
panel.addEventListener('click', e => e.stopPropagation())
window.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(true) })
closeLinks.forEach(a => a.addEventListener('click', () => closeNav(true)))
