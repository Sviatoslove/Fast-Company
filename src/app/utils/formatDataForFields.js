const formatDataForFields = (data) => {
  return Object.keys(data).map((optionName) => ({
    label: data[optionName].name,
    value: data[optionName]._id
  }))
}

export default formatDataForFields
