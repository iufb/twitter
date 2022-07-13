import React, {Fragment} from 'react';
import { Dialog, Transition } from "@headlessui/react";
import {useRecoilState} from "recoil";
import {quitState} from "../atoms/modalAtom";
import Image from "next/image";
import {CheckIcon} from "@heroicons/react/outline";
import {useSession, signOut} from "next-auth/react";
const QuitModal = () => {
    const { data: session } = useSession()
    const [quit, setQuit] = useRecoilState(quitState)
    return (
        <div>
            <Transition.Root show={quit} as={Fragment}>
                <Dialog as="div" className="fixed z-50 top-[500px] xl:top-[680px] xl:left-[310px] pt-8" onClose={setQuit}>
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
                            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-0 transition-opacity" />
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
                            <div className='shadow shadow-white xl:h-[130px] xl:w-[300px] bg-black rounded-2xl overflow-hidden opacity-90 '

                            >
                                <div>
                                    <div
                                        className="text-[#d9d9d9] flex items-center justify-center xl:ml-auto  xl:-mr-5 mt-auto border-b border-gray-700 py-4 pl-[15px] px-[20px]"

                                    >
                                        <Image
                                            src={session.user.image}
                                            alt='img'
                                            width={44}
                                            height={44}
                                            className="h-10 w-10 rounded-full xl:mr-2.5"
                                        />

                                        <div className=" xl:inline leading-5 xl:ml-[10px]  ">
                                            <h4 className="font-bold">{session.user.name}</h4>
                                            <p className="text-[#6e767d ]">@{session.user.tag} </p>
                                        </div>
                                        <CheckIcon className="h-5  xl:inline ml-20 flex-1 text-[#1d9bf0]" />
                                    </div>
                                </div>
                                <div className='trending justify-center ' onClick={signOut}>
                                    <h4 className='text-white'>Log out @{session.user.tag}</h4>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
};

export default QuitModal;