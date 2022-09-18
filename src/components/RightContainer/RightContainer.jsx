import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../App.css';
import SelectDirectory from './SelectDirectory/SelectDirectory';
import SelectColumns from './SelectColumns/SelectColumns';
import ControlPanel from './ControlPanel/ControlPanel';
import ProgressComponent from './ProgressComponent/ProgressComponent';
import VisNetwork from './VisNetwork/VisNetwork'

class Contener extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: props.data, 
      option: props.options, 
      enableVisNetwork: props.enableVisNetwork 
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({data: this.props.data})
    }
    if (this.props.options !== prevProps.options) {
      this.setState({options: this.props.options})
    }
    if(this.props.nodes !== prevProps.nodes && this.props.edges !== prevProps.edges){
      this.setState({nodes: this.props.nodes, edges: this.props.edges})
    }
    if(this.props.enableVisNetwork !== prevProps.enableVisNetwork){
      this.setState({enableVisNetwork: this.props.enableVisNetwork})
    }
  }

  render() {
    return (
      <div className="overflow-auto col-md-10 col-lg-10 d-md-block sidebar collapse vh-100 rightContainerStyle">
        <SelectDirectory/>
        { this.state.data.length !== 0 ? <SelectColumns /> : <ProgressComponent /> }
        { this.props.options !== undefined &&
          this.props.options.firstNumber !== undefined &&
          this.props.options.secondNumber !== undefined && 
          this.props.options.time !== undefined ? <ControlPanel/>: <></> }
        { this.state.enableVisNetwork
        ? <VisNetwork/>
        : <></>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    enableVisNetwork: state.vis.enableVisNetwork,
    data: state.files.data,
    options: state.options
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};


Contener.propTypes = {
  enableVisNetwork: PropTypes.bool,
  data: PropTypes.array,
  options: PropTypes.object
};
Contener.defaultProps = {
  enableVisNetwork: false,
  data: [],
  options: {}
};
const RightContener = connect(mapStateToProps, mapDispatchToProps)(Contener);
export default RightContener;