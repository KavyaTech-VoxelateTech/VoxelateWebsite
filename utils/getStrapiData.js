const getStrapiData = async (path, query = null) => {
  const url = new URL(path, process.env.NEXT_PUBLIC_BASE_URL);
  url.search = query;
  try {
    const response = await fetch( url.href,
      { next: { revalidate: 30*60 } }
      );
    const data = await response.json();
    return data
  } catch (error) {
    console.error(error, "hello error");
  }
};

export default getStrapiData;
