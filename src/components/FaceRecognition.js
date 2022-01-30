import React,{Component} from 'react';
import './FaceRecog.css'
class FaceRecignition extends Component {
    constructor(props){
        super(props);
        console.log(this.props.box); 
        this.height = 0;
        this.width = 0;
    }
    calculateDim(){
        const h = this.props.box.bottomRow - this.props.box.topRow;
        const w = this.props.box.rightCol - this.props.box.leftCol;
        this.height = this.props.box.height;
        this.width = this.props.box.width;
        console.log(h ,w);
        return [h,w];
    }
    render(){
        return (
            <div>
            <img src={this.props.link} alt= "" className="img-set" style={{visibility:this.props.visibility}}/>
            <div className="bounding-box" style={{height:this.calculateDim()[0],
                width:this.calculateDim()[1],
                transform: 'translate(20vw,-40vh)',
                marginLeft:this.props.box.leftCol,
                marginRight:this.props.box.rightCol,
                marginTop:this.props.box.topRow,
                marginBottom:this.props.box.bottomRow,
                visibility:this.props.visibility
                }
                }></div>
            </div>
        )
    }
}
export default FaceRecignition;