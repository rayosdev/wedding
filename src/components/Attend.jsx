import React, {useEffect, useState} from 'react'
import './Attend.scss'
import AttendForm from './Attend/AttendForm'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

import decorationRightSVG from '../assets/decoration-green--right.svg'
import decorationLeftSVG from '../assets/decoration-green--left.svg'

import { useStore } from '../store'
// import TableComponent from './TableComponent'

import { getDocs, query, where } from "firebase/firestore"
import { firestore, collection } from '../../firebaseConfig'


export default function Attend() {

  const [usersData, setUsersData] = useState([1,2,3])

  const {
    updateActiveFormStep,
    updateFormPath,
    updateGiftShowFromNav,
    updateUserPathHistory
  } = useStore()

  const observeElement = useIntersectionObserver(() => {
    document.querySelector('header').style.visibility = 'visible'
  })

  useEffect(() => {
    console.log("usersData: ", usersData)
  }, [usersData])
  

  const dataFetcher = async () => {
    try {
      // Check if the user already exists
      const usersRef = collection(firestore, 'users')
      const q = query(usersRef)
      const querySnapshot = await getDocs(q)
      const data = []
      querySnapshot.forEach(doc => {
        // console.log(doc.id, " || ", doc.data())
        data.push(doc.data())
      })
      setUsersData(data)
    } catch (e) {

        console.error("Error adding document: ", e)
    }
  }

  useEffect(() => {
    dataFetcher()
  }, [])
  

  return (
    <section className="attend" ref={observeElement}>
      {/* <nav className="nav-section">
        <ul>
          <li><a href='' onClick={e => { e.preventDefault()
            document.querySelector("#root > section.attend > div.container > div > form")
              .scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
            updateGiftShowFromNav(false)
          }}>Attend?</a></li>
          <li><a href='' onClick={e => { e.preventDefault()
            document.querySelector("#root > section.attend > div.container > div > form")
              .scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
            updateActiveFormStep('you')
            // updateFormPath(null)
            updateGiftShowFromNav(true)
          }}>Gifts</a></li>
          <li><a href='' onClick={e => { e.preventDefault()
            document.querySelector("#when > div.container > h2")
              .scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
          }}>When</a></li>
          <li><a href='' onClick={e => { e.preventDefault()
            document.querySelector("#root > section.where > div.container > h2")
              .scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
          }}>Where</a></li>
        </ul>
      </nav> */}
      <div className="container">
        {/* <AttendForm /> */}
        {/* <TableComponent /> */}
        <br />
        <br />
        <br />
        <h2>Who's comming</h2>
        <ol>
          {usersData.map((user) => (
            <>
              {user.attending && 
                <>
                <li key={user.id}>{user.name}</li>
                {user.group.map((groupPerson, i) => {
                    return groupPerson !== '' ? <li key={i}>&nbsp;&nbsp;&nbsp;&nbsp;{groupPerson}</li> : null
                  })
                }
                </>
              }
              <br />
            </>
          ))}
        </ol>
      </div>
      {/* <div className="decoration-container">
        <img loading="lazy" src={decorationLeftSVG} alt="" className="attend__branch--left no-pointer-event"/>
        <img loading="lazy" src={decorationRightSVG} alt="" className="attend__branch--right no-pointer-event"/>
      </div> */}
    </section>
  )
}
