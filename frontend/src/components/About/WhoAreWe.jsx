import HeadingText from '@/components/HeadingText'
import MainPadding from '@/layouts/MainPadding'
import React from 'react'

const WhoAreWe = () => {
    return (
        <MainPadding>
            <div className='flex flex-col gap-5 items-center text-center'>
                <h1 className='text-primary font-bold'>Who Are We?</h1>
                <HeadingText className="text-4xl text-foreground">A CHURCH FILLED WITH LOVE AND COMPASSION</HeadingText>
                <p className='font-medium text-foreground/80 text-center'>
                    We are a community bound together by God’s love, committed to supporting each other through life’s journey. Our church exists to provide a space where everyone,    students, faculty, and families, can experience the transforming power of God's grace. We believe in serving others with compassion, uplifting each person’s spirit, and making a positive impact in our university and beyond.
                </p>
            </div>
        </MainPadding>

    )
}

export default WhoAreWe
