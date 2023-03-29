export const validatorConfig = {
  email: {
    isRequired: {
      messege: 'Поле электронная почта обязательно для заполнения'
    },
    isEmail: {
      messege: 'Email введён не корректно'
    }
  },
  password: {
    isRequired: {
      messege: 'Поле пароль обязательно для заполнения'
    },
    isUpperSymbol: {
      messege: 'Пароль должен содержать хотя бы одну заглавную букву'
    },
    isContainDigit: {
      messege: 'Пароль должен содержать хотя бы одну цифру'
    },
    min: {
      messege: 'Пароль должен состоять минимум из восьми символов',
      value: 8
    }
  }
}

export function validator(data, config) {
  const errors = {}
  const validate = (validateMethod, data, config) => {
    let statusValidate
    switch (validateMethod) {
      case 'isRequired':
        statusValidate = data.trim() === ''
        break
      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/g
        statusValidate = !emailRegExp.test(data)
        break
      }
      case 'isUpperSymbol': {
        const upperRegExp = /[A-Z]+/g
        statusValidate = !upperRegExp.test(data)
        break
      }
      case 'isContainDigit': {
        const digitRegExp = /\d+/g
        statusValidate = !digitRegExp.test(data)
        break
      }
      case 'min': {
        statusValidate = data.length < config.value
        break
      }
      default:
        break
    }
    if (statusValidate) return config.messege
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      )
      if (error && !errors[fieldName]) {
        errors[fieldName] = error
      }
    }
  }
  return errors
}
