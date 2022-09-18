/* eslint-disable array-callback-return */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { actionCreatorSetOption } from '../../redux/options_reducer';
import { getPoints, getNetworkLink } from '../../redux/selectors';
import "./LeftContainer.css";
import { actionCreatorIdSelectNode } from '../../redux/vis_reducer';
import '../../App.css';

const LeftNav = (props) => {
  const { setOption, options, points, network, setIdSelectNode } = props;
  const {
    from,
    to,
    physics
  } = options;

  const [arrSelect, setArrSelect] = useState([]);

  const handleChange = (event) => setOption(event.target.name, event.target.value);
  const handleCheck = (event) => setOption(event.target.name, event.target.checked);
  const handleSelect = (event) =>  setOption(event.target.name, parseInt(event.target.value));
  const handleSearch  = (event) =>  {
    let str = event.target.value;
    if(str.length > 6) {
      let res = points.filter(item => {
        if(item["label"].indexOf(str) > -1) return item;
      })
      setArrSelect(res);
    } else{
      setArrSelect([])
    }
  }
  const handleClickEl  = (event) =>  {
    let str = event.target.innerHTML;
    let res = points.find(item => {
      if(item["label"].indexOf(str) > -1) return item;
    })
    network.selectNodes([res["id"]]);
    setIdSelectNode(res["id"]);
  }
  return (
    <div className="col-md-3 col-lg-2 d-md-block bg-dark text-light sidebar collapse vh-100 leftContainerStyle">
      <Form>
        <h5 className="mt-2">Фильтры</h5>
        <Form.Label className="form-text text-muted">Период</Form.Label>
        <Form.Control
          size="sm"
          type="date"
          placeholder="0000-00-00"
          name="from"
          defaultValue={from}
          onChange={handleChange}/>
        <Form.Control
          className="mt-1"
          size="sm"
          type="date"
          placeholder="00-00-0000"
          name="to"
          defaultValue={to}
          onChange={handleChange}/>
        <Form.Label className="form-text text-muted">Число линий узла</Form.Label>
        <Form.Control 
          as="select"
          name="nodeLines"
          onChange={handleSelect}>
          {
            [1, 2, 3, 4, 5, 6].map((item, i) => {
              return <option key={'option_' + item} >{item}</option>
            })
          }
        </Form.Control>
        <Form.Label className="form-text text-muted">Повтор звонков</Form.Label>
        <Form.Control 
          as="select"
          name="searchDepth"
          onChange={handleSelect}>
          {
            [1, 2, 3, 4, 5, 6].map((item, i) => {
              return <option key={'option_' + item} >{item}</option>
            })
          }
        </Form.Control>
        <Form.Label className="form-text text-muted">Длина номера</Form.Label>
        <Form.Control
          className="wh-input"
          size="sm"
          type="text"
          placeholder="11"
          name="numberOfCharacters"
          onChange={handleChange}
        />
        <h5 className="mt-2">Управление</h5>
        <Form.Label className="form-text text-muted">Физика</Form.Label>
        <Form.Check 
          size="sm"
          type="switch"
          name="physics"
          onChange={handleCheck}
          checked={physics}/>
        <Form.Label className="form-text text-muted">Поиск</Form.Label>
        <Form.Control
          className="wh-input"
          size="sm"
          type="text"
          placeholder="1234567890"
          name="search"
          onChange={handleSearch}
        />
        <div className="box-scroll">
          <ul className="wh-input list-group">
            {
              arrSelect.length > 0 
                ?
                  arrSelect.map((item, i) => {
                    return <li 
                      key={i}
                      className="list-group-item list-group-item-action list-group-item-warning py-0"
                      onClick={handleClickEl}
                    >{item["label"]}</li>
                  })
                :
                ""
            }
          </ul>
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    options: state.options,
    points: state.vis.points,
    network: state.vis.networkLink
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOption: (name, value) => dispatch(actionCreatorSetOption(name, value)),
    setIdSelectNode: id =>  dispatch(actionCreatorIdSelectNode(id))
  };
};

LeftNav.propTypes = {
  options: PropTypes.object,
  from: PropTypes.string,
  to: PropTypes.string,
  physics: PropTypes.bool,
  setOption: PropTypes.func,
  points: PropTypes.array,
  network: PropTypes.object,
  setIdSelectNode: PropTypes.func,
};
LeftNav.defaultProps = {
  options: {},
  from: '',
  to: '',
  physics: true,
  setOption: () => {},
  points: [],
  network: {},
  setIdSelectNode: () => {},
};
const LeftContainer = connect(mapStateToProps, mapDispatchToProps)(LeftNav);
export default LeftContainer;