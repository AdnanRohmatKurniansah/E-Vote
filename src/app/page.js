'use client'

import { Button, Icon, useBreakpointValue } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Step from './components/Step'
import ListCandidate from './components/ListCandidate'
import Question from './components/Question'

export default function Home() {
  const Blur = (IconProps) => {
    return (
      <Icon
        width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
        zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
        height="460px"
        viewBox="0 0 528 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...IconProps}>
        <circle cx="71" cy="61" r="111" fill="#F56565" />
        <circle cx="244" cy="106" r="139" fill="#ED64A6" />
        <circle cy="291" r="139" fill="#ED64A6" />
        <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
        <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
        <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
        <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
      </Icon>
    )
  }

  return (
    <div className='home'>
      <Navbar />
      <div className='hero px-10 md:container md:px-64 h-screen flex flex-col justify-center'>
        <h1 className='text-5xl md:text-6xl text-center font-extrabold'>Vote for the <span className='text-blue-500'>candidate</span> you want</h1>
        <div className='desc text-center mt-5 md:mt-10'>
          <h2 className='text-xl md:text-2xl'>Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.</h2>
        </div>
        <div className='go mx-auto mt-5'>
         <Button size={'lg'} className='bg-blue-500 hover:bg-blue-400 text-white'>Vote now</Button>
        </div>
        <Blur position={'absolute'} top={-10} left={-10} style={{ filter: 'blur(70px)' }} />
      </div>
      <Step />
      <ListCandidate />
      <Question />
      <Footer />
    </div>
  )
}
