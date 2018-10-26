/**
 * Returns a share link for Pinterest
 *
 * @param  {String} url
 * @return {String}
 */
export const facebookShareUrl = ( url ) => `https://www.facebook.com/sharer/sharer.php?u=${ url }`;

/**
 * Returns a share link for Pinterest
 *
 * @param  {String} url
 * @param  {String} title
 * @return {String}
 */
export const twitterShareUrl = ( url, title ) =>
	`https://twitter.com/intent/tweet?url=${ url };via=ice9js;text=${ title };&amp;count=none`;

/**
 * Returns a share link for Pinterest
 *
 * @param  {String} url
 * @param  {String} title
 * @param  {String} image
 * @return {String}
 */
export const pinterestShareUrl = ( url, title, image ) =>
	`https://pinterest.com/pin/create/button/?url=${ url }&media=${ image }&description=${ title }`;
