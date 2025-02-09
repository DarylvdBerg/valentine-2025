'use client';

import { useFlipStore } from "@/stores/flipStore";
import { Memory } from "@/types"
import { Card, Flex, Image, Link as ChakraLink, Text } from "@chakra-ui/react"
import { motion } from "framer-motion";
import Link from "next/link";

export interface MemoryCardProps {
    memory: Memory
}

export default function MemoryCard({memory}: MemoryCardProps) {
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
                                <Card.Root borderRadius={'xl'}>
                                    <Image src={memory?.imageSrc} borderTopRadius={'xl'} w={'500px'} height={'500px'}/>
                                    <Card.Body>
                                        <Card.Title color='brand.primary'>{memory?.title}</Card.Title>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Text fontWeight={400} fontStyle={'italic'} color='brand.primary'>{memory?.location?.area}</Text>
                                    </Card.Footer>
                                </Card.Root>
                            </ChakraLink>
                        ) : (
                            <Flex backgroundColor={'brand.accent'} w={'full'} h='640px' justifyContent={'center'} alignItems={'center'} cursor={'button'} borderRadius={'xl'}>
                                <Text fontSize={'4xl'} color='brand.primary'>Flip</Text>
                            </Flex>
                        )}
                </motion.div>
            </motion.div>
        </>
    )
}