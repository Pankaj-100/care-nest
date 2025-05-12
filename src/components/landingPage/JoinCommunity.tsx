import React from 'react'
import { YellowButton } from '../common/CustomButton'
import Image from 'next/image'

const JoinCommunity = () => {
    return (
        <div className='px-28 py-18 bg-[var(--navy)] h-[80vh] flex justify-between'>

            <div className='w-2/5 relative'>
                <h1 className='text-[var(--yellow)] font-bold text-4xl'>Curious About Care giving on Our Platform? Join Our Trusted Community</h1>

                <p className='text-gray-300 my-4'>Become part of a growing community of compassionate caregivers. Offer your skills, earn on your terms, and make a meaningful difference in the lives of elderly individuals and their families every day.</p>

                <YellowButton>
                    Join our cool community as a Caregiver
                </YellowButton>


                <div className='w-24 h-9 absolute bottom-17 z-10 right-20'>
                    <Image src="/dashed arrow.png" alt="arrow image" fill />
                </div>
            </div>


            <div className='flex flex-col gap-x-5 items-center justify-center '>

                <div className='flex gap-3'>
                    <div>
                        <div className='relative w-8 h-8 -ml-12'>
                            <Image src={'/yellow 3 line.png'} alt="community" fill />
                        </div>
                        <div className='relative w-48 h-48 rounded-t-2xl rounded-l-2xl'>
                            <Image src={'/community-img-1.png'} alt="community" fill className='rounded-t-2xl rounded-l-2xl object-cover' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='relative w-18 h-18 rounded-t-2xl rounded-r-2xl'>
                            <Image src={'/yellow shape.png'} alt="community" fill className='rounded-t-2xl rounded-r-2xl' />
                        </div>
                        <div className='relative w-34 h-35 rounded-t-2xl rounded-r-2xl'>
                            <Image src={'/community-img-1.png'} alt="community" fill className='rounded-t-2xl rounded-r-2xl object-cover' />
                        </div>
                    </div>

                </div>

                    <div className='flex mt-3 gap-3'>
                        <div className='relative w-35 h-35 rounded-l-2xl rounded-b-2xl ml-2'>
                            <Image src={'/community-img-3.png'} alt="community" fill className='rounded-l-2xl rounded-b-2xl object-cover' />
                        </div>
                        <div className='relative w-24 h-24 rounded-r-2xl rounded-b-2xl'>
                            <Image src={'/community-img-3.png'} alt="community" fill className='rounded-r-2xl rounded-b-2xl object-cover' />
                        </div>
                    </div>

            </div>
        </div>
    )
}

export default JoinCommunity