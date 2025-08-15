/**
 * Generate URL-friendly slug from string
 * @param text - The text to convert to slug
 * @returns URL-friendly slug
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Generate unique slug by appending number if duplicate exists
 * @param text - The text to convert to slug
 * @param existingSlugs - Array of existing slugs to check against
 * @returns Unique slug
 */
export const generateUniqueSlug = (text: string, existingSlugs: string[]): string => {
  let slug = generateSlug(text);
  let counter = 1;
  
  while (existingSlugs.includes(slug)) {
    slug = `${generateSlug(text)}-${counter}`;
    counter++;
  }
  
  return slug;
};
