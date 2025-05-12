import Image from 'next/image'
import React from 'react'
import { CustomAccordion } from '../common/CustomAccordion'

export interface accordionProps {
    title: string
    description: string
    value?:number
}
const accordionData: accordionProps[] = [
    {
        title: "Why choose this platform?",
        description: "CareLinx is a trusted platform that connects professional caregivers with families in need of high-quality, compassionate care. It offers caregivers flexible job opportunities, competitive pay, and access to clients that match their skills and preferences. With built-in tools for scheduling, communication, and support, CareLinx simplifies the caregiving experience so you can focus on what matters most—providing exceptional care."
    },
    {
        title: "How can I become a Caregiver on Caregiver?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
    },
    {
        title: "How can I become a Caregiver on Caregiver?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
    },
    {
        title: "How can I become a Caregiver on Caregiver?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
    },
    {
        title: "How can I become a Caregiver on Caregiver?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
    },
    {
        title: "How can I become a Caregiver on Caregiver?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
    },

]

const FAQ = () => {
    return (
        <div className='flex bg-[var(--navy)] p-18'>
            <div>

                <div className='relative h-48 w-38 ml-8'>
                    <Image src={'/care-provider-cta.png'} alt="faq" fill className='rounded-t-[3rem] rounded-b-[3rem] object-cover' />
                </div>

                <h1 className='mt-6 text-[var(--yellow)] font-semibold text-4xl w-2/3'>Curious About Caregiving on Our Platform? We’ve Got Answers!</h1>
            </div>

            <div className='w-1/2'>
                {
                    accordionData.map((item, index) => (
                        <CustomAccordion title={item.title} description={item.description} key={index} value={index} />
                    ))
                }
            </div>
        </div>
    )
}



export default FAQ