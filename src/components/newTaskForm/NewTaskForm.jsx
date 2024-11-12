import { useState } from 'react';
import s from './NewTaskForm.module.css'
import YesIcon from '../../assets/YesIcon.svg'

const NewTaskForm = ({setFormVisible, newTaskForm}) => {

    const [isNotification, setNotification] = useState(false)
   
    const [values, setValues] = useState({
        title: '',
        description: '',
    })

    const handleChange = e => {
        const fildName = e.target.name
        setValues({ ...values, [fildName]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (values.title) {
            newTaskForm(values.title, values.description)
        } else if (!values.title && values.description) {
            setNotification(true)
            setTimeout(() => {
                setNotification(false)
            }, 4000)
        } else {
            setFormVisible(false)
        }
    }

    return (
        <>
        <div>
            <form  className={s.formBlock} onSubmit={handleSubmit}>
                
                <button className={s.submitButton} name='Submit'>
                    <img className={s.icon} src={YesIcon} />
                </button>
                <input
                    placeholder='New task title'
                    name="title"
                    onChange={handleChange}
                    value={values.title}
                    className={isNotification
                        ? s.titleInputEmpty
                        : s.titleInput}
                    maxlength="70"
                />
                {
                    isNotification
                    ? <div className={s.notificationBlock}>
                       this field cannot be empty
                    </div>
                    : null
                }
                <textarea
                    placeholder='Enter description'
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    className={s.descriptionInput}
                    maxlength="400"
                />
                
            </form>
        </div>
        <div onClick={() => setFormVisible(false)} className={s.overlay} />
        </>
    )
}

export default NewTaskForm