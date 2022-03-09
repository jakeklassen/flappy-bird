/**
 * Loads an image
 * @param path image URL
 */
export const loadImage = (path: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (err) => reject(err);

    // Kick off the  loading process
    image.src = path;
  });
