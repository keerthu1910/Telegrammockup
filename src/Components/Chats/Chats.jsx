import './style.scss';
import menubtn from '../../assets/menu.png';
import pen from '../../assets/pen.png';
import axios from 'axios';
import {useState,useEffect} from 'react';

export const Chats = () => {
    const [contacts,setContacts] = useState([]);
    const [showChat,setshowChat] = useState(false);
    const [showmenu,setshowMenu] = useState(false);
    const [newmessage,setNewMessage] = useState('');
    const [userId,setUserId] = useState(0);
    const [usermessages,setUserMessages] = useState([]);
    const menuitems = ['Saved Messages','Contacts','My Stories','Settings','Night Mode','Animations','Telegran Features','Report a Bug','Switch to K Version','Install App']
    useEffect(()=>{
        axios.get('https://devapi.beyondchats.com/api/get_all_chats?page=1')
            .then(response=>setContacts(response.data.data.data))
                .catch(error=>alert(error))
    },[])
    console.log(userId);
    const handleData =(userid)=>{
        axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${userid}`)
            .then(res=>setUserMessages(res.data.data))
                .catch(err=>alert(err))
    }
 
    return(
        <div className='chats-container' >
            <div className={newmessage === 'show' ? 'new-message show' : 'new-message'}>
                <img src={pen} alt='new message'/>
            </div>
            <div className='chats' onMouseOver={()=>setNewMessage('show')} onMouseLeave={()=>setNewMessage('')}>
                < div className='menu-container'>
                    <button className='menu-btn' onClick={()=>setshowMenu(!showmenu)}><img src={menubtn} alt='menu-button'/></button>
                    <input className='search-space' type='text' placeholder='Search'/>
                </div>
                <div className={showmenu ? 'menu-items show' : 'menu-items'}>
                    {
                        menuitems.map((item)=>(
                            <li className='menu-item'>{item}</li>
                        ))
                    }
                </div>
                <div className='chats-display'>
                    {
                        contacts.map((item)=>(
                            <div className='contact-card' key={item.id} onClick={()=>{setshowChat(true);setUserId(item.id);handleData(item.id)}}>
                                <span className='contact-img'>{JSON.stringify(item.creator.name).charAt(1)}</span>
                                <p className='contact-name'>{item.creator.name !== null ? item.creator.name : item.creator.email}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='chats-display-container'>
                <div className='chat-top-contact'>
                    
                        {contacts.filter((item)=>item.id === userId).map((item)=>(
                            <div key={item.id} className='contact-card'>
                                <span className='contact-img'>{JSON.stringify(item.creator.name).charAt(1)}</span>
                                <p className='contact-name'>{item.creator.name !== null ? item.creator.name : item.creator.email}</p>
                            </div>)
                        )}
                    
                </div>
                <div className='message-container'>
                        {
                            usermessages.map((item)=>(
                                <div key={item.id} className={item.sender_id === 1 ? 'message-left' : 'message-right' }>
                                    <p className='message-text'>{item.message}</p>
                                </div>
                            ))
                        }
                </div>

            </div>
        </div>
    )
}