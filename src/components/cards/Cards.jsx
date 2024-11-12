import CARDS from "../../config"
import Select from "../select/Select"
import { useState } from "react"
import s from './Cards.module.css'
import NewTaskForm from "../newTaskForm/NewTaskForm"
import uniqid from 'uniqid'
import { Link } from "react-router-dom"
import TrashIcon from '../../assets/TrashIcon.svg'
import EditIcon from '../../assets/EditIcon.svg'
import handleDelete from '../../deleteFunction'
import EditTaskForm from "../editTaskForm/EditTaskForm"



const Cards = ({card, dataArray, setData}) => {

    const [isSelectVisible, setSelectVisible] = useState(false)
    const [isEditFormVisible, setEditFormVisible] = useState(false)
    const [isTaskId, setTaskId] = useState(null)
    const [isTaskDescription, setTaskDescription] = useState(null)
    const [isTaskTitle, setTaskTitle] = useState(null)
    const [isTaskStatus, setTaskStatus] = useState(null)


    const backlogTasks = dataArray.filter(task => task.status === CARDS.Backlog)
    const inProgressTasks = dataArray.filter(task => task.status === CARDS.In_Progress)
    const finishedTasks = dataArray.filter(task => task.status === CARDS.Finished)


    const backlogList = [...inProgressTasks, ...finishedTasks]
    const inProgressList = [...backlogTasks, ...finishedTasks]
    const finishedList = [...backlogTasks, ...inProgressTasks]

    const listTasks = dataArray.filter(task => task.status === card)

    const handleClickSelect = () => {
        setSelectVisible(!isSelectVisible)
    }

    const handleClick = () => {
        setFormVisible(!isFormVisible)
    }

    const [isFormVisible, setFormVisible] = useState(false)

    const addNewTask = (title, description) => {
        const task = {
            id: uniqid(),
            title:title,
            description: description,
            status: CARDS.Backlog
        }
        setData([...dataArray, task])
    }

    const newTaskForm = (title, description) => {
        addNewTask(title, description)
        setFormVisible(false)
    }


    const handleEdit = (toggle, id, description, title, status) => {
        setEditFormVisible(toggle)
        setTaskId(id)
        setTaskDescription(description)
        setTaskTitle(title)
        setTaskStatus(status)
    }
  

    return (
        <div className={s.card}>
            {listTasks.length ? <div className={s.counter}>{listTasks.length}</div> : <></>}
            {listTasks.length ? listTasks.map(task => 
            <div key={task.id} className={s.titlesWrapper}>
                <Link className={s.titleLink} to={`/cardDetail/${task.id}`}>
                    <div className={s.titles}>{task.title}</div>
                </Link>
                <div className={s.titlesBlockButton}>
                    <button className={s.editButton} onClick={() => handleEdit(true, task.id, task.description, task.title, task.status)}><img className={s.icon} src={EditIcon} /></button>
                    <button className={s.trashButton} onClick={() => handleDelete(task.id, dataArray, setData)}><img alt="" className={s.icon} src={TrashIcon} /></button>    
                </div>
            </div>) 
                : <p className={s.mockNoTask}>No tasks added yet</p>
            }
            {card === CARDS.Backlog 
            ? <div className={s.buttonsBlock}>
                <button className={s.newTaskButton} onClick={handleClick}>new task</button>
                <button className={s.addButton} onClick={handleClickSelect}>add task</button>
            </div>
            : <button className={s.addButton} onClick={handleClickSelect}>add task</button>
            }

            {isFormVisible === true && <NewTaskForm setFormVisible={setFormVisible} newTaskForm={newTaskForm} />}
            {card === CARDS.Backlog && isSelectVisible === true && <Select selectList={backlogList} dataArray={dataArray} card={card} setData={setData} setSelectVisible={setSelectVisible} />}
            {card === CARDS.In_Progress && isSelectVisible === true && <Select selectList={inProgressList} dataArray={dataArray} card={card} setData={setData} setSelectVisible={setSelectVisible} />}
            {card=== CARDS.Finished && isSelectVisible === true && <Select selectList={finishedList} dataArray={dataArray} card={card} setData={setData} setSelectVisible={setSelectVisible} />}
            {isEditFormVisible && <EditTaskForm 
            setEditFormVisible={setEditFormVisible} 
            taskId={isTaskId} 
            setData={setData} 
            dataArray={dataArray} 
            description={isTaskDescription}
            title={isTaskTitle}
            status={isTaskStatus}
            />}
        </div>
    )
}


export default Cards