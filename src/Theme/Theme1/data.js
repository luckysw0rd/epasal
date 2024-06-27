// data.js
const data = {
  products: [
    {
      id: 1,
      name: "Watch1",
      image: "controller", // Replace with the actual image path or import
      categories: ["Men"],
      subcategories: ["Watch"],
      rating: 2.5,
      sizes: ["S", "M", "L"],
      variants: [
        { type: "Color", option: "Black", prices: [50, 60, 70] },
        { type: "Color", option: "White", prices: [55, 65, 75] },
        { type: "Color", option: "Red", prices: [60, 70, 80] },
      ],
      description:
        "A vintage-inspired chronometer with a nostalgic design, perfect for the modern man...",
    },
    {
      id: 2,
      name: "Watch2",
      rating: 4,
      image:
        "https://s3-alpha-sig.figma.com/img/8a0d/6d87/f42170d618c62d98aee3e5865eb5fdd3?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mGJNf3-Y-t~JPu99g5ge0k8gvU34-7oEWG8M1-LtO9rloYMZK9PVRDKGOSLmJr4FYiiH0d8Us9CzK~ctg-5atJWbgutaIS6kB1tZ2njjpF2ujl1xRpxrwJsUeb7-HXRcjDDL3VoD~xTmB67CZlPCzXi97~CVIRtBxt8Z7T9GTkWlibwH6gW~54MFTFKy2~2JgecKrjmFDaRQZKUyZCos8RqeWH9smbKwRyRvqdfhikeZL-ItvwnfmNFL1M2zjzHh7PztnSNwvH1MimhfQXzXK9fGRXe-RCNeK41W08rp7F4tCS~bmK10BO9WlL-MyJGtwSbF4~4tZGg9vaEwpekcOw__",
      categories: ["Men"],
      subcategories: ["Watch"],
      sizes: ["S", "M", "L"],
      variants: [
        { type: "Color", option: "Black", prices: [50, 60, 70] },
        { type: "Color", option: "White", prices: [55, 65, 75] },
        { type: "Color", option: "Red", prices: [60, 70, 80] },
      ],
      description:
        "A sleek and modern watch that combines elegance with functionality.",
    },
    // ... more products
  ],
  color: {
    backgroundThemeColor: "#B6947D",
    secondaryBannerColor: {
      backgroundThemeColor1: "#ffffff",
      backgroundThemeColor2: "#fcf3f3",
      textColor: "#5D4B3F",
      buttonColor: "#AB8076",
      buttonText: "#ffffff",
    },
    offerBannerColor: {
      backgroundBoxThemeColor1: "#ffffff",
      backgroundThemeColor: "#C9BCAC",
      textColor: "#4E3E34",
      buttonColor: "#AB8076",
      buttonText: "#ffffff",
    },
    navColor: {
      backgroundnavColor: "#B6947D",
      storeNameTextColor: "#000000",
      categoryTextColor: "#1d2830",
      searchBarColor: "#fcf3f3",
    },
    headerColor: {
      headerText: "#ffffff",
      headerBackground: "#7a5C5c",
    },
    subcategoryColor: {
      background: "#ffffff",
      text: "#4F3100",
    },
    subProductColor: {
      categoryColor: "#ffffff",
      backgroundColor: "#FDF7E6",
      textColor: "#333333",
      borderColor: "#AB8076",
      priceColor: "#4F3100",
      priceLetterColor: "#fff",
      scrollbarColor: "#4F3100",
      starColor: "#875300",
    },
    productSection: "ffffff",
    productListColor: {
      productBackground: "ffffff",
      backgroundColor: "#fefbfb",
      textColor: "#333333",
      borderColor: "#cccccc",
      selectedBackground: "#c8bcbc",
    },
    footerColor: {
      background: "#333333",
      textColor: "#ffffff",
      linkColor: "#59CE8F",
    },
  },
};

export default data;
