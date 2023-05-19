

  export default function myImageLoader({ src, width, quality }) {
    return `https://ernabo.com/${src}?w=${width}&q=${quality || 75}`
   
  }