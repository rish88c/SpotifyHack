import React from 'react'
import SongItem from './SongItem'

function Section({title,items,reverse}) {
  return (
    <section>
        <h3 className='text-2xl text-white font-semibold tracking-tight hover:underline '>
            {title}
        </h3>
        {
            items && (
                <div className='grid grid-cols-5 gap-x-6 gap-y-5'>
                    {
                        reverse?items.toReversed().map((item,num)=><SongItem item={item} key={num}/>)
                        :items.map((item,num)=><SongItem item={item} key={num}/>)
                    }
                </div>
            )
        }
    </section>
  )
}

export default Section