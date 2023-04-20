import { useSelector } from 'react-redux';

import Search from './components/Search';
import UploadFile from './components/UploadFile';
import ListNumbers from './components/ListNumbers';
import './App.css';

function App() {

  const numbers = useSelector(state => state.uploadFileSlice.numbers)
  
  const foundNumber = useSelector(state => state.searchSlice.foundNumber)


  return (
    <div className="App">
      <h1>Поиск гос. номера РФ</h1>
      <UploadFile />
      {numbers.length > 0 && <Search className='App_search'/>}
      {foundNumber && <ListNumbers/>}
    </div>
  );
}

export default App;
