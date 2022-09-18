/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import Graph from "react-graph-vis";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  actionCreatorNetworkLink,
  actionCreatorIdSelectNode
} from '../../../redux/vis_reducer';
import {
  pointsСreator,
  arrowsСreator
} from '../../../redux/selectors';

class Network extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { counter: 0 };
    this.state = {
      options: {
        locale:"ru", 
        height: "800px",
        nodes: {
          shape: "dot",
          size: 16,
        },
        physics: {
          enabled: this.props.physics,
          forceAtlas2Based: {
            gravitationalConstant: -26,
            centralGravity: 0.005,
            springLength: 230,
            springConstant: 0.18,
          },
          maxVelocity: 146,
          solver: "forceAtlas2Based",
          timestep: 0.35,
          stabilization: { iterations: 1150 },
          barnesHut: {springLength:1300, springConstant: 0.4}
        },
        layout: {
          improvedLayout: true
        }
      },
      key: 'key' + Math.floor(Math.random() * (Math.floor(100) - Math.ceil(1) + 1)) + Math.ceil(1)
    };
  }
  //window.store.getState().vis.networkLink.setOptions()
  shouldComponentUpdate(){
    return false
  }

  render() {
    return (
      <Graph
        key={this.state.key}
        graph={{nodes: this.props.nodes, edges: this.props.edges}}
        options={this.props.options}
        getNetwork={this.props.setNetworkLink}
        events={{
          selectEdge: (event) => {
            // setIdSelectNode(event.nodes[0])
          },
          doubleClick: (event) => {
            // setIdSelectNode(event.nodes[0])
          },
          selectNode: (event) => {
            this.props.setIdSelectNode(event.nodes[0])
          },
        }}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    nodes: pointsСreator(state),
    edges: arrowsСreator(state),
    physics: state.options.physics,
    idSelectNode: state.vis.idSelectNode
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNetworkLink: (network) => dispatch(actionCreatorNetworkLink(network)),
    setIdSelectNode: id =>  dispatch(actionCreatorIdSelectNode(id))
  };
};
Network.propTypes = {
  physics: PropTypes.bool,
  setNetworkLink: PropTypes.func,
  setIdSelectNode: PropTypes.func,
};
Network.defaultProps = {
  physics: false,
  setNetworkLink: () => {},
  setIdSelectNode: () => {}
};
const ControlPanel = connect(mapStateToProps, mapDispatchToProps)(Network);
export default ControlPanel;