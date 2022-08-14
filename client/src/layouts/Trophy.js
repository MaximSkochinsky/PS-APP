import '../styles/Discover.css'
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import bronzeTrophy from '../img/ps4-bronze-trophy-removebg-preview.png'
import silverTrophy from '../img/ps4-silver-trophy-removebg-preview.png'
import goldTrophy from '../img/ps4-gold-trophy-removebg-preview.png'
import platinumTrophy from '../img/ps4-platinum-trophy-removebg-preview.png'
import earnedIcon from '../img/png-transparent-green-check-check-mark-tick-tick-angle-leaf-plant-stem-thumbnail-removebg-preview.png'
import notEarnedIcon from '../img/274c-removebg-preview.png'

function Trophy() {

  // const [name, setName] = useState('');

  // let [accountId, setAccountId] = useState('')
  // let navigate = useNavigate();
  let location = useLocation()
  



  const createTrophiesList = (trophies) => {

    const trophiesList = document.getElementById('trophies_list')

    for (let trophy of trophies) {
        
        const trophyName = document.createElement('span')
        trophyName.innerHTML = trophy.trophyName
        trophyName.className = 'trophy_name'

        const trophyDetail = document.createElement('span')
        trophyDetail.innerHTML = trophy.trophyDetail
        trophyDetail.className = 'trophy_description'

        const trophyBox = document.createElement('div')
        trophyBox.className = 'trophy_name_details'

        trophyBox.appendChild(trophyName)
        trophyBox.appendChild(trophyDetail)




        const trophyImage = document.createElement('img')
        trophyImage.className = 'trophy_image'

        let trophyTp = (typeof(trophy.trophyRare) === 'string')? trophy.trophyRare : trophy.trophyType
        switch(trophyTp) {
            case 'bronze':
              trophyImage.src = `${bronzeTrophy}`
              break;
            case 'silver':
              trophyImage.src = `${silverTrophy}`
              break;
            case 'gold':
              trophyImage.src = `${goldTrophy}`
              break;
            case 'platinum':
              trophyImage.src = `${platinumTrophy}`
              break;
            default:
              break;  
        }

        const isEarnedImage = document.createElement('img')
        isEarnedImage.className = 'trophy_image'

        switch(trophy.earned) {
            case true:
              isEarnedImage.src = `${earnedIcon}`
              break;
            case false:
              isEarnedImage.src = `${notEarnedIcon}`
              break;
            default:
              break;
        }

        const trophyEarnedRate = document.createElement('span')
        trophyEarnedRate.innerHTML = `${trophy.trophyEarnedRate}%`

        const trophyExtraInfoBox = document.createElement('div')
        trophyExtraInfoBox.className = 'trophy_extra_info'
        
        trophyExtraInfoBox.appendChild(trophyImage)
        trophyExtraInfoBox.appendChild(isEarnedImage)
        trophyExtraInfoBox.appendChild(trophyEarnedRate)

        const trophyStatBox = document.createElement('div')
        trophyStatBox.className = 'trophy_stat'

        trophyStatBox.appendChild(trophyBox)
        trophyStatBox.appendChild(trophyExtraInfoBox)

        const imageOfTrophy = document.createElement('img')
        imageOfTrophy.src = trophy.trophyIconUrl
        imageOfTrophy.className = 'title_image'

        const trophyInfoBox = document.createElement('div') 
        trophyInfoBox.className = 'trophy_info'

        trophyInfoBox.appendChild(imageOfTrophy)
        trophyInfoBox.appendChild(trophyStatBox)


        trophiesList.appendChild(trophyInfoBox)
    }
}

  

  useEffect(() => {

      async function fetchData () {
          const json = JSON.stringify(location.state)
          const data = await fetch('/api/trophy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: json 
        }).then(data => data.json())  

        createTrophiesList(data)
      }

      fetchData()
      
  }, [])


  return (
    <div id="player_profile">
        <div className='trophies_list' id="trophies_list">
            
        </div>
    </div>
  );
}

export default Trophy;