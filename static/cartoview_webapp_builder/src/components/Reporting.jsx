import React, {Component} from 'react';
import t from 'tcomb-form';
const mapConfig = t.struct({
  showInfoPopup: t.Boolean,
  showPrint: t.Boolean,
  showExportImage: t.Boolean,
  showAbout: t.Boolean,
  showGeoCoding: t.Boolean,
});
const Form = t.form.Form;
export default class Reporting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultconf: {
        showInfoPopup: this.props.config
          ? this.props.config.showInfoPopup
          : true,
        showPrint: this.props.config
          ? this.props.config.showPrint
          : true,
        showExportImage: this.props.config
          ? this.props.config.showExportImage
          : true,
        showAbout: this.props.config
          ? this.props.config.showAbout
          : true,
        showGeoCoding: this.props.config
          ? this.props.config.showGeoCoding
          : true,
      }
    }
  }
  componentDidMount() {}
  save() {
    var basicConfig = this.refs.form.getValue();
    if (basicConfig) {
      this.props.onComplete(basicConfig)
    }
  }
  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col-xs-12 col-md-4">
            <h4>{'Reporting'}</h4>
          </div>
          <div className="col-xs-4 col-md-8">
            <div className="btn-group" style={{float: "right"}}>
              <button type='button' className="btn btn-primary"
                onClick={() => this.props.onPrevious()}>Previous</button>

              <button type='button' className="btn btn-primary"
                onClick={this.save.bind(this)}>Next</button>
            </div>
          </div>
        </div>
        <hr></hr>

        <Form ref="form" value={this.state.defaultconf} type={mapConfig}/>
      </div>
    )
  }
}
