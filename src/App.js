import { read } from 'xlsx';
import './App.css';
import { useState } from 'react';


function App() {

  const [numbers, setNumbers] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isFound, setIsFound] = useState(false)

  const selectFileButtonHandler = (e) => {
    const file = e.target.files[0]
    
    if(file){
      const reader = new FileReader(file)
      reader.readAsArrayBuffer(file);
  
      reader.onload = function() {
        const validCellValue = []
        const invalidCellValue = []

        const workbook = read(reader.result, {type: 'binary'});

        workbook.Strings.forEach(el => {
          const cellValueUpperCase = el.t.toUpperCase()
          const regexNumber = /[A, B, E, K, M, H, O, P, C, T, Y, XА, В, Е, К, М, Н, О, Р, С, Т, У, Х]{1}[0-9]{3}[A, B, E, K, M, H, O, P, C, T, Y, XА, В, Е, К, М, Н, О, Р, С, Т, У, Х]{2}[0-9]{2,3}/g
          const isValidCellValue = Boolean(cellValueUpperCase.match(regexNumber, ''))
          const isCyrillic = Boolean(cellValueUpperCase.match(/[А-Я]{1}[0-9]{3}[А-Я]{2}[0-9]{2,3}/g, ''))

          if(isValidCellValue){
            if(isCyrillic){
              validCellValue.push(cellValueUpperCase)
            }
            else{
              const translatedString = translateStringToCyrillic(cellValueUpperCase)
              validCellValue.push(translatedString)
            }
          }
          else{
            invalidCellValue.push(cellValueUpperCase)
          }
        })

        setNumbers(validCellValue)
        
        if(invalidCellValue.length > 0){
          alert(`При парсинге документа выявлены значения ячеек не соответствующие образцу гос номера РФ, они не будут участвовать в поиске: ${invalidCellValue}`)
        }
      };
    }

  }

  const searchButtonHandler = () => {
    
    if(searchValue.length >= 3) {
      const searchValueUpperCase = searchValue.toUpperCase()
      const foundNumber = numberFiltering(searchValueUpperCase)
  
      if(foundNumber.length > 0) {
        setIsFound(true)
      }
      else{
        setIsFound(false)
      }
      
    }

  }

  const numberFiltering = searchValue => numbers.filter(number => number.includes(searchValue))



  const translateStringToCyrillic = (latinNumber) => {
    let result = ''

    const cyrillicSymbols = ['А', 'В', 'Е', 'К', 'М', 'Н', 'О', 'Р', 'С', 'Т', 'У', 'Х']
    const latinSymbols = ['A', 'B', 'E', 'K', 'M', 'H', 'O', 'P', 'C', 'T', 'Y', 'X']

    
    for(let i = 0; i < latinNumber.length; i++){
      const isLatin = Boolean(latinNumber[i].match(/[A-Z]/g, ''))
      
      if(isLatin){
        latinSymbols.forEach((latinSymbol, index) => {
          if(latinSymbol === latinNumber[i]){
            result += cyrillicSymbols[index]
          }
        })
      }
      else{
        result += latinNumber[i]
      }
    }
    return result
  }

  return (
    <div className="App">
      <input type='file' onChange={selectFileButtonHandler}/>
      {numbers.length > 0 && <input type='text' value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>}
      <h1>{isFound ? 'Номер найден' : 'Номер не найден'}</h1>
      <button onClick={searchButtonHandler}>Найти</button>
    </div>
  );
}

export default App;
