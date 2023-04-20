import style from './index.module.css'

type InputFileUIProps = {
   onChange: React.ChangeEventHandler<HTMLInputElement>
   accept?: string
   children?: string
   className?: string 
}

const InputFileUI: React.FC<InputFileUIProps> = ({ onChange, accept, children, className }) => {
   return(
      <>
         <input 
            id='inputFile' 
            type="file" 
            onChange={onChange} 
            accept={accept} 
            className={style.input} 
         />
         <label className={`${style.label} ${className}`} htmlFor="inputFile">
            {children ? children : 'Добавьте файл +'}
         </label>
      </>
   )
}

export default InputFileUI