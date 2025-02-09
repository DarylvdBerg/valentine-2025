'use client';

import { introSequence } from "@/data/introSequence";
import { Button, chakra, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useValentineStore } from "@/stores/appStore";
import { useRouter } from "next/navigation";
import { pageTransition } from "@/types/transitions";

export default function Home() {
  const [relationDate, setRelationDate] = useState('');
  const [introText, setIntroText] = useState('');
  const [showError, setShowError] = useState<boolean>(false)
  const router = useRouter();

  const relationCheck = useValentineStore((state: any) => state.relationCheck);
  const hideRelationCheck = useValentineStore((state: any) => state.hideRelationCheck)

  const intro = useValentineStore((state: any) => state.intro)
  const showIntro = useValentineStore((state: any) => state.showIntro);
  const hideIntro = useValentineStore((state: any) => state.hideIntro);

  const submitRelationCheck = () => {
    setShowError(false);
    if(relationDate === '2022-06-24') {
      hideRelationCheck();
      showIntro();
      return
    }
    setShowError(true);
  }

  const dateChangeHandler = (e: any) => {
    setRelationDate(e.target.value)
  }

  const RelationCheck = () => {
    return (
        <Flex alignItems={'center'} h='60dvh' justifyContent={'center'}>
          <Flex direction={'column'} gap='4'>
            <Text fontWeight={'bold'} fontSize={{base: '2xl', md: '4xl'}} color='brand.secondary'>Vul hier de datum is van onze relatie</Text>
            <Input onChange={dateChangeHandler} value={relationDate} type="date"/>
            <Button onClick={submitRelationCheck} backgroundColor={'brand.primary'} color='white'>Ga verder</Button>
            <chakra.span opacity={showError ? 1 : 0} transition={'opacity 0.25s ease-in-out'} color={'red'}>Even een hint... iets met je verjaardag?</chakra.span>
          </Flex>
        </Flex>
    )
  }

  useEffect(() => {
    if (intro) {
      let index = 0;
      const maxIndex = introSequence.length - 1;
      setIntroText(introSequence[index]);

      const interval = setInterval(() => {
        if (index === maxIndex) {
          clearInterval(interval);
          hideIntro();
          router.push('/memory')
        } else {
          index++;
          setIntroText(introSequence[index]);
        }
      }, 4500); // Increased interval to account for fade out delay

      return () => clearInterval(interval);
    }
  }, [intro]);

  const IntroSequence = () => {
    return (
        <Flex justifyContent={'center'} alignItems={'center'} h='60dvh'>
          <Text
           color='brand.secondary'
            data-state='open'
            _open={{
              animation: 'fade-in 800ms ease-out'
            }}
            _closed={{
              animation: 'fade-out 800ms ease-in'
            }}
            fontSize={{base: '2xl', md: '5xl'}} 
          >
            {introText}
          </Text>
        </Flex>
    );
  };

  return (
    <AnimatePresence>
      <motion.div {...pageTransition}>
        <Flex as='section' direction={'column'} py={{base: 12, md: 16}} px={{base: 12, md: 16}}>
          {relationCheck && (
            <RelationCheck /> 
          )}
          {intro && (
            <IntroSequence />
          )}
        </Flex>
      </motion.div>
    </AnimatePresence>
  );
}
