import style from './index.module.css'

type InputUIProps = {
   type: string
   value: string
   placeholder: string
   onChange: React.ChangeEventHandler<HTMLInputElement>
   onKeyDown: React.KeyboardEventHandler<HTMLInputElement>
   maxLength?: number
   className?: string
}

const InputUI: React.FC<InputUIProps> = ({ type, value, placeholder, onChange, onKeyDown, maxLength, className }) => {
   return(
      <input 
         type={type} 
         value={value} 
         placeholder={placeholder} 
         onChange={onChange} 
         onKeyDown={onKeyDown}
         maxLength={maxLength} 
         className={`${style.input} ${className}`} 
      />
   )
}

export default InputUI