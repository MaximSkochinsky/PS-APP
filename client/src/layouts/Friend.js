import PsPlusIcon from '../img/kisspng-playstation-4-playstation-3-playstation-plus-plays-plus-5abccd32bda298.1052703715223227387768-removebg-preview.png'
import localeCodeToEnglish from '../utils/toLocale';
import { useNavigate, useLocation } from "react-router-dom";



const Friend = (props) => {



    let navigate = useNavigate();

    let psPlusIcon;
    if (props.isPsPlusMember) {
        psPlusIcon = <img src={PsPlusIcon} className="ps_plus_icon" title='ps plus member'></img>
    }
    else {
        psPlusIcon = <></>
    }

    const handleClick = (e) => {
        for (let pointOfPath of e.nativeEvent.path) {
            if (pointOfPath.id !== '' && pointOfPath.id !== 'root' && pointOfPath.id !== undefined && pointOfPath.id !== 'friends_list' && 
            pointOfPath.id !== 'player_profile') {
                console.log(pointOfPath.id)
                navigate('/stats', {
                    state: {
                        accountName: pointOfPath.id,
                    }
                })
            }           
        }
    }

    return (
        <div className = "friend_info" id={props.name} onClick={handleClick}>
                        <div className="friend_main_info">
                            <img src={props.iconURL} class="friend_profile_image"></img>
                            <div className='friend_nickname'>
                                <span>{props.name}</span>
                            </div> 
                        </div>
                        <div className='friend_extra_info'>
                            {psPlusIcon}
                            <div className='friend_text_info'>
                                <div className='about_section'>
                                    <span>About me:</span>
                                    <span className='about_friend'>{props.about}</span>
                                </div>
                                <div className='language_section'>
                                    <span>Language:</span>
                                    {
                                        <span className='about_friend'>{localeCodeToEnglish(props.language[0])};</span>
                                    }
                                </div>
                            </div>
                        </div>
        </div>
    )
}

export default Friend