import React from 'react';
import Image from "next/image";

const Loading = () => {
    return (
        <div className='bg-black w-full h-[100vh]'>
            <div>
                <Image
                src={'https://rb.gy/ogau5a'}
                width={200}
                height={200}

                />
            </div>
        </div>
    );
};

export default Loading;