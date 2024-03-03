import { getPhotos } from "./components/api.js";

// Get the #app element
let app = document.querySelector('#app');

/**
 * Get the photo ID from the URL
 * @return {String} The photo ID
 */
function getPhotoID () {
  return new URL(window.location.href).searchParams.get('id');
}

/**
 * Get a photo by its ID
 * @param  {Array}  photos All photos
 * @param  {String} id     The ID of the photo to get
 * @return {Object}        The photo data
 */
function getPhotoByID (photos, id) {
  return photos.find(function (photo) {
    return photo.id === id;
  });
}

/**
 * The HTML string for when no photo is found
 * @return {String} The HTML string
 */
function noPhotoHTML () {
  app.innerHTML = `
    <h1>Uh oh!</h1>
    <p>This photo is missing. Sorry!</p>`;
}

/**
 * The HTML string for when no data is available
 * @return {String} The HTML string
 */
function noPhotoData () {
  app.innerHTML = `
    <h1>Blimey</h1>
    <p>We don't have available photos right now.</p>`;
}

/**
 * Generate an HTML of available photos
 * @param  {Object} photos The photo data
 * @return {String}        The photo HTML string
 */
function photoPage (photos, pageId) {

  // Get the photo ID
  let id = pageId;
  if (!id) return noPhotoHTML();

  // Get the photo data
  let photo = getPhotoByID(photos, id);
  if (!photo) return noPhotoHTML();

  // Update the document.title
  document.title = `${photo.name} | ${document.title}`;

  // Show the photo
  app.innerHTML = `
    <div class="photo-info">
      <img alt="${photo.description}" src="${photo.url}">
      <div class="photo-desc">
        <h1>${photo.name}</h1>
        <p>${photo.description}</p>
      </div>
    </div>`;

}

/**
 * Generate an HTML of available photos
 * @param  {Object} photos The photo data
 * @return {String}        A list of available photos
 */
function photoGallery (photos) {
  // If there are no photos
  if (!photos || !photos.length) {
    app.innerHTML =
      "<p>There are no available photos at this time. Please try again later. Sorry!</p>";
  }

  // Otherwise, show photos
  app.innerHTML = `
    <p>High-end photography from the Seven Seas, brought to you by world-famous photographer Captain Jack Sparrow.</p>
    <div id="photos">
      ${photos
        .map(function (photo) {
          return `
          <div class="photo">
            <a href="photo.html?id=${encodeURIComponent(photo.id)}" class="photo-link">
              <img alt="${photo.description}" src="${photo.url}">
              <div>${
                photo.name
              } <svg width="16px" height="16px" viewBox="0 0 16 16" fill="none" stroke-width="1.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0 text-orange" aria-hidden="true" role="img"><path d="M12 8H4" class="p-1"></path><path d="M6.5 11.5L9.64645 8.35355C9.84171 8.15829 9.84171 7.84171 9.64645 7.64645L6.5 4.5" class="p-2"></path></svg></div>
            </a>
          </div>`;
        })
        .join("")}
    </div>`;

}

function photoHTML(photos) {
  const pageId = getPhotoID();
  if (pageId) {
    photoPage(photos, pageId);
  } else {
    photoGallery(photos);
  }
}

// Initialize
getPhotos().then(function (photos) {
  photoHTML(photos);
});