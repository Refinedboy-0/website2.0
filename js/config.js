/**
 * config.js — SITE-WIDE SETTINGS
 * ------------------------------------------------------------
 * This is the only file you should need to touch to rebrand the
 * site: name, tagline, social links and legal copy all live here.
 * Nothing in this file references specific products or categories.
 */

const siteConfig = {
  brandName: "refinedboy",
  brandInitial: "r",
  tagline: "A refined edit of things worth owning.",
  metaDescription:
    "refinedboy is an independent, curated selection of skincare, body care, hair care and beauty essentials.",

  nav: [
    { label: "Home", href: "#home" },
    { label: "Shop", href: "#shop" },
    { label: "Categories", href: "#categories" },
    { label: "Featured", href: "#featured" },
    { label: "About", href: "#about" },
  ],

  hero: {
    eyebrow: "An independent selection",
    heading: "The best skin care products, we have everything you need.",
    subheading:
      "Explore a considered shortlist of skincare, body care, hair care and beauty essentials for your everyday routine.",
    ctaLabel: "Explore the selection",
    ctaHref: "#shop",
  },

  about: {
    eyebrow: "Why refinedboy",
    heading: "An honest second opinion, before you buy.",
    body: "Every listing here has been researched and compared against its closest alternatives. We're not paid to feature a product, and we don't accept sponsorships — when you buy through one of our links, Amazon pays us a small referral fee at no extra cost to you. That's the entire business model.",
    points: [
      {
        title: "Independently chosen",
        text: "Nothing appears here because a brand asked us to include it.",
      },
      {
        title: "Actually compared",
        text: "Each pick is weighed against its category before it earns a place.",
      },
      {
        title: "Kept current",
        text: "Listings are revisited and retired as better options appear.",
      },
    ],
  },

  affiliateDisclosure:
    "Some links on this website are affiliate links. As an Amazon Associate, refinedboy earns from qualifying purchases at no additional cost to you.",

  social: {
    instagram: "https://www.instagram.com/refinedboy_0/",
    tiktok: "https://tiktok.com/",
    pinterest: "https://pinterest.com/",
  },

  footerNav: {
    Shop: [
      { label: "All products", href: "#shop" },
      { label: "Categories", href: "#categories" },
      { label: "Featured", href: "#featured" },
    ],
    Company: [
      { label: "About", href: "#about" },
    ],
    Legal: [
      { label: "Affiliate disclosure", href: "#disclosure" },
    ],
  },
};
