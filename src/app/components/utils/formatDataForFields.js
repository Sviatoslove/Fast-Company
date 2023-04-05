const formatDataForFields = (data) => {
  return Object.keys(data).map((optionName) => {
    const res = {
      label: data[optionName].name,
      value: data[optionName]._id
    }
    if (data[optionName].color) res.color = data[optionName].color
    return res
  })
}

export default formatDataForFields
