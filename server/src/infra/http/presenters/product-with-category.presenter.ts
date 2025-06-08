import uploadConfig from '@/core/config/upload'
import { ProductWithCategory } from '@/domain/app/application/use-cases/value-objects/product-with-category'

export class ProductWithCategoryPresenter {
  static toHTTP(productWithComment: ProductWithCategory) {
    return {
      id: productWithComment.productId.toString(),
      name: productWithComment.name,
      description: productWithComment.description,
      priceInCents: productWithComment.priceInCents,
      availableQuantity: productWithComment.availableQuantity,
      categoryId: productWithComment.categoryId.toString(),
      category: productWithComment.category,
      image: productWithComment.image,
      imageURL: `${uploadConfig.imageBaseURL()}/${productWithComment.image}`,
      available: productWithComment.available,
      createdAt: productWithComment.createdAt,
      updatedAt: productWithComment.updatedAt
    }
  }
}
