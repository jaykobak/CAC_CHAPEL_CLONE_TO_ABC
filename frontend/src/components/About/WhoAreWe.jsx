import HeadingText from '@/components/HeadingText'
import MainPadding from '@/layouts/MainPadding'
import React from 'react'

const WhoAreWe = () => {
    return (
        <MainPadding>
            <div className='flex flex-col gap-5 items-center text-center'>
                <h1 className='text-primary font-bold'>Who are we?</h1>
                <HeadingText className="text-4xl  text-foreground">A CHURCH FILLED WITH LOVE AND COMPASSION</HeadingText>
                <p className='font-medium text-foreground/80 text-center'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut ex asperiores, sequi animi ipsum autem dicta inventore impedit nihil. Placeat dolore obcaecati consequatur illo voluptatibus eaque rem quasi beatae necessitatibus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quae, error delectus est molestias possimus et voluptatem id iure quibusdam omnis laborum exercitationem eveniet nesciunt a quas saepe quia at.</p>
            </div>
        </MainPadding>
    )
}

export default WhoAreWe
