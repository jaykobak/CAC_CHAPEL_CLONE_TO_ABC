import MainPadding from '@/layouts/MainPadding'
import React from 'react'
import HeadingText from '../HeadingText'
import img from "../../assets/Blog/hero.jpg"
import BackgroundImage from '../BackgroundImage'

const topics = [
  {
    name: "GODLY RELATIONSHIP",
    img: img,
  },
  {
    name: "SPIRITUALITY",
    img: img,
  },
  {
    name: "PRAYER AND MEDITATION",
    img: img,
  },
  {
    name: "HEALING AND RECOVERY",
    img: img,
  },
  {
    name: "FAITH",
    img: img,
  },
  {
    name: "MARRIAGE",
    img: img,
  },
  {
    name: "CAREER",
    img: img,
  },
  {
    name: "GIVING",
    img: img,
  },
  {
    name: "WORSHIP",
    img: img,
  },


]

const BlogTopics = () => {
  return (
    <MainPadding>
      <div className='flex flex-col gap-10 w-full'>
        <div className='flex flex-col gap-3 items-center'>
          <h1 className='text-primary font-bold'>Topics</h1>
          <HeadingText className={"text-3xl md:text-5xl text-center"}>BROWSE THROUGH EMPOWERING TOPICS</HeadingText>
        </div>

        <div className='overflow-hidden overflow-x-scroll'>
          <div className='grid md:grid-cols-3 grid-cols-4 w-[1000px] md:w-full gap-5'>
            {
              topics.map((topic, index) => (
                <BackgroundImage img={topic.img} bgClass={"bg-black/60"} className={"flex items-center justify-center h-[100px] md:h-[150px]"}>
                  <HeadingText className={"text-primary-foreground/80 text-center text-2xl lg:text-3xl"}>{topic.name}</HeadingText>
                </BackgroundImage>
              ))
            }
          </div>
        </div>
      </div>
    </MainPadding>
  )
}

export default BlogTopics
