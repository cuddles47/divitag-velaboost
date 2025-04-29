export interface BlogCard {
    imgUrl: string;
    title: string;
    shortText: string;
    url: string;
}

export const BlogCardData: BlogCard[] = [
    {
        imgUrl: "/images/blog/blog1.jpg",
        title: "Getting Started with VelaBoost",
        shortText: "Learn how to get started with our platform in just a few minutes.",
        url: "/blog/getting-started"
    },
    {
        imgUrl: "/images/blog/blog2.jpg",
        title: "Advanced Tips and Tricks",
        shortText: "Discover advanced features that will help you boost productivity.",
        url: "/blog/advanced-tips"
    },
    {
        imgUrl: "/images/blog/blog3.jpg",
        title: "Latest Updates",
        shortText: "Check out the newest features we've added to the platform.",
        url: "/blog/latest-updates"
    }
];
