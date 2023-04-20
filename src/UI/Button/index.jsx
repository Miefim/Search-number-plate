import style from './index.module.css'

const ButtonUI = ({children, className, onClick, disabled}) => {
   return(
      <button 
         className={`${style.button} ${className}`} 
         onClick={onClick} 
         disabled={disabled}
      >
         {children}
      </button>
   )
}

export default ButtonUI