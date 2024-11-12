import s from './EditTaskForm.module.css'
import YesIcon from '../../assets/YesIcon.svg'
import { useState } from "react"

const EditTaskForm = ({ setEditFormVisible, taskId, setData, dataArray, description, title,  status}) => {

    const [isNotification, setNotification] = useState(false)

    const changeDescription = (e) => {
        const updatedDescription = dataArray.map(task => {
            if(task.id === taskId) {
                return {...task, description: e.target.value}
            } 
            return task
        })
        setData(updatedDescription)
    }

    const changeTitle = (e) => {
        const updateTitle = dataArray.map(task => {
            if(task.id === taskId && e.target.value !== '') {
                return {...task, title: e.target.value}
            } else {
                setNotification(true)
                setTimeout(() => {
                    setNotification(false)
                }, 4000)
            }
            return task
        })
        setData(updateTitle)
    }


    return (
        <div >
            <div className={s.formBackground}>
                <button className={s.doneButton} onClick={() => setEditFormVisible(false)}>
                    <img className={s.doneIcon} src={YesIcon} />
                </button>
                    <textarea 
                        onChange={changeTitle}
                        className={isNotification ? s.titleNoText : s.titleText}
                        name="newTitle"
                        placeholder='New task title'
                        maxlength="70"
                    >{title}</textarea>
                    {
                        isNotification
                        ? <div className={s.notificationBlock}>
                            this field cannot be empty
                        </div>
                        : null
                    }
                    <textarea 
                        onChange={changeDescription} 
                        id='descriptionText' 
                        className={s.descriptionText}
                        placeholder='Enter description'
                        maxlength="400"
                    >
                        {description}
                    </textarea>
            </div>
            <div onClick={() => setEditFormVisible(false)} className={s.overlay} />
        </div>
    )
}


export default EditTaskForm