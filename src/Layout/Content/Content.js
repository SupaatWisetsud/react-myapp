import React from 'react';
import { Dashboard, CarCategory, Emp, Password, Profile, Report } from '../../components';

export default ({menu}) => {
    
    if(menu === "home"){
        return <Dashboard />;
    }else if(menu === "profile"){
        return <Profile />
    }else if(menu === "category"){
        return <CarCategory />
    }else if(menu === "emp"){
        return <Emp />
    }else if(menu === "chart"){
        return <Report />
    }else if(menu === "password"){
        return <Password />
    }
}