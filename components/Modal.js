import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
// import {
//   onSnapshot,
//   doc,
//   addDoc,
//   collection,
//   serverTimestamp,
// } from "@firebase/firestore";
// import { db } from "../firebase";
import { useSession } from "next-auth/react";
import { XIcon } from "@heroicons/react/outline";
import Input from "./Input";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";


function Modal() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  // const [postId, setPostId] = useRecoilState(postIdState);
  // const [post, setPost] = useState();

  // const router = useRouter();

  // useEffect(
  //   () =>
  //     onSnapshot(doc(db, "posts", postId), (snapshot) => {
  //       setPost(snapshot.data());
  //     }),
  //   [db]
  // );



  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={setIsOpen}>
        <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom  rounded-2xl min-h-[285px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full ">
             <div className='bg-black rounded-2xl overflow-hidden'>
               <div className="xl:w-full  h-14 ">
                 <div
                     className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-4 left-3 cursor-pointer"
                     onClick={() => setIsOpen(false)}
                 >
                   <XIcon className="text-white h-6" />
                 </div>
               </div>
               <Input rows={5} nameBtn={'Tweet'} />
             </div>
              <div className='h-[6
              50px]'>

              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
