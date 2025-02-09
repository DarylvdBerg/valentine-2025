'use client';

import { memories } from "@/data";
import { pageTransition } from "@/types/transitions";
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
                <Grid as='section' px={{base: 12, md: 24, lg: 48}} py={{base: 12}} templateColumns={'repeat(12, 1fr)'} gap={{base: 4, md: 2}}>
                    <GridItem colStart={1} colSpan={12} mb={{base: 4, md: 12}}>
                        <Flex justifyContent={'space-between'} alignItems={{base: 'start', md: 'center'}} direction={{base: 'column', md: 'row'}}>
                            <Heading as='h1' fontSize={{base: '2xl', md: '5xl'}} color='brand.secondary'>{memory?.title}</Heading>
                            <ChakraLink href='/memory' as={Link} _hover={{
                                textDecoration: 'underline',
                                textDecorationColor: 'brand.accent'
                            }}>Terug naar de herinneringen</ChakraLink>
                        </Flex>
                    </GridItem>
                    <GridItem colStart={1} colSpan={{base: 12, md: 5}} w='80%'>
                        <Image src={memory?.imageSrc} borderRadius={'xl'}/>
                    </GridItem>
                    <GridItem colStart={{base: 1, md: 6}} colSpan={{base: 12, md: 6}}>
                        <Flex direction='column' gap='4'>
                            <Text fontSize={{base: 'lg', md: 'xl', lg: '2xl'}}>{memory?.description}</Text>
                            <Box>
                                <Heading as='h2' fontSize={'2xl'} color='brand.secondary'>Dit was hier!</Heading>
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={{ lat: memory.location.lat, lng: memory.location.long }}
                                    zoom={15}
                                >
                                    <Marker position={{ lat: memory.location.lat, lng: memory.location.long }} />
                                </GoogleMap>
                            </Box>
                        </Flex>
                    </GridItem>
                </Grid>
            </motion.div>
        </>
    )
}