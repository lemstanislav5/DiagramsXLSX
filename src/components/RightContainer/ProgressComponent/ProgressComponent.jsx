import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar'
import {connect} from 'react-redux';

const Progress = (props) => {
  const {progress, loadedFiles} = props;

  return (
    <Row className="d-flex align-items-end flex-row ">
      <Col xs="auto" className="me-sm-6 col-md-6">
        <ProgressBar now={progress} label={`${progress}%`}/>
      </Col>
      <Col xs="auto" className="me-sm-6 col-md-6">
        <span>прочитан {loadedFiles[0]} файл из {loadedFiles[1]}</span>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    progress: state.files.progressFileRead,
    loadedFiles: state.files.loadedFiles
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

Progress.propTypes = {
  progress: PropTypes.number,
  loadedFiles: PropTypes.array
};
Progress.defaultProps = {
  progress: 0,
  loadedFiles: []
};
const ProgressComponent = connect(mapStateToProps, mapDispatchToProps)(Progress);
export default ProgressComponent;