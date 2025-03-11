import { GradientOptions } from "./utils";

interface ImageOptions {
  url: string;
  coverage: string; // Consider using an enum if coverage has specific values
}

interface BackgroundOptions {
  image: ImageOptions;
  color: GradientOptions;
}

export interface CoverAreaOptions {
  image: ImageOptions;
  color: GradientOptions;
}

export interface AvatarOptions {
  type: "round" | "square" | string; // Consider an enum if there are limited types
  image: ImageOptions;
}

interface BioOptions {
  title: string;
  description: string;
}

export interface LinkData {
  url: string;
  name: string;
  description: string;
}

export interface LinkThemeOptions {
  borderRadius: string;
  background: BackgroundOptions;
  foreground: {
    color: GradientOptions;
  };
}

interface LinksOptions {
  style: "rounded" | "square" | string; // Consider an enum
  theme: LinkThemeOptions;
  data: LinkData[];
}

export interface PageLinkOptions {
  background: BackgroundOptions;
  coverArea: CoverAreaOptions;
  avatar: AvatarOptions;
  bio: BioOptions;
  links: LinksOptions;
}

export const defaultPageLinkOptions: PageLinkOptions = {
  background: {
    image: {
      url: "",
      coverage: "",
    },
    color: {
      from: "orange",
      rotation: 0,
      type: "linear",
    },
  },
  coverArea: {
    image: {
      url: "",
      coverage: "",
    },
    color: {
      from: "coral",
      rotation: 0,
      type: "linear",
    },
  },
  avatar: {
    type: "round",
    image: {
      url: "https://www.w3schools.com/howto/img_avatar.png",
      coverage: "",
    },
  },
  bio: {
    title: "Link Page Title",
    description: "text",
  },
  links: {
    style: "rounded",
    theme: {
      borderRadius: "16px",
      background: {
        image: {
          url: "",
          coverage: "",
        },
        color: {
          from: "red",
          rotation: 0,
          type: "linear",
        },
      },
      foreground: {
        color: {
          from: "blue",
          rotation: 0,
          type: "linear",
        },
      },
    },
    data: [
      {
        url: "https://www.google.com",
        name: "Test Link",
        description: "This is some sort of link description",
      },
    ],
  },
};
