const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
const UNSPLASH_API_URL = 'https://api.unsplash.com'

// Extract generic product name without brand
const getGenericProductName = (productName) => {
  const genericMap = {
    'iphone': 'smartphone',
    'samsung galaxy': 'smartphone',
    'google pixel': 'smartphone',
    'oneplus': 'smartphone',
    'huawei': 'smartphone',
    'playstation': 'game console',
    'xbox': 'game console',
    'nintendo switch': 'game console',
    'bamboobuds': 'wireless earbuds',
    'homepod': 'smart speaker',
    'macbook': 'laptop',
    'dell xps': 'laptop',
    'hp envy': 'laptop',
    'ipad': 'tablet',
    'samsung galaxy tab': 'tablet',
    'microsoft surface': 'tablet',
    'apple watch': 'smartwatch',
    'samsung galaxy watch': 'smartwatch',
    'gopro': 'action camera',
    'canon eos': 'camera',
    'dji': 'drone'
  }
  
  const lowerName = productName.toLowerCase()
  
  // Check for brand-specific terms and replace with generic
  for (const [brand, generic] of Object.entries(genericMap)) {
    if (lowerName.includes(brand)) {
      return generic
    }
  }
  
  // Remove common brand names and numbers
  let generic = lowerName
    .replace(/\b(apple|samsung|google|sony|microsoft|dell|hp|canon|nintendo|playstation|xbox|huawei|oneplus|dji|gopro)\b/gi, '')
    .replace(/\d+/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  
  // Extract main product type
  const productTypes = ['controller', 'earbuds', 'headphones', 'speaker', 'laptop', 'tablet', 'smartphone', 'watch', 'camera', 'drone', 'console']
  for (const type of productTypes) {
    if (generic.includes(type)) {
      return type
    }
  }
  
  return generic || 'electronic device'
}

export const getProductImage = async (productName, category = '') => {
  try {
    const genericName = getGenericProductName(productName)
    const query = encodeURIComponent(`${genericName} ${category}`)
    const response = await fetch(
      `${UNSPLASH_API_URL}/search/photos?query=${query}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
    )
    const data = await response.json()
    
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular
    }
    
    // Fallback to category-based search
    const categoryQuery = encodeURIComponent(category || genericName)
    const fallbackResponse = await fetch(
      `${UNSPLASH_API_URL}/search/photos?query=${categoryQuery}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
    )
    const fallbackData = await fallbackResponse.json()
    
    if (fallbackData.results && fallbackData.results.length > 0) {
      return fallbackData.results[0].urls.regular
    }
    
    // Final fallback
    return `https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop&client_id=${UNSPLASH_ACCESS_KEY}`
  } catch (error) {
    console.error('Error fetching image:', error)
    return `https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop&client_id=${UNSPLASH_ACCESS_KEY}`
  }
}

export const getCategoryImage = async (categoryName) => {
  try {
    const query = encodeURIComponent(categoryName)
    const response = await fetch(
      `${UNSPLASH_API_URL}/search/photos?query=${query}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
    )
    const data = await response.json()
    
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular
    }
    
    return `https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop&client_id=${UNSPLASH_ACCESS_KEY}`
  } catch (error) {
    console.error('Error fetching category image:', error)
    return `https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop&client_id=${UNSPLASH_ACCESS_KEY}`
  }
}
