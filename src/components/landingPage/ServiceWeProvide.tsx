import Image from 'next/image'
import React from 'react'
import { TransparentButton } from '../common/CustomButton'

const ServiceWeProvide = () => {
    return (
        <div className='h-[95vh] pt-24 bg-[var(--cream)] px-28'>

            <h1 className='font-bold text-5xl text-center mb-8'>Services We Provide</h1>

            <div className='flex itemcenter justify-between'>
                <Services />
                <Services />
                <Services />
                <Services />
            </div>
        </div>
    )
}

const Services = () => {
    return (
        <div className='p-2 w-58'>
            <div className='w-58 h-58 rounded-2xl mb-3 relative'>
                <Image src={'/service1.png'} alt="personal care" fill className='rounded-2xl object-cover' />
            </div>

            <div>
                <h3 className='font-semibold text-lg mb-2'>Personal care</h3>
                <p className='text-sm text-gray-600 mb-3'>Find your professional personal care provider for daily assistance, hygiene, mobility, and compassionate support.</p>
            </div>
            <TransparentButton className='w-full'>
                View more
            </TransparentButton>
        </div>
    )
}

export default ServiceWeProvide