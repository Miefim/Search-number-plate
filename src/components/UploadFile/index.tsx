import { useState } from 'react'
import { read } from 'xlsx'

import { useAppDispatch } from '../../redux/store'
import { setFoundNumber, setSearchValue } from '../../redux/slice/searchSlice'
import { setNumbers } from '../../redux/slice/uploadFileSlice'
import InputFileUI from '../../UI/InputFile'

const UploadFile: React.FC = () => {
   
   const dispatch = useAppDispatch()
   const [fileName, setFileName] = useState('Добавьте Exel файл +')

   const selectFileButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null
      setFileName(file ? file.name : fileName)
      
      if(file){
         dispatch(setFoundNumber(null))
         dispatch(setNumbers([]))
         dispatch(setSearchValue(''))

         const reader = new FileReader()
         reader.readAsArrayBuffer(file)
      
         reader.onload = function() {
            const validCellValue: string[] = []
            const invalidCellValue: string[] = []
   
            const workbook = read(reader.result, {type: 'binary'})

            for(let sheet in workbook.Sheets){
               for(let cell in workbook.Sheets[sheet]){
                  if(workbook.Sheets[sheet][cell].hasOwnProperty('v')){

                     const cellValueUpperCase = workbook.Sheets[sheet][cell]['v'].toUpperCase()
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

                  }
               }
            }
   
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

   const translateStringToCyrillic = (latinNumber: string) => {
      let result = ''

      const cyrillicSymbols = ['А', 'В', 'Е', 'К', 'М', 'Н', 'О', 'Р', 'С', 'Т', 'У', 'Х']
      const latinSymbols = ['A', 'B', 'E', 'K', 'M', 'H', 'O', 'P', 'C', 'T', 'Y', 'X']

      for(let i = 0; i < latinNumber.length; i++){
         const isLatin = Boolean(latinNumber[i].match(/[A-Z]/g))
         
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
    
      <InputFileUI accept='.xlsx' onChange={selectFileButtonHandler}>{fileName}</InputFileUI>
    
   )

}

export default UploadFile