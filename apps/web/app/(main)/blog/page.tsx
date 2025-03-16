import Slicer from "@/components/layout/Slicer";
import Wrapper from "@/components/layout/Wrapper";
import BlogCard from "@/components/pages/blog/blog-card";
import { getAllBlogPosts } from "./_actions/actions";

export default async function Page() {
  const blogs = await getAllBlogPosts();

  return (
    <Slicer>
      <Wrapper className="space-y-2 text-center">
        <h1 className="glowing mx-auto text-4xl font-medium md:w-3/4 md:text-6xl">
          Amplify Your Understanding and Tune In to Our Tech{" "}
          <span className="linear text-3xl italic md:text-6xl">Wave Blog</span>
        </h1>
        <p className="text-sm dark:text-white/50 text-black/50 md:text-lg">
          Ride the crest of technological innovation with my Tech Wave Blog.
          Here, I decode the latest breakthroughs, demystify complex concepts,
          and forecast the digital tsunamis that will reshape our world.
        </p>
      </Wrapper>
      <hr className="border-white/5" />
      <Wrapper className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </Wrapper>
    </Slicer>
  );
}
