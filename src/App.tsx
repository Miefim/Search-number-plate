import { useSelector } from 'react-redux'

import { uploadFileSelector } from './redux/slice/uploadFileSlice'
import { searchSelector } from './redux/slice/searchSlice'
import Search from './components/Search'
import UploadFile from './components/UploadFile'
import ListNumbers from './components/ListNumbers'
import './App.css'

const App: React.FC = () => {

  const { numbers } = useSelector(uploadFileSelector)
  const { foundNumber } = useSelector(searchSelector)

  return (
    <div className="App">
      <h1>Поиск гос. номера РФ</h1>
      <UploadFile />
      {numbers.length > 0 && <Search className='App_search'/>}
      {foundNumber && <ListNumbers/>}
    </div>
  )
}

export default App
