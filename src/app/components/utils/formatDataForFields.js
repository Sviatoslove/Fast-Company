const formatDataForFields = (data) => {
  let res
  return Object.keys(data).map((optionName) => {
    Object.keys(data[optionName]).forEach((key) => {
      res = {
        label: data[optionName].name,
        value: data[optionName]._id
      }
      key !== 'name' && key !== '_id' && (res[key] = data[optionName][key])
    })
    return res
  })
}

export default formatDataForFields
