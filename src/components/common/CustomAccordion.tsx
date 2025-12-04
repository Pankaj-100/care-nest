import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export interface accordionProps {
    title: string;
    description: string;
    value?: number;
}

export function CustomAccordion({ title, description, value }: accordionProps) {
    return (
        <Accordion type="single" collapsible className="w-full mb-2">

            <AccordionItem value={`item-${value}`}>
                <AccordionTrigger className="text-white  font-medium hover:no-underline text-lg">{title}</AccordionTrigger>

                <AccordionContent className="text-gray-400 text-lg">
                    {description}
                </AccordionContent>

                <div className="bg-gray-400 h-[0.5px] w-full" />
            </AccordionItem>


        </Accordion>
    )
}
