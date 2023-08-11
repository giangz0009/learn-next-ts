import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

const DYNAMIC_HEADER = dynamic(() => import("@/components/common/header"), {
  ssr: false,
});

type Props = {};

const About = (props: Props) => {
  const [postsList, setPostsList] = useState<any[]>();

  const router = useRouter();

  let page = router.query?.page;

  // -------------Render val----------------
  const _renderPostsList = useMemo(() => {
    if (!postsList) return;
    return (
      <ul>
        {postsList.map((post: any) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    );
  }, [postsList]);

  // --------------------Effect method---------------------
  useEffect(() => {
    console.log("page query: ", page);

    if (!page) {
      return;
    }

    (async () => {
      const api = `https://js-post-api.herokuapp.com/api/posts?_page=${page}`;
      const response = await fetch(api);
      const data = (await response.json()).data;

      setPostsList(data);
    })();
  }, [page]);

  const handleClickNextPage = () => {
    router.push(
      {
        pathname: "/about",
        query: {
          page: (Number(page) || 0) + 1,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <div>
      <h1>About</h1>
      <button onClick={handleClickNextPage}>next page</button>
      <DYNAMIC_HEADER />
      {_renderPostsList}
    </div>
  );
};

export default About;
