import s from './Select.module.css'




const Select = ({selectList, dataArray, card, setData, setSelectVisible}) => {

    const handleSelect = (item) => {
        const updateStatus = dataArray.map(task => {
            if (task.title === item.title) {
                return (
                    {...task, status:card}
                )
            }
            return task
        })
        setData(updateStatus)
        setSelectVisible(false)
    }

    return (
        <div>
            {selectList.length ? selectList.map(item => <div className={s.test} key={item.id} onClick = {() => {handleSelect(item)}}>
                {item.title}
            </div>) : <span className={s.allTaskHere}>all tasks here</span>}
        </div>
    )
}

export default Select