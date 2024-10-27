const getCleanHomeData = (data) => {

    const actualData = data?.data?.attributes;
    const aboutSectionData = {
      ...actualData.aboutSection,
      image1: actualData.aboutSection.image1.data.attributes.url,
      image2: actualData.aboutSection.image2.data.attributes.url,
      image3: actualData.aboutSection.image3.data.attributes.url,
    };
    const heroCardData = actualData.heroSection;
  const storiesData = actualData.stories;
  //asdfasdf
  return { heroCardData, storiesData, aboutSectionData };
};

export default getCleanHomeData;
