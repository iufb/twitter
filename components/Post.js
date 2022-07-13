import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "@firebase/firestore";
import {
  ChartBarIcon,
  ChatIcon, CheckIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
} from "@heroicons/react/solid";
import {signOut, useSession} from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { deleteState, postIdState } from "../atoms/modalAtom";
import { db } from "../firebase";
import Link from "next/link";
import Image from "next/image";
function Post({ id, post, postPage }) {
  const { data: session } = useSession();
  const [postId, setPostId] = useRecoilState(postIdState);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [deletePost, setDeletePost] = useRecoilState(deleteState);
  const router = useRouter();
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );
  useEffect(
    () =>
      setLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );
  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
  };

  return (
    <>
      <div
        className="p-3 flex cursor-pointer border-b border-gray-700"
        onClick={() => router.push(`/${id}`)}
      >
        {!postPage && (
          <img
            src={post?.userImg}
            alt="userImg"
            className="h-11 w-11 rounded-full mr-4"
          />
        )}
        <div className="flex flex-col space-y-2 w-full">
          <div className={`flex ${!postPage && "justify-between"}`}>
            {postPage && (
              <img
                src={post?.userImg}
                alt="userImg"
                className="h-11 w-11 rounded-full mr-4"
              />
            )}
            <div className="text-[#6e767d]">
              <div className="inline-block group ">
                <h4 className={`username ${!postPage && "inline-block"}`}>
                  {post?.username}
                </h4>
                <span
                  className={`text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}
                >
                  @{post?.tag}
                </span>
              </div>{" "}
              ·{" "}
              <span className="hover:underline text-sm sm:text-[15px]">
                <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
              </span>
              {!postPage && (
                <p className="text-[#d9d9d9]  text-[15px] sm:text-base mt-0.5">
                  {post?.text}
                </p>
              )}
            </div>
            <div className="icon group flex-shrink-0 ml-auto">
              <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
            </div>
          </div>
          {postPage && (
            <p className="text-[#d9d9d9]  text-[15px] sm:text-base mt-0.5">
              {post?.text}
            </p>
          )}
          <img
            src={post?.image}
            alt=""
            className="rounded-2xl max-h-[700px] object-cover mr-2"
          />
          <div
            className={`text-[#6e767d] flex justify-between w-10/12 ${
              postPage && "mx-auto"
            }`}
          >
            <Link href={`/${id}`}>
              <div
                  className="flex items-center space-x-1 group"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPostId(id);

                    // router.push(`/${id}`);
                  }}
              >
                <div className="icon group-hover:text-[#1d9bf0] ">
                  <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
                </div>
                {comments.length > 0 && (
                    <span className="group-hover:text-[#1d9bf0] text-sm">
                  {comments.length}
                </span>
                )}
              </div>
            </Link>

            {session.user.uid === post?.id ? (
              <div
                className="flex items-center space-x-1 group"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeletePost(true);
                  setPostId(id)

                }}
              >
                <div className="icon group-hover:bg-red-600/10">
                  <TrashIcon className="h-5 group-hover:text-red-600" />
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-1 group">
                <div className="icon group-hover:bg-green-500/10">
                  <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
                </div>
              </div>

            )}
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                likePost();
              }}
            >
              <div className="icon group-hover:bg-pink-600/10">
                {liked ? (
                  <HeartIconFilled className="h-5 text-pink-600" />
                ) : (
                  <HeartIcon className="h-5 group-hover:text-pink-600" />
                )}
              </div>

              {likes.length > 0 && (
                <span
                  className={`group-hover:text-pink-600 text-sm ${
                    likes && "text-pink-600"
                  }`}
                >
                  {likes.length}
                </span>
              )}
            </div>
            <div className="icon group">
              <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            <div className="icon group">
              <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Post;
