import Image from 'next/image'
import React from 'react'

const TestimonialCareProvider = () => {
    return (
        <div className='flex items-center justify-between p-18'>

            <div>
                <Testimonial />
            </div>

            <div>
                <h1 className='font-semibold text-4xl text-[var(--navy)]'>Caregiver’s Testimonial</h1>

                <div className='flex items-center gap-x-4 mt-5'>
                    <div className='relative w-48 h-64'>
                        <Image src={'/care-provider-testimonial-1.png'} alt='testimonial' fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div className='relative w-48 h-64'>
                        <Image src={'/care-provider-testimonial-2.png'} alt='testimonial' fill style={{ objectFit: 'cover' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}


export const Testimonial = () => {
    return (
        <div className='w-1/2'>
            <div>
                <h1 className='text-[5rem] font-bold text-[var(--navy)] tracking-wider'>❛❛</h1>
            </div>
            <div>
                <p className='text-gray-600'>I’ve been working as a caregiver for over 5 years, but this platform gave me better visibility and more consistent opportunities. Plus, the in-app communication and timely payments make the whole experience smooth.</p>
                <p className='mt-3 font-bold text-lg text-[var(--navy)]'>David R., Vancouver, BC</p>
            </div>
        </div>
    )
}

export default TestimonialCareProvider