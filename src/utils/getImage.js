// src/utils/getImage.js

/**
 * Returns a valid image URL for a given item.
 * - Always trusts the `image` field from backend.
 * - Falls back to a static placeholder if missing.
 *
 * @param {Object} item
 * @param {string} fallback
 * @returns {string}
 */
const getImage = (
  item,
  fallback = "https://via.placeholder.com/600x400?text=No+Image"
) => {
  if (item?.image && item.image.trim() !== "") {
    return item.image;
  }
  return fallback;
};

export default getImage;
