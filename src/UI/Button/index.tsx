import style from './index.module.css'

type ButtonUIProps = {
   children: string
   onClick: React.MouseEventHandler<HTMLButtonElement>
   disabled?: boolean
   className?: string
}

const ButtonUI: React.FC<ButtonUIProps> = ({ children, onClick, disabled, className }) => {
   return(
      <button 
         onClick={onClick} 
         disabled={disabled}
         className={`${style.button} ${className}`} 
      >
         {children}
      </button>
   )
}

export default ButtonUI