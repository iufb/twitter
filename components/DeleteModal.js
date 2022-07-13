import React, {Fragment} from 'react';
import { Dialog, Transition } from "@headlessui/react";
import {useRecoilState} from "recoil";
import {deleteState, postIdState} from "../atoms/modalAtom";
import {deleteDoc, doc} from "@firebase/firestore";
import {db} from "../firebase";

const DeleteModal = () => {
    const  [ deleteSm, setDelete] = useRecoilState(deleteState)
    const  [postId] = useRecoilState(postIdState)


    return (
        <Transition.Root show={deleteSm} as={Fragment}>
            <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={setDelete}>
                <div className="flex  items-center justify-center h-full overflow">
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
                        <div className=' w-[320px] h-[320px] bg-black rounded-2xl opacity-90'>
                            <div className='ml-[30px] mt-[30px] w-[260px]'>
                                <div className='text-white  '>
                                    <h3 className='text-xl font-bold flex mb-[5px]'>Delete Tweet?</h3>
                                    <p className='flex text-start  opacity-50'>This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Twitter search results. </p>
                                </div>
                                <div className='text-white flex flex-col space-y-[15px] w-full mt-[30px] '>
                                    <button onClick={()=>{
                                        deleteDoc(doc(db, 'posts', postId))
                                        setDelete(false)
                                    }} className='bg-[#f00c19] outline-none rounded-full w-full h-[40px] font-bold hover:bg-[#DC1E29] hover:cursor-pointer'>Delete</button>
                                    <button onClick={()=> setDelete(false)} className='outline-none rounded-full w-full h-[40px] font-bold border border-gray-700'>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default DeleteModal;