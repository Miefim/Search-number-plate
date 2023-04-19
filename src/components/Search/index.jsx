import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { setFoundNumber, setSearchValue } from "../../redux/slice/searchSlice"
import InputUI from "../../UI/Input"
import ButtonUI from "../../UI/Button"
import style from './index.module.css'

const Search = ({className}) => {
   const dispatch = useDispatch()
   const searchValue = useSelector(state => state.searchSlice.searchValue)
   const numbers = useSelector(state => state.uploadFileSlice.numbers)

   const [error, setError] = useState(null)

   const regExpValidateNumberPlate = {
      1: /[А, В, Е, К, М, Н, О, Р, С, Т, У, Х]{1}/g,
      2: /[А, В, Е, К, М, Н, О, Р, С, Т, У, Х]{1}[0-9]{1}/g,
      3: /[А, В, Е, К, М, Н, О, Р, С, Т, У, Х]{1}[0-9]{2}/g,
      4: /[А, В, Е, К, М, Н, О, Р, С, Т, У, Х]{1}[0-9]{3}/g,
      5: /[А, В, Е, К, М, Н, О, Р, С, Т, У, Х]{1}[0-9]{3}[А, В, Е, К, М, Н, О, Р, С, Т, У, Х]{1}/g,
      6: /[А, В, Е, К, М, Н, О, Р, С, Т, У, Х]{1}[0-9]{3}[А, В, Е, К, М, Н, О, Р, С, Т, У, Х]{2}/g,
      7: /[А, В, Е, К, М, Н, О, Р, С, Т, У, Х]{1}[0-9]{3}[А, В, Е, К, М, Н, О, Р, С, Т, У, Х]{2}[0-9]{1}/g,
      8: /[А, В, Е, К, М, Н, О, Р, С, Т, У, Х]{1}[0-9]{3}[А, В, Е, К, М, Н, О, Р, С, Т, У, Х]{2}[0-9]{2,3}/g
   }

   const searchButtonHandler = () => { 
      if(searchValue.length >= 3 && !error){
         const searchValueUpperCase = searchValue.toUpperCase()
         const foundNumber = numberFiltering(searchValueUpperCase)

         dispatch(setFoundNumber(foundNumber))
      }
      else if(!error){
         setError('Минимум 3 символа')
      }
   }
   
   const inputKeyDownHandler = (e) => {
      if(e.key === 'Enter'){
         searchButtonHandler()
      }
   }  

   const numberFiltering = searchValue => numbers.filter(number => number.includes(searchValue))

   useEffect(() => {
      setError(null)
      dispatch(setFoundNumber(null))

      const isLatin = searchValue.match(/[A-Z]/g, '')
      const isValidSearchValue = searchValue.match(regExpValidateNumberPlate[searchValue.length], '')

      if(isLatin){
         setError('Используйте только русские буквы')
      }
      else if(!isValidSearchValue){
         setError('Номер не соответствует ГОСТу') 
      }

   },[searchValue])

   return(
      <div className={`${style.wrapper} ${className}`}>
         <InputUI 
            className={`${style.input} ${error && style.input__error}`} 
            type='text' 
            value={searchValue} 
            maxLength={9} 
            onChange={(e) => dispatch(setSearchValue(e.target.value.toUpperCase().trim()))}
            placeholder='А874АХ197'
            onKeyDown={inputKeyDownHandler}
         />
         <ButtonUI className={style.button} onClick={searchButtonHandler} disabled={!searchValue || error}>Найти</ButtonUI>
         {error && <p className={style.errorMessage}>{error}</p>}
      </div>
   )
}

export default Search