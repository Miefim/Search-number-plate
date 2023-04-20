import style from './index.module.css'

const InputFileUI = ({accept, onChange, children, className}) => {
   return(
      <>
         <input 
            className={style.input} 
            id='inputFile' 
            type="file" 
            accept={accept} 
            onChange={onChange} 
         />
         <label className={`${style.label} ${className}`} htmlFor="inputFile">
            {children ? children : 'Добавьте файл +'}
         </label>
      </>
   )
}

export default InputFileUI