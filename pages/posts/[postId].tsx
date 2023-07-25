import { useRouter } from "next/router";
import React from "react";

type Props = {};

const PostDetail = (props: Props) => {
  const router = useRouter();

  return (
    <div>
      <h1>Post Detail</h1>
      <p>Query: {JSON.stringify(router.query)}</p>
    </div>
  );
};

export default PostDetail;
