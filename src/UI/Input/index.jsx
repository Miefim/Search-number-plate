import style from './index.module.css'

const InputUI = ({type, value, onChange, maxLength, className, placeholder, onKeyDown}) => {
   return(
      <input 
         className={`${style.input} ${className}`} 
         type={type} 
         value={value} 
         onChange={onChange} 
         maxLength={maxLength} 
         placeholder={placeholder} 
         onKeyDown={onKeyDown}
      />
   )
}

export default InputUI