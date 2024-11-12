import { Link, useParams, useNavigate } from 'react-router-dom'
import s from './CardDetail.module.css'
import { useState } from "react"
import handleDelete from '../../deleteFunction'
import CloseIcon from '../../assets/CloseIcon.svg'
import YesIcon from '../../assets/YesIcon.svg'


const CardDetail = ({dataArray, setData}) => {
    let params = useParams()
    const {taskId} = params
    const navigate = useNavigate();

    const task = dataArray.find(item => item.id === taskId)

    const [isEditFormVisible, setEditFormVisible] = useState(false)
    const [isHalper, setHalper] = useState(false)
    const [isNotification, setNotification] = useState(false)

    const handleEdit = () => {
        setEditFormVisible(true)
        setTimeout(() => {
            setHalper(true)
        }, 4000)
        setHalper(false)
    }

    const deleteAndClose = (id, dataArray, setData) => {
        handleDelete(id, dataArray, setData)
        navigate('/')
    }



    const editDescription = (e) => {
        const updatedDescription = dataArray.map(task => {
            if(task.id === taskId) {
                return {...task, description: e.target.value}
            } 
            return task
        })
        setData(updatedDescription)
    }

    const editTitle = (e) => {
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
        <div className={s.detailSection}>
            {task 
            ? <div className={s.card}>{
                isEditFormVisible 
                ? <div className={s.cardText}>
                    
                    <button onClick={() => setEditFormVisible(false)} className={s.doneButton}><img className={s.doneIcon} src={YesIcon} /></button>
                    <textarea maxLength='70' onChange={editTitle} className={s.textTitle}>{task.title}</textarea>
                    {
                        isNotification
                        ? <div className={s.notificationBlock}>
                            this field cannot be empty
                        </div>
                        : null
                    }
                    <textarea maxLength='400' onChange={editDescription} className={s.description}>{task.description || 'This task has no description'}</textarea>
                    {
                        !isHalper ? <div className={s.halper}>Now you can change title or description</div> : null
                    }
                    
                </div>
                : <div className={s.cardText}>

                    <Link className={s.closeLink} to={'/'}>
                        <button className={s.closeButton}><img className={s.closeIcon} src={CloseIcon} /></button>
                    </Link>
                    <h2 className={s.textTitle}>{task.title}</h2>
                    <p className={s.description}>{task.description || 'This task has no description'}</p>
                    <div>
                        <button className={s.editButton} onClick={handleEdit}>Edit</button>
                        <button className={s.deleteButton} onClick={() => deleteAndClose(task.id, dataArray,setData)}>Delete</button>
                    </div>

                </div>
            }</div>
             
            : <h2 className={s.taskNotFound}>Task wiht ID  <em>{taskId}</em> not found</h2>}

        </div>
    )
}

export default CardDetail