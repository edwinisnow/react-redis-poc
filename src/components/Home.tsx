import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {
  const [threads, setThreads] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:3000/threads')
      .then((res) => {
        setThreads(res.data)
      })
      .catch((err) => console.log(err))
  }, [])
  console.log('threads', threads)
  return (
    <>
      <div>Home</div>
      <p>Total threads: {threads.length}</p>
      {threads &&
        threads.map((thread) => (
          <div key={thread.id}>
            {thread.commands.map((command) => {
              return (
                <div key={command.id}>
                  {`No. of commands validated: ${command.validated}`}
                </div>
              )
            })}
          </div>
        ))}
    </>
  )
}

export default Home

// Total Threads
// No. of Runnings Threads (Label)

// Thread->
// # of commands validated / Total # of commands
