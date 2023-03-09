let script = document.currentScript
const params = new URLSearchParams(window.location.search)
let type = params.get('fileName')
let jsonFileName = atob(type)
let folderName = script.dataset.foldername
let fileName = jsonFileName
let lang = script.dataset.lang
let feature_h1 = document.querySelector('.feature-h1')
let feature_h2 = document.querySelector('.feature-h2')
let feature_img = document.querySelector('.features-img')

const getSeodata = async () => {
  let URL = '/data' + '/' + folderName + '/' + lang + '/' + fileName + '.json'
  const data = await fetch(URL)
  const seoData = await data.json()

  feature_h1.innerHTML = seoData.H1
  feature_h2.innerHTML = seoData.H2

  document.head
    .querySelector('meta[property="og:title"]')
    .setAttribute('content', seoData.TITLE)
  document.head
    .querySelector('meta[name="description"]')
    .setAttribute('content', seoData.META)
  document.head
    .querySelector('meta[name="twitter:title"]')
    .setAttribute('content', seoData.TITLE)
  document.head
    .querySelector('meta[name="twitter:description"]')
    .setAttribute('content', seoData.META)

  if (seoData.img) {
    feature_img.src = seoData.img
    feature_img.setAttribute('alt', seoData.imgalt)
    feature_img.style.width = seoData.imgwidth
    feature_img.style.height = seoData.imgheight
  }

  document.title = seoData.TITLE
}
getSeodata()
