import Image from "next/image";
import { FC } from "react";
import { Post } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <li>
      <Link href={post.url} className="flex border-2 border-black w-fit p-2">
        <div>
          <Image
            src={`/images/${post.thumbnail}`}
            alt={post.title}
            width={128}
            height={128}
          />
        </div>
        <div className="ml-2 flex flex-col justify-center gap-4">
          <h2>{post.title}</h2>
          <time dateTime={post.date}>
            {format(parseISO(post.date), "yyyy년 M월 d일")}
          </time>
          <div>{post.description}</div>
        </div>
      </Link>
    </li>
  );
};

export default PostCard;
