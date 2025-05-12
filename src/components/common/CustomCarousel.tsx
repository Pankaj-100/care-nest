
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
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

    )
}

export default CustomCarousel