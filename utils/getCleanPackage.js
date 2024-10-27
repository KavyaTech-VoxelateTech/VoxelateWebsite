export default function getCleanPackage(data) {
  const packageData = {
    id: data.id,
    title: data.attributes.title,
    location: data.attributes.location,
    startingPrice: data.attributes.startingPrice,
    discountInPercent: data.attributes.discountInPercent,
    publishedAt: data.attributes.publishedAt,
    createdAt: data.attributes.createdAt,

    videos: data?.attributes?.videos?.video?.map((item) => {
      return item.videoUrl
    }),
    Gallery: {
      toShow: data?.attributes?.Gallery?.toShow,
      images: data?.attributes?.Gallery?.images?.images.data.map(
        (item) => item.attributes.url
      ),
    },
    itinerary: {
      dailyPlan: [...data.attributes.itinerary.dailyPlan],
      toShow: data.attributes.itinerary.toShow,
      description: data.attributes.itinerary.description,
    },
    Overview: data.attributes.Overview,
    heroImage: {
      url: data.attributes.heroImage.data.attributes.url,
      formats: data.attributes.heroImage.data.attributes.formats,
    },
    keyHighlights: data.attributes.keyHighlights,
    travelRoute: {
      description: data.attributes.travelRoute.description,
      routeImg: data.attributes.travelRoute.routeImg.data.attributes.url,
    },
    categories: data.attributes.categories.data.map((category) => {
      return {
        id: category.id,
        title: category.attributes.title,
      };
    }),
  };

  return packageData;
}
