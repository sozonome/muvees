/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "muvees",
  titleTemplate: "%s | muvees",
  defaultTitle: "muvees",
  description: "See your favorite movies",
  canonical: "https://muvees.sznm.dev",
  openGraph: {
    url: "https://muvees.sznm.dev",
    title: "muvees",
    description: "See your favorite movies",
    images: [
      {
        url: "https://og-image.sznm.dev/**muvees**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250",
        alt: "muvees.sznm.dev og-image",
      },
    ],
    site_name: "muvees",
  },
  twitter: {
    handle: "@sozonome",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
