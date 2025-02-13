'use client';

import { memories } from "@/data";
import { itemTransition, pageTransition } from "@/types/transitions";
import { Box, Flex, Grid, GridItem, Heading, Image, Text, Link as ChakraLink} from "@chakra-ui/react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { motion } from "framer-motion";
import Link from "next/link" ;
import { useParams } from "next/navigation";

export default function MemoryDetail() {
    const urlParams = useParams();

    if(!urlParams.id) {
        throw new Error("No id passed.")
    }

    const id = parseInt(urlParams.id as string);
    const memory = memories.find(mem => mem.id === id);

    if(!memory) {
        throw new Error("No memory found");
    }

    const containerStyle = {
        width: '100%',
        height: '500px',
    }

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAPxBt7hE6uOUAi9Ppqdz6mOrUcfd8K89I",
    });

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <motion.div {...pageTransition}>
                <Flex borderRadius={'xl'} justifyContent={'center'} alignItems='center' w={{base: 'full', lg: '100dvw'}} h={{base: 'full', lg: '100dvh'}} position='relative'>
                    <Grid as='section' 
                        px={{base: 12, md: 24, lg: 48}} 
                        py={{base: 12}} 
                        backgroundColor={'white'} 
                        w={{base: 'full', lg: '95dvw'}} 
                        h={{base: 'full', lg: '95dvh'}}
                        borderRadius={'xl'}
                        templateColumns={'repeat(12, 1fr)'} 
                        templateRows={{base: 'auto', lg: 'repeat(4, 1fr)'}} 
                        gap={{base: 4, md: 2}}
                        position={'relative'}>
                        <GridItem colStart={1} colSpan={12} rowStart={{base: 1, lg: 2}}>
                            <motion.div {...itemTransition} transition={{...itemTransition.transition, delay: 0.2}}>
                                <Flex gap='4' direction={'column'}>
                                    <Heading as='h1' fontSize={{base: '2xl', md: '5xl'}} color='brand.text' fontFamily={'kugile'}>{memory?.title.toUpperCase()}</Heading>
                                    <ChakraLink href='/memory' as={Link} _hover={{
                                        textDecoration: 'underline',
                                        textDecorationColor: 'brand.subtext',
                                        fontWeight: 'semibold'
                                    }}>Terug naar de herinneringen</ChakraLink>
                                </Flex>
                                <Image src="/svg/flower_1.svg" position={'absolute'} right={{base: 0, lg: '20%'}} top={{base: 0, lg: '10%'}}/>
                            </motion.div>
                        </GridItem>
                        <GridItem colStart={1} rowStart={{base: 2, lg: 3}} colSpan={{base: 12, lg: 5}} w={{base: '80%'}}>
                            <motion.div {...itemTransition} transition={{...itemTransition.transition, delay: 0.4}}>
                                <Image src={memory?.imageSrc} borderRadius={'xl'}/>
                            </motion.div>
                        </GridItem>
                        <GridItem colStart={{base: 1, lg: 6}} rowStart={3} colSpan={{base: 12, lg: 6}}>
                            <motion.div {...itemTransition} transition={{...itemTransition.transition, delay: 0.6}} style={{
                                height: '100%'
                            }}>
                                <Flex direction='column' gap='4' h='full' justifyContent={'center'}>
                                    <Text fontSize={{base: 'lg', md: 'xl', lg: '2xl'}} fontFamily={'kulim park'} fontStyle='normal'>{memory?.description}</Text>
                                    <Box>
                                        <Heading as='h2' fontSize={'2xl'} color='brand.text' fontFamily={'kulim park'} fontWeight={'bold'}>Dit was hier!</Heading>
                                        <GoogleMap
                                            mapContainerStyle={containerStyle}
                                            center={{ lat: memory.location.lat, lng: memory.location.long }}
                                            zoom={15}
                                        >
                                            <Marker position={{ lat: memory.location.lat, lng: memory.location.long }} />
                                        </GoogleMap>
                                    </Box>
                                </Flex>
                            </motion.div>
                        </GridItem>
                    </Grid>
                    <Image src="/svg/flower_2.svg" left='0' top='25%' position='absolute' zIndex={'1'} display={{base: 'none', md: 'block'}}/>
                </Flex>
            </motion.div>
        </>
    )
}