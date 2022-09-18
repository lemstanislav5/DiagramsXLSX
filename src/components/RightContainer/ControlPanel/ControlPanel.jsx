/* eslint-disable react/jsx-no-duplicate-props */
//! ЗАМЕНИТЬ ПРОПСЫ НА ИСПОЛЬЗОВАНИЕ СЕЛЕКТОРОВ И ОДИН ПРОПС ENABLE, подумать о преимуществах в виде - кода

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import s from './ControlPanel.module.css';
import {
  pointsСreator,
  arrowsСreator
} from '../../../redux/selectors';

import { saveImg } from '../../../utilities/utilities';
import VisNetwork from '../VisNetwork/VisNetwork';
import {
  actionCreatorNetworkLink,
  actionCreatorIdSelectNode,
  actionEnableVisNetwork
} from '../../../redux/vis_reducer';

const Control = (props) => {
  const { 
    idSelectNode,
    setPoints,
    setArrows,
    setEnableVisNetwork
  } = props;
  console.log('Control')
  const [state, setState] = useState({
    isVisNetwork: false,
    graphKey: 'key_' + Math.random(1,999)
  });

  const buildDiagram = () => {
    console.log('buildDiagram')
  };
  const deletePoint = () => {
    console.log('deletePoint')
  };
  const resetData = () => {
    window.location.reload();
  };
  const changeNewLablePoint = () => {
    console.log('changeNewLablePoint')
  };
  const addNewPoint = () => {
    console.log('addNewPoint')
  };
  const addNewArrows = () => {
    console.log('addNewArrows')
  };
  // const disabled = () => ((points.length > 0 && arrows.length > 0)? false: true);
  if(idSelectNode === undefined) return (<></>)
  return (
    <Form>
      <div className={s.wrap}>
        <div className={s.bblock}>
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              setEnableVisNetwork(true)
            }}
            disabled={false}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bezier" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"/>
              <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z"/>
            </svg>
          </Button>
        </div>
        <div className={s.bblock}>
          <Button
            size="sm"
            variant="dark"
            onClick={resetData}
            disabled={true}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eraser" viewBox="0 0 16 16">
            <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
          </svg>
          </Button>
        </div>
        <div className={s.bblock}>
          <Button
            size="sm"
            variant="danger"
            onClick={deletePoint}
            disabled={true}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </Button>
        </div>
        <div className={s.bblock}>
          <Form.Control
            className="wh-input"
            size="sm"
            type="text"
            placeholder="79150001122"
            value={state.newLable}
            name="newPoint"
            onChange={changeNewLablePoint}
            disabled={true}/>
        </div>
        <div className={s.bblock}>
          <Button
            size="sm"
            variant="secondary"
            onClick={addNewPoint}
            disabled={true}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
          </Button>
        </div>
        <div className={s.bblock}>
          <span className="form-control form-control-sm">
            {`
              от : ${idSelectNode[0] === undefined? "---" : idSelectNode[0]}
              к  : ${idSelectNode[1] === undefined? "---" : idSelectNode[1]}  
            `}
          </span>
        </div> 
        <div className={s.bblock}>
          <Button
            size="sm"
            variant="secondary"
            onClick={addNewArrows}
            disabled={true}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
            </svg>
          </Button>
        </div> 
        <div className={s.bblock}>
        <Button
          size="sm"
          variant="success"
          disabled={true}
          onClick={saveImg}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-save" viewBox="0 0 16 16">
            <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
          </svg>
        </Button>
      </div>
      </div>
    </Form>
  );
};
const mapStateToProps = (state) => {
  return {
    pointsSelector: pointsСreator(state),
    arrowsSelector: arrowsСreator(state),
    physics: state.options.physics,
    idSelectNode: state.vis.idSelectNode
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNetworkLink: (network) => dispatch(actionCreatorNetworkLink(network)),
    setIdSelectNode: id =>  dispatch(actionCreatorIdSelectNode(id)),
    setEnableVisNetwork: (bool) => dispatch(actionEnableVisNetwork(bool))
  };
};

Control.propTypes = {
  setEnableVisNetwork: PropTypes.func,
  physics: PropTypes.bool,
  setNetworkLink: PropTypes.func,
  setIdSelectNode: PropTypes.func,
  setPoints: PropTypes.func,
  setArrows: PropTypes.func
};
Control.defaultProps = {
  setEnableVisNetwork: () => {},
  physics: false,
  setNetworkLink: () => {},
  setIdSelectNode: () => {},
  setPoints: () => {},
  setArrows: () => {}
};
const ControlPanel = connect(mapStateToProps, mapDispatchToProps)(Control);
export default ControlPanel;