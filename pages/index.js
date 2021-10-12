import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import JSONViewer from '../components/JSONViewer'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [ url , setUrl] = useState('https://hire.li/d91b084')
  const [ jsonContent , setJSONContent] = useState(null)
  useEffect(() => {
  },[])

  function search () {
    fetch(`/api/hirespark-api?url=${url}`).then((x) => {
      return x.json()
    }).then((d) => {
      setJSONContent(d)
    })
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Sparkhire Proof of Concept</title>
        <meta name="description" content="Sparkhire API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Demo <a href="/">Sparkhire API</a>
        </h1>
        <div style={{
          flexDirection: 'row'
        }}>
          <input 
            onChange={(e) => {
              setUrl(e.target.value)
            }}
            value={url}
            placeholder="Url"
          />
          <button onClick={search}>Search</button>
        </div>

        {!!jsonContent &&
          <div >
            <div className={styles.questionWrapper}>
              <h3>Name: {jsonContent.interview.person.name}</h3>
              <h3>Email: {jsonContent.interview.person.email}</h3>
              <img src={jsonContent.interview.person.avatar}/>
            </div>
            <div >
              Questions
             
            </div>
          </div>
        }
        {!!jsonContent  &&
          <div style={{
            maxHeight: 300,
            width: 600,
            maxWidth: '100%'
          }}>
            <JSONViewer src={jsonContent}/>
          </div>
        }
      </main>
    </div>
  )
}
