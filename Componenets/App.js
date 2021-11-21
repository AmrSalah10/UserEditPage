// import '../App.css';
import MainPage from './MainPage';
import React from 'react'
import avatar from "../media/image.webp"


class App extends React.Component{
  constructor(){
    super()
    this.state={
      user:{
        id:"",
        username:"",
        phone:"",
        email:"",
        avatar:avatar,
        country:'',
        membership:'',
        payment_day:''
      },
      passwords:{
        new_password1:"",
        new_password2:""        
      },
      token:"8af2ee0818c54ab29dcbf00be74a607a25d220a7",
      message:"",
      display:"",
      variant:""
    }
  }
  componentDidMount =  async() =>{
    let token = this.state.token
    let response = await fetch("https://itipythonapi.herokuapp.com/api/user/",{
      method:"GET",
      headers:{
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization':`Token ${token}`
      }
    })
    let data = await response.json()
    this.setState({user:data})
}
  
  changeHandler = (e) =>{
    let user = this.state.user
    user[e.target.name] = e.target.value
    this.setState({user:user})
} 

  passHandler = (e)=>{
    let passwords = this.state.passwords
    passwords[e.target.name] = e.target.value
    this.setState({passwords:passwords}) 
  }

  updateavatar = (src) =>{
    let user = this.state.user
    user["avatar"] = src
    this.setState({user:user})
}

  removeAvatar = (imgSrc) =>{
    let user = this.state.user
    imgSrc = avatar
    user['avatar'] = imgSrc
    this.setState({user:user})
  }


  save = async ()=>{
    let token = this.state.token
    let response = await fetch(`https://itipythonapi.herokuapp.com/api/update/${this.state.user.id}/`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization':`Token ${token}`
        },
        body: JSON.stringify(this.state.user)
    })

    let result = await response.json()

    if(response.status === 400){
      console.log(result.username)
      this.setState({message:result.username, display:'block',variant:'danger'})
    }
    else{
      this.setState({message:'Your data is saved successfully ', display:'block', variant:'success'})
    }
}



  savePass = async ()=>{
    let data = this.state.passwords
    let response = await fetch('http://127.0.0.1:8080/api/rest-auth/password/change/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json;charset=utf-8',
        'Authorization':`Token ${this.state.token}`
      },
      body: JSON.stringify(data)
    })
    let result = await response.json()
    console.log(response)
    console.log(response.status)
    console.log(result)
    if(response.status === 400){
      this.setState({message:result.new_password2, display:'block',variant:'danger'})
    }
    else{
      this.setState({message:'Your password is changed successfully ', display:'block', variant:'success'})
    }
  }

  render(){
    return (
      <div className="App">
        <MainPage data={this.state.user}
                  changeHandler={this.changeHandler}
                  save={this.save} 
                  updateavatar={this.updateavatar}
                  removeAvatar={this.removeAvatar}
                  passHandler={this.passHandler}
                  savePass={this.savePass}
                  message={this.state.message}
                  display={this.state.display}
                  variant={this.state.variant}
        />
      </div>           
    )
  }
}

export default App;
