import { allPosts } from "@/.contentlayer/generated";
import { format, parseISO } from "date-fns";
import { NextPage } from "next";
import Image from "next/image";

interface PostLayoutProps {
  params: { slug: string };
}

export const generateStaticParams = async () =>
  allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));

const PostLayout: NextPage<PostLayoutProps> = ({ params }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  return (
    <article>
      <div className="flex justify-center">
        <Image
          src={`/images/${post.thumbnail}`}
          alt={post.title}
          width={512}
          height={512}
        />
      </div>
      <div>
        <div className="text-center">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <div className="mt-4">
            <time datatype={post.date}>
              {format(parseISO(post.date), "yyyy년 M월 d일")}
            </time>
          </div>
        </div>
        <div
          className="max-w-screen-md mx-auto mt-8 text-lg break-words [&>ol>li]:mt-4 [&>ol>li>p>strong]:text-2xl [&>h3]:mt-8 [&>h3]:text-xl [&>h3]:font-semibold [&>h3:last-child]:pb-12"
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />
      </div>
    </article>
  );
};

export default PostLayout;
