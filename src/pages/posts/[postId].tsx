import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";

type Props = any;

const PostDetail = (props: Props) => {
  const { title } = props;

  if (!title) return null;

  return (
    <div>
      <h1>Post Detail</h1>
      <p>{title}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const api = "https://js-post-api.herokuapp.com/api/posts?_page=1";

  const response = await fetch(api);
  const data = await response.json();

  const mapData = data.data.map((post: any) => ({
    params: {
      postId: post.id,
    },
  }));

  return {
    paths: mapData,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<any> = async (context: GetStaticPropsContext) => {
  const postId = context.params?.postId;

  if (!postId) return { notFound: true };

  const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
  const data = await response.json();

  return {
    props: {
      title: data.title,
    },
  };
};

export default PostDetail;
