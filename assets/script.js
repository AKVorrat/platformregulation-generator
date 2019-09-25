// Make all http links open in a new tab
const links = document.querySelectorAll('a')
links.forEach(link => {
  if (link.getAttribute('href').startsWith('http')) {
    link.setAttribute('target', '_blank')
  }
})

// Add corresponding class names to all tags
const tags = document.querySelectorAll('code')

tags.forEach(tag => {
  switch (tag.innerHTML.toLowerCase()) {
    case 'must':
      tag.classList.add('tag', 'must')
      break
    case 'must not':
      tag.classList.add('tag', 'must-not')
      break
    case 'recommended':
      tag.classList.add('tag', 'recommended')
      break
    case 'not recommended':
      tag.classList.add('tag', 'not-recommended')
      break
    case 'discuss':
      tag.classList.add('tag', 'discuss')
      break
    default:
      break
  }
})

const sections = document.querySelectorAll('section.level2')

const toggleSection = event => {
  const eventPath = event.path || event.composedPath()
  const toggledSection = eventPath.find(item => item.classList.contains('level2'))

  if (!toggledSection.classList.contains('open')) {
    event.target.innerHTML = '▲ hide descriptions'
    toggledSection.classList.add('open')
  } else {
    event.target.innerHTML = '▼ show descriptions'
    toggledSection.classList.remove('open')
  }
}

const selectSection = event => {
  const eventPath = event.path || event.composedPath()
  const selectedSection = eventPath.find(item => item.classList.contains('level2'))

  sections.forEach(section => section.classList.remove('selected'))
  selectedSection.classList.add('selected')
}

sections.forEach(section => {
  const sectionControls = document.createElement('div')
  sectionControls.classList.add('section-controls')

  const sectionHeading = section.querySelector('h2')
  if (section.id && sectionHeading) {
    sectionHeading.innerHTML = `<a href="#${section.id}" class="section-link">${sectionHeading.innerHTML}</a>`
  }

  if (!section.querySelector('blockquote')) {
    section.classList.add('open')
  } else {
    const toggleButton = document.createElement('button')
    toggleButton.classList.add('toggle-button')
    toggleButton.innerHTML = '▼ show descriptions'
    toggleButton.addEventListener('click', toggleSection)
    sectionControls.appendChild(toggleButton)
  }

  section.appendChild(sectionControls)

  section.addEventListener('click', selectSection)

  const sectionTag = section.querySelector('h2 .tag')
  if (sectionTag) {
    const tagType = sectionTag.className.split(' ')[1]
    section.classList.add(tagType)
  }
})

const filters = document.querySelectorAll('.filter-container .tag')
const filterStyles = document.querySelector('style.filters')
const selectedFilters = []

const selectFilter = event => {
  const selectedFilter = event.target
  if (selectedFilters.indexOf(selectedFilter.id) !== -1) {
    selectedFilters.splice(selectedFilters.indexOf(selectedFilter.id), 1)
    selectedFilter.classList.remove('hidden')
  } else {
    selectedFilters.push(selectedFilter.id)
    selectedFilter.classList.add('hidden')
  }

  const selectedFiltersSelectors = selectedFilters.map(filter => `section.level2.${filter}`)
  filterStyles.innerHTML = `${selectedFiltersSelectors} { display: none; }`

}

filters.forEach(filter => filter.addEventListener('click', selectFilter))

// Newsletter signup
const newsletterForm = document.querySelectorAll('form.newsletter-form')

const newsletterSubmit = async event => {
  event.preventDefault()
  event.target.parentElement.classList.add('submitted')

  const language = event.target.querySelector('.newsletter-language:checked').value
  const url = language === 'de'
    ? 'https://secure.dialog-mail.com/s/1ePd3'
    : 'https://secure.dialog-mail.com/s/3xJOH'

  const newsletterGruppe = event.target.querySelector('input.newsletter-gruppe')
  if (language === 'de') {
    newsletterGruppe.name = 'gruppe_49392'
    newsletterGruppe.value = 'gruppe_49392'
  }

  const response = await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    body: new FormData(event.target)
  })
}

newsletterForm.forEach(input => input.addEventListener('submit', newsletterSubmit))
