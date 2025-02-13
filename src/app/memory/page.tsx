'use client';

import { Image, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { memories } from "@/data";
import { MemoryCard } from "@/components/MemoryCard";
import { Memory } from "@/types";
import { motion } from "framer-motion";
import { cardTransition } from "@/types/transitions";

export default function MemoryOverview() {
    
    return (
        <Flex direction={'column'} py={{base: 12, md: 16}} position='relative'>
            <Image src="/svg/flower_2.svg" position='absolute' left='0' top={'10%'}/>
            <Flex justifyContent={'center'} position='relative'>
                <Heading as='h1' fontSize={{base: '2xl', md: '4xl'}} color='brand.text'>SOME OF THE MEMORIES</Heading>
                <Image src="/svg/flower_1.svg" position={'absolute'} right='20%' top='-100%'/>
            </Flex>
            <Grid templateColumns={'repeat(12, 1fr)'} gap={4} px={{base: 4}} py={{base: 12}}>
            {memories.map((memory: Memory, index: number) => (
                <GridItem colStart={1} colSpan={{base: 12, md: 6, lg: 3}} w='full' key={index}>
                    <motion.div
                        initial="initial"
                        animate="animate"
                        transition={{ ...cardTransition.transition, delay: index * 0.2 }}
                        variants={cardTransition}
                    >              
                        <MemoryCard 
                            memory={memory}
                            showHeart={index % 2 == 0} />
                    </motion.div>
                </GridItem>
            ))}
            </Grid>
      </Flex>
    )
}