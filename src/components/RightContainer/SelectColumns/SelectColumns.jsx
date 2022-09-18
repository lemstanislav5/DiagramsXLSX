import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { actionCreatorSetOption } from '../../../redux/options_reducer';

const Columns = (props) => {
  const { data, select } = props;
  const [state] = useState({
    columns:[
      ['Номер А', 'firstNumber'], 
      ['Номер В', 'secondNumber'], 
      ['Время', 'time']]
  })
  console.log('Columns')
  const handleChange = (event) => select(event.target.name, event.target.value);
  
  return( 
    <Form>
      <Row className="d-flex align-items-end flex-row "> 
        {
          state.columns.map((el, i)=>{
            return (
              <Col key={'col_' + i} xs="auto" className="col-md-3">
                <Form.Label className="form-text text-primary"> { state.columns[i][0] } </Form.Label>
                <Form.Control as="select" name={ state.columns[i][1] } onChange={handleChange}>
                  <option key="#" ></option>
                  { 
                    Object.keys(data[0][0]).map(
                      (item, i) => <option key={i} value={item}>{item}</option>
                    )
                  }
                </Form.Control>
              </Col>
            )
          })
        }
      </Row> 
    </Form>
  )
}
const mapStateToProps = (state) => {
  return {
    data: state.files.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    select: (name, value) => dispatch(actionCreatorSetOption(name, value))
  };
};

Columns.propTypes = {
  data: PropTypes.array,
  select: PropTypes.func
};
Columns.defaultProps = {
  data: [],
  select: () => {}
};
const SelectColumns = connect(mapStateToProps, mapDispatchToProps)(Columns);
export default SelectColumns;