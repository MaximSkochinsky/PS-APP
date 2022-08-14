import '../styles/Discover.css'
import '../styles/Friends.css'
import React, { useEffect, useState } from 'react';
import { MDBInputGroup,MDBCol,MDBInput, MDBIcon, MDBAlert, MDBBtn } from 'mdb-react-ui-kit';
import bronzeTrophy from '../img/ps4-bronze-trophy-removebg-preview.png'
import silverTrophy from '../img/ps4-silver-trophy-removebg-preview.png'
import goldTrophy from '../img/ps4-gold-trophy-removebg-preview.png'
import platinumTrophy from '../img/ps4-platinum-trophy-removebg-preview.png'
import { useNavigate, useLocation } from "react-router-dom";
import {useRef} from 'react'
import PSIcon from '../img/playstation-logo_318-10089-removebg-preview.png'
import earnedIcon from '../img/png-transparent-green-check-check-mark-tick-tick-angle-leaf-plant-stem-thumbnail-removebg-preview.png'
import notEarnedIcon from '../img/274c-removebg-preview.png'
import PsPlusIcon from '../img/kisspng-playstation-4-playstation-3-playstation-plus-plays-plus-5abccd32bda298.1052703715223227387768-removebg-preview.png'
import Friend from './Friend';
import Spinner from 'react-bootstrap/Spinner';

function Friends() {

  const [name, setName] = useState('');
  const [friends, setFriends] = useState([])
  let [loading, setLoading] = useState(false)

  let navigate = useNavigate();


  const cleanFriendsList = () => {
      if (document.getElementById("friends_list").innerHTML !== "") document.getElementById("friends_list").innerHTML = ""
  }


  useEffect(() => {
      if (!loading) document.getElementById('loading_box').style.display = "none"
      else document.getElementById('loading_box').style.display = "flex"
  }, [loading])


  const handleSubmit = async (e) => {
        // cleanFriendsList()
        e.preventDefault()
        setFriends([])
        setLoading(true)
        
        
        const value = (document.getElementById("form1").value)
        const data = await fetch(`/api/profile?player=${value}`, {
             method: 'GET', 
         }).then(data => data.json()) 

         console.log(data)


         if (Array.isArray(data)) {
          setFriends(data)
         }
         else {
            alert('No Info about this player (profile is hidden)')
         }
         setLoading(false)
  }


//   const renderFriendsList = (friends) => {
//         var friendsList = []
//         for (let friend of friends) {
//             friendsList.push(</Friend>)
//         }
//   }


  return (
    <div id="player_profile">
        <form onSubmit={handleSubmit}>
          <div class="input-group" id="profile">
            <div id="search-autocomplete" class="form-outline">
              <input type="search" id="form1" class="form-control" placeholder="Type player's nickname..." req/>
            </div>
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-search">Search</i>
            </button>
          </div>
        </form>

        <div className='friends_list' id="friends_list">
            <div className='loading_box' id="loading_box">
              {loading? <Spinner animation="grow" style={{alignSelf: "center"}} size="l" />: null}
              {loading? <Spinner animation="grow" style={{alignSelf: "center"}} size="l" />: null}
              {loading? <Spinner animation="grow" style={{alignSelf: "center"}} size="l" />: null}
              {loading? <Spinner animation="grow" style={{alignSelf: "center"}} size="l" />: null}
            </div>        
            { 
                friends.map((obj) =>  <Friend key={obj.onlineId} about={obj.aboutMe} iconURL={obj.avatars[2].url} isPsPlusMember={obj.isPlus} name={obj.onlineId} language={obj.languages}></Friend>)
            }
        </div>

    </div>
  );
}

export default Friends;