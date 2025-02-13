'use client';

import { useFlipStore } from "@/stores/flipStore";
import { Memory } from "@/types"
import { Card, Flex, Image, Link as ChakraLink, Text, chakra } from "@chakra-ui/react"
import { motion } from "framer-motion";
import Link from "next/link";

export interface MemoryCardProps {
    memory: Memory
    showHeart: boolean
}

export default function MemoryCard({memory, showHeart = false}: MemoryCardProps) {
    const {flippedStates, setFlipped } = useFlipStore();
    const flipped = flippedStates[memory.id] || false
    return (
        <>        
            <motion.div  style={{perspective: 1000 }}>
                <motion.div animate={{rotateY: flipped ? 180 : 0}} transition={{duration: 0.6}} onClick={() => setFlipped(memory.id.toString(), true)} style={{
                transformStyle: 'preserve-3d'
                    }}>
                        {flipped ? (
                            <ChakraLink as={Link} href={`/memory/${memory?.id}`} textDecoration={'none'} style={{
                                transform: 'rotateY(180deg)'
                            }}>
                                <Card.Root borderRadius={'xl'} boxShadow={'0 6px 6px hsl(0deg 0% 0% / 0.3)'} justifyContent={'center' } alignItems={'center'}>
                                    <Image src={memory?.imageSrc} borderTopRadius={'xl'} w={'500px'} height={'500px'}/>
                                    <Card.Body>
                                        <Card.Title color='brand.text' fontWeight={'bold'} fontFamily={'Calibri'} fontSize={{base: '2xl'}}>{memory?.title.toUpperCase()}</Card.Title>
                                    </Card.Body>
                                    <Card.Footer display={'flex'} alignItems={'center'}>
                                        <Text fontWeight={'semibold'} color='brand.subtext' fontFamily={'Calibri'} fontStyle={'italic'} fontSize={{base: 'lg'}}>{memory?.location?.area.toUpperCase()}</Text>
                                        <chakra.span backgroundImage={'url(/svg/elipses.svg)'} w='5px' h='5px' backgroundRepeat={'no-repeat'}></chakra.span>  
                                        <Text fontWeight={'semibold'} color='brand.subtext' fontFamily={'Calibri'} fontSize={{base: 'lg'}} fontStyle={'italic'}>{memory?.location?.date.toUpperCase()}</Text>
                                    </Card.Footer>
                                </Card.Root>
                            </ChakraLink>
                        ) : (
                            <Flex backgroundColor={'brand.accent'} position={'relative'} w={'full'} h='640px' justifyContent={'center'} alignItems={'center'} cursor={'button'} borderRadius={'xl'} boxShadow={'0 6px 6px hsl(0deg 0% 0% / 0.3)'} gap='2'>
                                {showHeart && (
                                    <Image position={'absolute'} left='48%' top='40%' src="/svg/heart.svg"/>
                                )}
                                <Text fontSize={{base: '2xl', md: 'xl'}} color='brand.text' fontWeight={'bold'} fontFamily={'Calibri'}>CLICK TO FLIP</Text>    
                            </Flex>
                        )}
                </motion.div>
            </motion.div>
        </>
    )
}