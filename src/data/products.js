import { getProductImage } from '../config/images'

export const generateProducts = async () => {
  const productTemplates = [
    // Gaming & Game Console
    { name: 'Game Controller', category: 'game-console', price: 79.99, description: 'Wireless gaming controller with advanced features', specs: { connectivity: 'Wireless', battery: '20 hours', compatibility: 'PC, PS5, Xbox' } },
    { name: 'PlayStation 5', category: 'game-console', price: 499.99, description: 'Next-generation gaming console', specs: { storage: '825GB SSD', resolution: '4K UHD', rayTracing: 'Yes' } },
    { name: 'Xbox Series X', category: 'game-console', price: 499.99, description: 'Powerful gaming console', specs: { storage: '1TB SSD', resolution: '4K UHD', fps: '120fps' } },
    { name: 'Nintendo Switch', category: 'game-console', price: 299.99, description: 'Hybrid gaming console', specs: { storage: '32GB', display: '6.2" LCD', battery: '4.5-9 hours' } },
    
    // Smartphones
    { name: 'iPhone 15 Pro', category: 'smartphone', price: 999.99, description: 'Latest iPhone with titanium design', specs: { display: '6.1" Super Retina', storage: '128GB', camera: '48MP' } },
    { name: 'Samsung Galaxy S24', category: 'smartphone', price: 899.99, description: 'Flagship Android smartphone', specs: { display: '6.2" Dynamic AMOLED', storage: '256GB', camera: '50MP' } },
    { name: 'Google Pixel 8', category: 'smartphone', price: 699.99, description: 'AI-powered smartphone', specs: { display: '6.2" OLED', storage: '128GB', camera: '50MP' } },
    { name: 'OnePlus 12', category: 'smartphone', price: 799.99, description: 'Flagship killer smartphone', specs: { display: '6.82" AMOLED', storage: '256GB', camera: '50MP' } },
    { name: 'Huawei MateView', category: 'smartphone', price: 849.99, description: 'Premium smartphone with advanced display', specs: { display: '6.7" OLED', storage: '256GB', camera: '64MP' } },
    
    // Audio
    { name: 'BambooBuds', category: 'audio', price: 129.99, description: 'Wireless earbuds with bamboo design', specs: { battery: '30 hours', noiseCancellation: 'Active', connectivity: 'Bluetooth 5.3' } },
    { name: 'HomePod Pro', category: 'audio', price: 299.99, description: 'Premium smart speaker', specs: { speakers: '7 tweeters', woofer: 'High-excursion', connectivity: 'Wi-Fi, Bluetooth' } },
    { name: 'Smart Speaker', category: 'audio', price: 199.99, description: 'Dual-speaker true sound', specs: { speakers: 'Dual', sound: '360°', connectivity: 'Wi-Fi, Bluetooth' } },
    { name: 'Bamboo Speaker', category: 'audio', price: 249.99, description: 'Transparent speaker with unique design', specs: { design: 'Transparent', drivers: 'Dual', connectivity: 'Bluetooth 5.0' } },
    { name: 'Wireless Headphones', category: 'audio', price: 179.99, description: 'Over-ear wireless headphones', specs: { battery: '40 hours', noiseCancellation: 'Active', connectivity: 'Bluetooth 5.2' } },
    
    // Computers & Laptops
    { name: 'MacBook Pro 16', category: 'computer', price: 2499.99, description: '2K Fullview Touch Display', specs: { display: '16" 2K Touch', processor: 'M3 Pro', storage: '512GB SSD', ram: '18GB' } },
    { name: 'Dell XPS 15', category: 'computer', price: 1899.99, description: 'Premium laptop for professionals', specs: { display: '15.6" 4K', processor: 'Intel i7', storage: '1TB SSD', ram: '16GB' } },
    { name: 'HP Envy 15', category: 'computer', price: 1299.99, description: 'Powerful laptop for work and play', specs: { display: '15.6" FHD', processor: 'AMD Ryzen 7', storage: '512GB SSD', ram: '16GB' } },
    { name: 'Gaming Laptop', category: 'computer', price: 1599.99, description: 'High-performance gaming laptop', specs: { display: '17.3" FHD 144Hz', processor: 'Intel i7', gpu: 'RTX 4060', storage: '1TB SSD' } },
    
    // Tablets
    { name: 'iPad Pro', category: 'tablet', price: 1099.99, description: 'Professional tablet', specs: { display: '12.9" Liquid Retina', storage: '256GB', processor: 'M2' } },
    { name: 'Samsung Galaxy Tab S9', category: 'tablet', price: 899.99, description: 'Premium Android tablet', specs: { display: '11" AMOLED', storage: '256GB', processor: 'Snapdragon 8 Gen 2' } },
    { name: 'Microsoft Surface Pro', category: 'tablet', price: 999.99, description: '2-in-1 tablet laptop', specs: { display: '13" PixelSense', storage: '256GB', processor: 'Intel i5' } },
    
    // Smartwatch
    { name: 'Apple Watch Series 9', category: 'smartwatch', price: 399.99, description: 'Latest smartwatch', specs: { display: '45mm', battery: '18 hours', features: 'GPS, ECG' } },
    { name: 'Samsung Galaxy Watch 6', category: 'smartwatch', price: 299.99, description: 'Advanced health tracking', specs: { display: '44mm', battery: '40 hours', features: 'GPS, Health Monitor' } },
    
    // Camera
    { name: 'GoPro Hero 12', category: 'camera', price: 399.99, description: 'Action camera', specs: { resolution: '5.3K', fps: '60fps', waterproof: '10m' } },
    { name: 'Canon EOS R5', category: 'camera', price: 3899.99, description: 'Professional mirrorless camera', specs: { resolution: '45MP', video: '8K', stabilization: '5-axis' } },
    { name: 'Security Camera', category: 'camera', price: 149.99, description: 'Smart security camera', specs: { resolution: '1080p', nightVision: 'Yes', connectivity: 'Wi-Fi' } },
    
    // Drone & Flycam
    { name: 'DJI Mini 4 Pro', category: 'drone-flycam', price: 759.99, description: 'Compact drone with 4K', specs: { camera: '4K/60fps', range: '12km', battery: '34 minutes' } },
    { name: 'DJI Air 3', category: 'drone-flycam', price: 1099.99, description: 'Advanced aerial photography', specs: { camera: 'Dual Camera', range: '20km', battery: '46 minutes' } }
  ]

  const products = []
  for (const template of productTemplates) {
    const imageUrl = await getProductImage(template.name, template.category)
    products.push({
      id: `${template.category}-${template.name.toLowerCase().replace(/\s+/g, '-')}`,
      ...template,
      image: imageUrl,
      rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
      reviews: Math.floor(Math.random() * 500) + 50,
      inStock: Math.random() > 0.1 // 90% in stock
    })
  }

  return products
}

export const getProductById = async (id) => {
  const products = await generateProducts()
  return products.find(p => p.id === id)
}

export const getProductsByCategory = async (category) => {
  const products = await generateProducts()
  return products.filter(p => p.category === category)
}

export const searchProducts = async (query) => {
  const products = await generateProducts()
  const lowerQuery = query.toLowerCase()
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  )
}
