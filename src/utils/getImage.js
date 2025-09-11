// src/utils/getImage.js

/**
 * Returns a valid image URL for a given item.
 * - Uses the item's own `image` if available.
 * - Otherwise falls back to Unsplash with the title keyword.
 *
 * @param {Object} item - Object containing image + title
 * @param {string} fallback - Fallback keyword (e.g. "internship")
 * @returns {string} image URL
 */
const getImage = (item, fallback = "education") => {
  if (item?.image && item.image.trim() !== "") {
    return item.image;
  }

  const keyword = encodeURIComponent(item?.title || fallback);
  return `https://source.unsplash.com/600x400/?${keyword},${fallback}`;
};

export default getImage;
