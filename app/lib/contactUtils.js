export function scrollToContactWithService(serviceName) {
  const input = document.getElementById('service-input')
  if (input) {
    input.value = serviceName
    input.style.borderBottomColor = 'var(--sienna)'
    setTimeout(() => {
      input.style.borderBottomColor = ''
    }, 2000)
  }
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => input?.focus(), 600)
  }
}
