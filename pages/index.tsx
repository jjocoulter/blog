import Head from "next/head";
import Image from "next/image";
import styles from "@styles/Home.module.css";
import Loader from "@components/Loader";
import PostFeed from "@components/PostFeed";
import { useState } from "react";
import { firestore, postToJson, fromMillis } from "@lib/firebase";

// Max posts to query per page
const LIMIT = 1;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJson);

  return {
    props: { posts },
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);
    const newPosts = (await query.get()).docs.map((post) => post.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <PostFeed posts={posts} admin={false} />

      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more </button>
      )}

      <Loader show={loading} />

      {postsEnd && "You have reached the end."}
    </main>
  );
}
