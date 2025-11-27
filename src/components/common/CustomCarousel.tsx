
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


const CustomCarousel = ({ children }: { children: React.ReactNode }) => {
    return (
        <Carousel>
            <CarouselContent>
                {children}
            </CarouselContent>
                <CarouselPrevious className="flex h-6 w-6 -translate-y-1/2 rounded-full bg-[var(--navy)] text-white shadow-md hover:bg-[var(--yellow)] hover:text-[var(--navy)] top-1/2 -left-4 sm:-left-6" />
                <CarouselNext className="flex h-6 w-6 -translate-y-1/2 rounded-full bg-[var(--navy)] text-white shadow-md hover:bg-[var(--yellow)] hover:text-[var(--navy)] top-1/2 -right-4 sm:-right-6" />
        </Carousel>

    )
}

export default CustomCarousel