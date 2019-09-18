import React from 'react';
import './App.css';
import Login from './components/Login/Index';
import Main from './components/Main/Index';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token : ''
        }
    }

    componentDidMount() {
        try{
           let token = localStorage.getItem("token");
           if (token == null){
               // no token store
           } else {
               this.setState({
                   token
               })
           }

        }catch (e) {
            // error found on get token from cookies
        }
    }

    handlerToken = (value) => {
       if(value){
           this.setState({
               token : value
           })
       }
    };

    handlerLogout = () => {
        console.log("logout click")
        try{
            localStorage.removeItem("token");
            this.setState({
                token: ''
            })
        }catch (e) {
            console.log('======');
        }
    };

    render() {
        return(
            <div>
                {this.state.token == '' ?
                    <Login
                        handlerToken={this.handlerToken}
                    /> :
                    <Main
                        handlerLogout={this.handlerLogout}
                        token={this.state.token}
                    />
                }
            </div>

        );
    }
}


export default App;
