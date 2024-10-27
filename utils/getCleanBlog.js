export default function cleanBlog(data) {
  return [
    ...data.map((blog) => ({
      id: blog.id,
      ...blog.attributes,
      blogImage: {
        url: blog.attributes.blogImage.data.attributes.url,
      },
    })),
  ];
}
