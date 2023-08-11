import { GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import React from "react";

type PostsProps = {
  posts: any[];
};

const Posts = (props: PostsProps) => {
  const { posts } = props;

  return (
    <div>
      <h1>Posts List</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps<PostsProps> = async (
  context: GetStaticPropsContext,
) => {
  const api = "https://js-post-api.herokuapp.com/api/posts?_page=1";
  const response = await fetch(api);
  const data = (await response.json()).data;
  const mapData = data.map((post: any) => ({
    id: post.id,
    title: post.title,
  }));

  return {
    props: {
      posts: mapData,
    },
  };
};
