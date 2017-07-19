import React, {Component} from 'react';


export default class Reporting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      themeColor: "#009688"
      }
    }


  save() {
    this.props.onComplete({themeColor:this.state.themeColor})
  }


  render() {
    const style = {
      backgroundColor:this.state.themeColor,
      borderRadius: "6px",
      width: "inherit",
      height: "25px",
    }

    return (
      <div className="row">
        <div className="row">
          <div className="col-xs-5 col-md-4">
            <h4>{'Select Theme Color '}</h4>
          </div>
          <div className="col-xs-7 col-md-8">
            {this.props.id &&
              <a
              style={{display:"inline-block", margin:"0px 3px 0px 3px"}}
              className="btn btn-primary btn-sm pull-right" href={this.props.urls.view}>
              View
            </a>}

            <button
              style={{display:"inline-block", margin:"0px 3px 0px 3px"}}
              className="btn btn-primary btn-sm pull-right" onClick={this.save.bind(this)}>Save</button>

            <button
              style={{display:"inline-block", margin:"0px 3px 0px 3px"}}
              className="btn btn-primary btn-sm pull-right"
              onClick={() => this.props.onPrevious()}>Previous</button>
          </div>
        </div>
        <hr></hr>

        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="dropdown">
              <h5>Select Color</h5>
              <button
                style={{width:"100%"}}
                className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                <div style={style}></div>
              </button>

              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1" style={{width:"100%"}}>
                <li style={{width:"100%"}}>
                  <div style={{
                    backgroundColor:"#03A9F4",
                    borderRadius: "6px",
                    width: "95%",
                    height: "25px",
                    margin: "2% auto 2% auto",
                  }} onClick={()=>{this.setState({themeColor:"#03A9F4"})}}></div>
                </li>
                <li style={{width:"100%"}}>
                  <div style={{
                    backgroundColor:"#009688",
                    borderRadius: "6px",
                    width: "95%",
                    height: "25px",
                    margin: "2% auto 2% auto",
                  }} onClick={()=>{this.setState({themeColor:"#009688"})}}></div>
                </li>
                <li style={{width:"100%"}}>
                  <div style={{
                    backgroundColor:"#3f51B5",
                    borderRadius: "6px",
                    width: "95%",
                    height: "25px",
                    margin: "2% auto 2% auto",
                  }} onClick={()=>{this.setState({themeColor:"#3f51B5"})}}></div>
                </li>
                <li style={{width:"100%"}}>
                  <div style={{
                    backgroundColor:"#607D8B",
                    borderRadius: "6px",
                    width: "95%",
                    height: "25px",
                    margin: "2% auto 2% auto",
                  }} onClick={()=>{this.setState({themeColor:"#607D8B"})}}></div>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
