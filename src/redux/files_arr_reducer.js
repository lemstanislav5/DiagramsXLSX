/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */

const XLSX = require('xlsx');

const READING_FILES = 'READING_FILES';
const READING_DIR = 'READING_DIR';
const PROGRESS_FILE_READ = 'PROGRESS_FILE_READ';
const UPLOADED_FILES = 'UPLOADED_FILES';

export const initialState = {
  dir: 'не выбран',
  data: [],
  arrData: [],
  analitycsDataFiles: [],
  progressFileRead: 0,
  loadedFiles: [0, 0]
};

export const actionCreatorDataFiles = (data) => {
  return { type: READING_FILES, data };
};
export const actionCreatorDataDir = (dir) => {
  return { type: READING_DIR, dir };
};
export const actionProgressFileRead = (num) => {
  return { type: PROGRESS_FILE_READ, num };
};

export const actionNumberOfUploadedFiles = (num, files) => {
  return { type: UPLOADED_FILES, num, files};
};


export const filesArrReducer = (state = initialState, action) => {
  switch (action.type) {
    case READING_FILES: {
      return { ...state, data: action.data.reduce((accumulator, currentValue, index, arrey) => {
        if(currentValue.length > 0) {
          accumulator = [...accumulator, currentValue]
        }
        return accumulator;
      }, [])};
    }
    case READING_DIR: {
      return { ...state, dir: action.dir };
    }
    case PROGRESS_FILE_READ: {
      return {
        ...state,
        progressFileRead: action.num,
      };
    }
    case UPLOADED_FILES: {
      return {
        ...state,
        loadedFiles: [state.loadedFiles[0] + action.num, action.files]
      };
    }
    default: {
      return state;
    }
  }
};

export const selectDirThunkCreater = (name, path) => {
  return (dispatch) => {
    const dir = path.replace(name, '');
    dispatch(actionCreatorDataDir(dir));
  };
};

export const getDataFilesThunkCreater = (files) => {

  const readExcel = (file, updateProgressThunk, numberOfUploadedFiles) => {
    return new Promise((resolve, reject) => { 
      const fr   = new FileReader();

      const rABS = !!fr.readAsBinaryString;
      if (rABS) fr.readAsBinaryString(file);
      else fr.readAsArrayBuffer(file);
      fr.onloadstart = updateProgressThunk
      fr.onprogress = updateProgressThunk
      fr.onerror = reject;
      fr.onload  = (e) => {
        /* Parse data */
        const bstr   = e.target.result;
        const wb     = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws     = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data    = XLSX.utils.sheet_to_json(ws, {
          blankRows: false,
          defval: '',
        });
        numberOfUploadedFiles()
        resolve(data);
      };
    });
  };
  
  return (dispatch) => {
    const updateProgressThunk = (evt) => {
      if (evt.lengthComputable) {
        const percentLoaded = Math.round((evt.loaded / evt.total) * 100);
        dispatch(actionProgressFileRead(percentLoaded))
      }
    }
    const numberOfUploadedFiles = () => {
      dispatch(actionNumberOfUploadedFiles(1, files.length));
    }
    const res = Object.values(files)
      .map((file) => {
        if(file.name.indexOf('.xlsx') !== -1) {
          return readExcel(file, updateProgressThunk, numberOfUploadedFiles);
        }
      })
      .filter((item) => item !== undefined);

    Promise.all(res).then(
      (data) => {
        dispatch(actionCreatorDataFiles(data));
      },
      (reason) => {
        throw reason;
      }
    );
  };
};