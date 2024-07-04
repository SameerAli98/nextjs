export interface ProductJSON {
  title: string
  price: string
  reviews: string
  image_url: string
  scrape_datetime: string
}


export interface Product {
  title: string
  price: string
  reviews: number
  imageUrl: string
  scrapeDatetime: Date
}
