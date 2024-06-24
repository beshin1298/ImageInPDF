const template = document.createElement('template');
template.innerHTML = `
  <iframe frameborder="0" 
    width="1280" 
    height="900">
  </iframe>
`

class PdfViewer extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({mode: 'open'})
    shadowRoot.appendChild(template.content.cloneNode(true))
  }
  get observedAttributes() {
    return ['src']
  }
  connectedCallback() {
    this.updateIframeSrc()
  }
  attributeChangedCallback(name) {
    if (['src', 'viewerPath'].includes(name)) {
      this.updateIframeSrc()
    }
  }s
  updateIframeSrc() {
    this.shadowRoot.querySelector('iframe').setAttribute(
      'src', 
      `https://mozilla.github.io/pdf.js/web/viewer.html?file=${this.getAttribute('src') || ''}`
    )
  }
}
window.customElements.define('pdf-viewer', PdfViewer)