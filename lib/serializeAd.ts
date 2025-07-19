export function serializeAd(ad: any) {
  return {
    _id: ad._id.toString(),
    title: ad.title,
    description: ad.description,
    category: ad.category,
    contact: ad.contact,
    imageUrl: ad.imageUrl,
    createdAt: ad.createdAt?.toISOString?.(),
  }
}
