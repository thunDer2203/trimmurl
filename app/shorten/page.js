"use client"

import React, { useState } from 'react'
import Link from 'next/link'
const Shorten = () => {
    const [url, seturl] = useState("")
    const [shorturl, setshorturl] = useState("")
    const [generated, setGenerated] = useState({})


      const generate = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shorturl": shorturl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if(result.message==='URL generated'){
                setGenerated({"content":`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`,
                "success":true})
                }
                else
                    setGenerated({"content":`URL already exists`,
                "success":false})
                seturl("")   
                setshorturl("")
                console.log(result)
                alert(result.message)
            
            })
            .catch((error) => console.error(error));
    }

    
  return (
    <div className='mx-auto max-w-lg bg-cyan-200 my-16 p-8 rounded-lg flex flex-col gap-4'>
            <h1 className='font-bold text-2xl items-center text-center'>Generate your short URLs</h1>
            <div className='flex flex-col gap-1'>
                <input type="text"
                    value={url}
                    className='px-4 py-2 focus:outline-cyan-800 rounded-md border-cyan-950 border-1 focus:outline-2 bg-white'
                    placeholder='Enter your URL'
                    onChange={e => { seturl(e.target.value) }} />

                <input type="text"
                    value={shorturl}
                    className='px-4 py-2 focus:outline-cyan-800 rounded-md border-cyan-950 border-1 focus:outline-2 bg-white'
                    placeholder='Enter your preferred short URL text'
                    onChange={e => { setshorturl(e.target.value) }} />  
                <button onClick={generate} className='bg-cyan-800 rounded-lg shadow-lg p-3 py-1 my-3 font-bold text-white cursor-pointer'>Generate</button>
            </div>

            {generated.success && <> <span className='font-bold text-lg'>Your Link </span><code><Link target="_blank" href={generated.content}>{generated.content}</Link> 
                </code></>}
                {!generated.success && <> <span className='font-bold text-lg'> </span><code>{generated.content}
                </code></>}
        </div>
  )
}

export default Shorten
