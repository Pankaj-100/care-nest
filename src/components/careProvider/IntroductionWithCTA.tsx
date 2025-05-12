import React from 'react'
import { YellowButton } from '../common/CustomButton'
import Image from 'next/image'

const IntroductionWithCTA = () => {
    return (
        <div className='flex relative bg-[var(--whiteSmoke)] h-[450px] p-16 '>

            <div className=' text-white w-1/2'>
                <div>
                    <h1 className='font-semibold text-4xl leading-11 text-[var(--navy)] w-2/3'>Looking to Provide Care for the Elderly?</h1>
                </div>
                <div className='my-5 w-3/4'>
                    <p className='text-[var(--navy)]'>If you&apos;re searching for a trusted caregiving platform where you can offer compassionate care to seniors, you& re in the right place. Join a community dedicated to making a real difference in the lives of elderly individuals. Whether you&apos;re an experienced caregiver or just starting out, this is the perfect platform to connect, support, and grow your caregiving journey.</p>
                </div>

                <div>
                    <YellowButton className="px-10">
                        Register now
                    </YellowButton>
                </div>

            </div>  

            <div className='relative w-1/2 h-1/2'>
                <div className='absolute right-20 top-10 w-84 h-78 bg-[var(--navy)] rounded-tl-[6rem] rounded-br-[6rem]'></div>
                <div className='absolute right-28 w-84 h-80 z-10'>
                    <Image src={'/care-provider-cta.png'} alt="care provider CTA" fill style={{ objectFit: 'cover' }} className='rounded-tl-[6rem] rounded-br-[6rem]' />
                </div>
            </div>
        </div>
    )
}

export default IntroductionWithCTA