import React, {useEffect, useState} from "react";
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon, HeartIcon as HeartIconFilled,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/solid";
import Moment from "react-moment";
import Image from "next/image";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {collection, deleteDoc, doc, onSnapshot, setDoc} from "@firebase/firestore";
import {db} from "../firebase";
import {TrashIcon} from "@heroicons/react/outline";

const Comment = ({ comment, idComment }) => {
  const { data: session} = useSession()
  const router = useRouter();
  const { id } = router.query;
const [liked, setLiked] = useState()
const  [likes, setLikes] = useState([])
  useEffect(()=> onSnapshot(collection(db, 'posts', id, 'comments', idComment , 'likes'), (snapshot)=> setLikes(snapshot.docs)), [db, id])
  useEffect(()=>setLiked(likes.findIndex((like)=> like.id === session?.user?.uid) !== -1), [likes])
const likeComment = async ()=>{
 if(liked){
   await deleteDoc(doc(db,'posts', id, 'comments', idComment,'likes', session.user.uid))
 }else{
   await setDoc(doc(db, 'posts', id, 'comments', idComment,'likes',  session.user.uid),{
     username: session.user.name,
   })
 }
}
  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-700">
      <div className="mr-4">
        <Image
          src={comment?.userImg}
          width={44}
          height={44}
          alt="img"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between">
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4 className="font-bold text-[#d9d9d9] text-[15px] sm:text-base inline-block group-hover:underline">
                {comment?.username}
              </h4>
              <span className="ml-1.5 text-sm sm:text-[15px]">
                @{comment?.tag}{" "}
              </span>
            </div>{" "}
            ·{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
            <p className="text-[#d9d9d9] mt-0.5 max-w-lg  text-[15px] sm:text-base">
              {comment?.comment}
            </p>
            <img
                src={comment?.image}
                alt=""
                className="rounded-2xl max-h-[700px] object-cover mr-2 mt-[10px]"
            />
          </div>
          <div className="icon group flex-shrink-0">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>

        <div className={`text-[#6e767d] flex justify-around w-10/12`}>
          {session.user.name === comment.username  && (
              <div className='flex items-center space-x-1 group'
                   onClick={()=>deleteDoc(doc(db, 'posts', id, 'comments', idComment))}
              >
                <div className='icon group-hover:bg-red-600/10'>
                  <TrashIcon className='h-5 group:text-red-600'/>
                </div>
              </div>
          )}
          <div className='flex items-center space-x-1 group'
               onClick={()=>
                 likeComment()
          }
          >
            <div className='icon group-hover:bg-pink-600/10' >
              {liked ?(
                  <HeartIconFilled className='h-5 text-pink-600'/>
              ) : (
                  <HeartIcon className='h-5 group-hover:text-pink-600'/>
              )}
            </div>

            {likes.length> 0 && (
                <span
                    className={`group-hover:text-pink-600 text-sm ${
                        likes && 'text-pink-600'
                    }`}
                >
                    {likes.length}
                  </span>
            )}
          </div>
        </div>
    </div>
    </div>
  );
};

export default Comment
