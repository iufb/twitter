import Image from 'next/image'
import { HomeIcon } from '@heroicons/react/solid'
import { useSession} from 'next-auth/react'
import {
    HashtagIcon,
    BellIcon,
    InboxIcon,
    BookmarkIcon,
    ClipboardListIcon,
    UserIcon,
    DotsCircleHorizontalIcon,
    DotsHorizontalIcon,
} from '@heroicons/react/outline'
import SidebarLink from './SidebarLink.js'
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {modalState, quitState} from "../atoms/modalAtom";
import QuitModal from "./QuitModal";
import React from "react";
import Link from "next/link";
function Sidebar({ml}) {
  const { data: session } = useSession()
    const [isOpen, setIsOpen] = useRecoilState(modalState)
    const [quit, setQuit] = useRecoilState(quitState)
    const router = useRouter()
  return (
    <div className={`sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full xl:ml-${ml}`}>
      <Link href='/'>
          <a className="flex items-center  justify-center  w-14 h-14 hoverAnimation p-0 xl:ml-24">
              <Image src="https://rb.gy/ogau5a" width={30} height={30} alt='img'/>
          </a>
      </Link>

      0
      <div className="gap-y-2.5 mt-4 mb-2.5 xl:ml-24">
          <Link href='/'>
              <a>
                  <SidebarLink text={'Home'} Icon={HomeIcon} active onClick={()=>router.push('/')}  />
              </a>
          </Link>

        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>
      <button className="w-[50px] h-[50px]  text-[0px] xl:inline xl:ml-auto bg-[#1d9bf0] text-white rounded-full xl:w-56 xl:h-[52px] font-bold xl:text-lg shadow-md hover:bg-[#1a8cd8]" onClick={()=>setIsOpen(true)}>
          <img src='../feather.png' alt='feather' className='w-[30px] h-[30px] mx-auto xl:hidden'/>
          Tweet
      </button>
      <div
        className=" mt-[100px] text-[#d9d9d9] flex  xl:mt-[260px] items-center justify-center hoverAnimation xl:ml-auto  xl:-mr-5 mt-auto xl:min-w-[254px] xl:max-w-[254px] "
        onClick={()=>setQuit(true)}
      >
        <Image
          src={session.user.image}
          alt='img'
          width={40}
          height={40}
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />

        <div className="hidden xl:inline leading-5 xl:ml-[10px] ">
          <h4 className="font-bold">{session.user.name}</h4>
          <p className="text-[#6e767d ]">@{session.user.tag} </p>
        </div>
        <DotsHorizontalIcon className="h-5 hidden xl:inline ml-20 flex-1" />
      </div>
        {quit && <QuitModal/>}
    </div>
  )
}

export default Sidebar
