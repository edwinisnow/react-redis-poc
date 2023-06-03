import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Badge,
  Card,
  Container,
} from 'reactstrap'

function Home() {
  const [threads, setThreads] = useState([])
  const [open, setOpen] = useState('1')
  const toggle = (id) => {
    if (open === id) {
      setOpen()
    } else {
      setOpen(id)
    }
  }
  useEffect(() => {
    axios
      .get('http://localhost:3000/threads')
      .then((res) => {
        setThreads(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <Container fluid>
        <Card
          style={{
            width: '600px',
          }}
        >
          <h4>
            <center>
              Total threads: <Badge>{threads.length}</Badge>
            </center>
          </h4>
          <Accordion open={open} toggle={toggle}>
            {threads &&
              threads.map((thread, i) => {
                const no_validated = thread.commands.reduce(
                  (acc, curr) => (acc = curr.validated ? acc + 1 : acc),
                  0
                )
                return (
                  <AccordionItem key={thread.id}>
                    <AccordionHeader targetId={thread.id}>
                      Thread {i + 1} : {no_validated}/{thread.commands.length}{' '}
                      validated
                    </AccordionHeader>
                    <AccordionBody accordionId={thread.id}>
                      {thread.commands.map((command) => {
                        const color = command.validated ? 'success' : 'danger'
                        const validateText = command.validated ? 'done' : 'open'
                        return (
                          <div key={command.id}>
                            <p>
                              {`${command.name}`}
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <Badge color={color} pill>
                                {validateText.toUpperCase()}
                              </Badge>
                            </p>
                          </div>
                        )
                      })}
                    </AccordionBody>
                  </AccordionItem>
                )
              })}
          </Accordion>
        </Card>
      </Container>
    </>
  )
}

export default Home
