// data.js
const data = {
  products: [
    {
      id: 1,
      name: "Watch1",
      image:
        "https://s3-alpha-sig.figma.com/img/8a0d/6d87/f42170d618c62d98aee3e5865eb5fdd3?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mGJNf3-Y-t~JPu99g5ge0k8gvU34-7oEWG8M1-LtO9rloYMZK9PVRDKGOSLmJr4FYiiH0d8Us9CzK~ctg-5atJWbgutaIS6kB1tZ2njjpF2ujl1xRpxrwJsUeb7-HXRcjDDL3VoD~xTmB67CZlPCzXi97~CVIRtBxt8Z7T9GTkWlibwH6gW~54MFTFKy2~2JgecKrjmFDaRQZKUyZCos8RqeWH9smbKwRyRvqdfhikeZL-ItvwnfmNFL1M2zjzHh7PztnSNwvH1MimhfQXzXK9fGRXe-RCNeK41W08rp7F4tCS~bmK10BO9WlL-MyJGtwSbF4~4tZGg9vaEwpekcOw__", // Replace with the actual image path or import
      categories: ["Men"],
      subcategories: ["Watch"],
      rating: 3,
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
    defaultColor: "#FFFFFF",
    text: "#4F3100",
    borderColor: "#D7D7D7",
  },
};

export default data;
