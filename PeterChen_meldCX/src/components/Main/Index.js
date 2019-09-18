import React , {Component} from 'react';
import axios from 'axios';
import './Main.css';

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            devices : []
        }
    }

    componentDidMount() {
        axios
            .get('http://35.201.2.209:8000/devices')
            .then(res => {
                if(res){
                    this.setState({
                        devices : res.data.devices
                    });
                    this.setup(res.data.devices.length);
                }
               // console.log(res.data.devices);
            })
            .catch(err => {
                console.log(err);
                this.setup(this.state.devices.length);
            });
        this.timer = setInterval(()=> this.getItems(), 2000);
    }

    // clear canvas and start draw circles in canvas
    setup =(num) => {
        try {
            let canvas = document.getElementById("canvasArea");
            let context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);

            var numCircles = num;
            var colors = ['white'];
            var numColors = colors.length;

            // A3. CREATE circles.
            for (var n = 0; n < numCircles; n++) {
                // A4. RANDOM values for circle characteristics.
                var xPos = Math.random() * canvas.width;
                var yPos = Math.random() * canvas.height;
                var radius = 20;
                var colorIndex = Math.random() * (numColors - 1);
                colorIndex = Math.round(colorIndex);
                var color = colors[colorIndex];

                // A5. DRAW circle.
                this.drawCircle(context, xPos, yPos, radius, color);
            }
        }catch (e) {
            // do nothing
        }
    };

    // draw circle
    drawCircle = (context, xPos, yPos, radius, color)=> {
        //B1. PARAMETERS for shadow and angles.
        var startAngle = (Math.PI / 180) * 0;
        var endAngle = (Math.PI / 180) * 360;
        context.shadowColor = "gray";
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;
        context.shadowBlur = 5;

        //B2. DRAW CIRCLE
        context.beginPath();
        context.arc(xPos, yPos, radius,
            startAngle, endAngle, false);
        context.fillStyle = color;
        context.fill();
    };

    componentWillUnmount() {
        this.timer = null; // here...
    }

    // recall all devices Api after 2s
    getItems() {
        try {
            axios
                .get('http://35.201.2.209:8000/devices')
                .then(res => {
                    if (res) {
                        this.setState({
                            devices: res.data.devices
                        });
                        this.setup(res.data.devices.length);
                    }
                    // console.log(res.data.devices);
                })
                .catch(err => {
                    console.log(err);
                    this.setup(this.state.devices.length);
                });
        }catch (e) {
            console.log('some error');
        }
    }

    // when notify button clicks
    handlerNotify = () => {
        axios
            .post('http://35.201.2.209:8000/notify' , {
                name: 'abc',
                email: 'abc@gmail.com',
                repoUrl: 'github.com/abc',
                message: 'Hello world'
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + this.props.token
                    }
                })
            .then(res => {
              //  console.log(res);
                alert('Request Sent Sucessfully')
            })
            .catch(err => {
               // console.log(err);
                alert('Request Failed. Please Check Your Network')
            })
    };

    render() {

        return(
            <div className="Main">

                <div  className="mainText">
                    <h2 align="center">{this.state.devices.length}</h2>
                    <h2>Devices Online</h2>
                </div>

                <canvas id="canvasArea"
                        className="canvas"
                        width="1280"
                        height="500"
                >
                </canvas>
                <div className="footer">
                    <button className="notifyButton" onClick={this.handlerNotify}>Notify</button>
                    <button className="logoutButton" onClick={this.props.handlerLogout}>Logout</button>
                </div>

            </div>
        )
    }
}

export default Main;
