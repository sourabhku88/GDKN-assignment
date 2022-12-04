import React, { useState } from 'react'
import LeftSide from './LeftSide'
import RightSide from './RightSide'


const Home = () => {
    const [id, setId] = useState('');
    return (
        <>
            <div className="home d-flex py-2 bg-secondary rounded bg-opacity-25">
                <div className="leftside ps-1">
                    <LeftSide setId={setId} />  {/* left component----------------*/ }
                </div>
                <div className="rightside w-100">
                    <RightSide id={id} setId={setId} />  {/* right component----------------*/ }
                </div>
            </div>
        </>
    )
}

export default Home