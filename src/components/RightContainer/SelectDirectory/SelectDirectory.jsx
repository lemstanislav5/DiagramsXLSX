/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  selectDirThunkCreater,
  getDataFilesThunkCreater,
} from '../../../redux/files_arr_reducer';

const Directory = (props) => {
  const {
    getDataFiles,
    selectDir,
    dir
  } = props;

  const inputFolder = React.useRef(null);

  const selectDirectiri = (event) => {
    const { name, path } = event.target.files[0];
    selectDir(name, path);
    getDataFiles(event.target.files);
  };
  
  const inputFolderClick = () => {
    inputFolder.current.click();
  };
  console.log('SelectDirectory');
  return (
    <div>
      <div className="row bg-dark p-2 text-warning">
        Выберете каталог с файлами xlcx (проводник может не отображать седержащиеся файлы!)
      </div>
      <Form>  
        <Row className="d-flex align-items-end flex-row "> 
          <Col style={{display: "none"}} xs="auto" className="my-1">
            <Form.Control
              ref={inputFolder}
              size="sm"
              type="file"
              multiple
              directory=""
              webkitdirectory=""
              onChange={selectDirectiri}/>
          </Col>
          <Col xs="auto" className="my-1">
            <Button
              size="sm"
              variant="primary"
              onClick={inputFolderClick}>
              Выбрать каталог 
            </Button>
          </Col>
          <Col xs="auto" className="my-1">
            <span style={{border: "none"}}  className="form-control form-control-sm">
              {`каталог: ${dir}`}
            </span>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dir: state.files.dir,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectDir: (name, path) => dispatch(selectDirThunkCreater(name, path)),
    getDataFiles: (dir) => dispatch(getDataFilesThunkCreater(dir)),
  };
};

Directory.propTypes = {
  dir: PropTypes.string,
  selectDir: PropTypes.func,
  getDataFiles: PropTypes.func
};
Directory.defaultProps = {
  dir: '',
  selectDir: () => {},
  getDataFiles: () => {}
};
const SelectDirectory = connect(mapStateToProps, mapDispatchToProps)(Directory);
export default SelectDirectory;