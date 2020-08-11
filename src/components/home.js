import React from 'react';
import SimpleAccordion from './../utils/accordion';
import data from './../assets/data.json';

export default function Home() {
    

    return(
        <>
            {
                data.members.map((profile) => {
                    return(
                        <SimpleAccordion key={profile.id} data={profile} />
                    )
                })
            }
        </>
    )
    
}