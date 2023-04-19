import { useSelector } from 'react-redux'
import style from './index.module.css'

const ListNumbers = () => {
   const foundNumber = useSelector(state => state.searchSlice.foundNumber)
   return(
      <div className={style.listBlock}>
         {foundNumber?.length > 0 && <h2 className={style.listBlock_foundMessage}>Номер найден ({foundNumber?.length} шт)</h2>}
         {foundNumber?.length === 0 && <h2 className={style.listBlock_notFoundMessage}>Номер не найден</h2>}
         {foundNumber?.length > 0 && <div className={style.listBlock_list}>
            <div>  
               {
                  foundNumber.map((foundNumber, index) => <div className={style.list_numberCard} key={index}>{foundNumber}</div>)
               }
            </div>
         </div>}
      </div>
   )
}

export default ListNumbers