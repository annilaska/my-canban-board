

const handleDelete = (id, dataArray, setData) => {
    const newDataArray = dataArray.filter(item => item.id !== id)
    setData(newDataArray)
}

export default handleDelete