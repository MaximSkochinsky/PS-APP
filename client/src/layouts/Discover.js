import '../styles/Discover.css'
import React, { useEffect, useState } from 'react';
import { MDBInputGroup,MDBCol,MDBInput, MDBIcon, MDBAlert, MDBBtn } from 'mdb-react-ui-kit';
import bronzeTrophy from '../img/ps4-bronze-trophy-removebg-preview.png'
import silverTrophy from '../img/ps4-silver-trophy-removebg-preview.png'
import goldTrophy from '../img/ps4-gold-trophy-removebg-preview.png'
import platinumTrophy from '../img/ps4-platinum-trophy-removebg-preview.png'
import { useNavigate, useLocation } from "react-router-dom";
import {useRef} from 'react'
import PSIcon from '../img/playstation-logo_318-10089-removebg-preview.png'




function Discover() {

  const [name, setName] = useState('');
  let accountId = useRef()
  let navigate = useNavigate();
  let location = useLocation()

  const createTrophiesList = (title, images) => {

    const trophiesList = document.getElementById('trophies_list')

    const trophyBox = document.createElement('div')
    trophyBox.id = title.npCommunicationId
    trophyBox.className = 'trophy_info'

    trophyBox.onclick = (e) => { 
        for (let point of e.path) {
          if (point.id?.startsWith('N')) {

            navigate('/trophy', {
              state: {
                  accountId: accountId.current,
                  titleId: point.id
              }
            })
          }
        }
    }
    
    const titleImage = document.createElement('img')
    titleImage.src = title.trophyIconUrl
    titleImage.className = 'title_image'
    titleImage.title = title.titleName
  
    
    const trophyImages = document.createElement('div')
    trophyImages.className = 'trophy_images'
    trophyImages.title = title.titleName

    let count = 0
    for (let image of images) {
              
        let trophyImage = document.createElement('img')
        trophyImage.src = `${image}`
        trophyImage.className = "trophy_image"
        
        
        let figcaptionToImage = document.createElement('figcaption')
        figcaptionToImage.innerHTML = `${Object.values(title.earnedTrophies)[count]}/${Object.values(title.definedTrophies)[count]}`

        let figure = document.createElement("figure")
        figure.appendChild(trophyImage)
        figure.appendChild(figcaptionToImage)

        trophyImages.appendChild(figure)
        count++;
    }

    trophyBox.appendChild(titleImage)
    trophyBox.appendChild(trophyImages)

    trophiesList.appendChild(trophyBox)

  }



  const cleanTrophiesList = () => {
    const myNode = document.getElementById("trophies_list");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
  }


    
  const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        const value = (document.getElementById("form1").value)
        const json = {
           nick: value
        }
        const JSONdata = JSON.stringify(json)
        const data = await fetch('/api/title', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSONdata 
        }).then(data => data.json())  

        if (data.imageSrc) {

            accountId.current = data.accountId
            if (document.getElementById('player1_avatar')) {
              document.getElementById('player1_avatar').src = data.imageSrc
              document.getElementById('player_nickname').innerHTML = value
            }
            else {
              const playerProfile =  document.getElementById('profile_image')
              const profileAvatar = document.createElement('img')
              profileAvatar.src = data.imageSrc
              profileAvatar.className = 'profile_avatar'
              profileAvatar.id = 'player1_avatar'

              const labelForImage = document.createElement('label')
              labelForImage.id = 'player_nickname'
              labelForImage.innerHTML = value

      
              playerProfile.appendChild(profileAvatar)
              playerProfile.appendChild(labelForImage)
            }
        }

        if (data.trophiesList.length > 0) {
            document.getElementById('ps_icon')?.remove()
            cleanTrophiesList()
            for (let title of data.trophiesList) {
                createTrophiesList(title, [bronzeTrophy, silverTrophy, goldTrophy, platinumTrophy])
            }
        }
        else {
          document.getElementById('ps_icon')?.remove()
          cleanTrophiesList()
          const hiddenTrophiesText = document.createElement('h1')
          hiddenTrophiesText.innerHTML = 'Hidden Trophies...'
          hiddenTrophiesText.style.marginTop = '150px'
          document.getElementById('trophies_list').appendChild(hiddenTrophiesText)
        }
        
  }



  useEffect(() => {
      console.log(location.state)
      if (location.state) {
          document.getElementById("form1").value = location.state.accountName
          handleSubmit()
      }
  }, [])

  

  return (
    <div id="player_profile">
        <form onSubmit = {handleSubmit}>
          <div class="input-group" id="profile">
            <div id="search-autocomplete" class="form-outline">
              <input type="search" id="form1" class="form-control" placeholder="Type player's nickname..." req/>
            </div>
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-search">Search</i>
            </button>
          </div>
        </form>
        <div className='ps_icon' id='ps_icon'>
            <img src={PSIcon}></img>
        </div>
        <div id="profile_image">
            
        </div>
        <div className='trophies_list' id="trophies_list">
         
        </div>

    </div>
  );
}

export default Discover;