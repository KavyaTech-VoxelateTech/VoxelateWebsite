import Container from "@/commoncomponents/Container";
import getStrapiData from "@/utils/getStrapiData";
import RichTextRenderer from "@/commoncomponents/RichTextRenderer";
import qs from "qs";

const AboutPage = async () => {
  try {
    const aboutResponse = await getStrapiData("/api/about");
    if (!aboutResponse) {
      console.error("Failed to fetch about data");
    }

    const data = aboutResponse.data;

    const query = qs.stringify({
      populate: {
        aboutHeroImage: { populate: true },
      },
    });

    const heroResponse = await getStrapiData("/api/hero-image", query);
    if (!heroResponse) {
      console.error("Failed to fetch hero image data");
      return <div>Error loading hero image</div>;
    }

    const heroImage = heroResponse.data?.attributes?.aboutHeroImage?.data?.attributes?.url;

    return (
      <div>
        <div>
          {heroImage ? (
            <img
              className="w-full h-[30vh] sm:h-[50vh] lg:h-[60vh]"
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${heroImage}`}
              alt="heroImage"
            />
          ) : (
            <div>No hero image available</div>
          )}
        </div>
        <Container className={"max-w-[1080px] mx-auto py-10"}>
          {data?.attributes.aboutContent ? (
            <RichTextRenderer content={data.attributes.aboutContent} />
          ) : (
            <div>No about content available</div>
          )}
        </Container>
      </div>
    );
  } catch (error) {
    console.error("Error in AboutPage:", error);
    return <div>Error loading page content</div>;
  }
};

export default AboutPage;
