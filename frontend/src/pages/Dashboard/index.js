import React, {useEffect} from 'react';
import api from '../../services/api';

export default function Dashboard({history}) {

    useEffect(()=>{
        CheckUser();
    }, [])

    const CheckUser = async () => {
        const user_id = localStorage.getItem('user');
        if(user_id){
            const user = await api.get('/user/'+user_id);
            console.log(user.data._id);
        }else {
            history.push('/login');
        }
    }

    return(
        <div>
           Dashboard
        </div>
    )
}