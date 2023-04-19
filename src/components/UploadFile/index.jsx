import { useDispatch } from 'react-redux';
import { read } from 'xlsx';

import { setNumbers } from '../../redux/slice/uploadFileSlice'; 

const UploadFile = () => {
   const dispatch = useDispatch()

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
   
            dispatch(setNumbers(validCellValue))
            
            if(invalidCellValue.length > 0){
               alert(`При парсинге документа выявлены значения ячеек не соответствующие образцу регистрационного номера РФ, они не будут участвовать в поиске: ${invalidCellValue}`)
            }
            if(validCellValue.length === 0){
               alert(`В документе нет ни одного значения соответствующего образцу регистрационного номера РФ, прикрепите другой документ`)
            }
         }
      }
   }

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


   return(
      <input type='file' accept='.xlsx' onChange={selectFileButtonHandler}/>
   )
}

export default UploadFile