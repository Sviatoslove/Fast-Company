export const validatorConfig = {
  email: {
    isRequired: {
      messege: 'Поле электронная почта обязательно для заполнения'
    },
    isEmail: {
      messege: 'Email введён не корректно'
    }
  },
  name: {
    isRequired: {
      messege: 'Поле имя обязательно для заполнения'
    },
    min: {
      messege:
        'Имя введено не корректно, его длина должна быть более одного символа',
      value: 2
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
  },
  profession: {
    isRequired: {
      messege: 'Обязательно выберите вашу профессию'
    }
  },
  qualities: {
    isRequired: {
      messege: 'Обязательно выберите присущие вам качества'
    }
  },
  license: {
    isRequired: {
      messege:
        'Вы не можете пользоваться нашим сервисом не подтвердив лицензионное соглашение'
    }
  },
  content: {
    isRequired: {
      messege: 'Поле сообщение обязательно для заполнения'
    }
  }
}

export default function validator(data, config) {
  const errors = {}
  const validate = (validateMethod, data, config) => {
    let statusValidate
    switch (validateMethod) {
      case 'isRequired': {
        if (typeof data === 'boolean') statusValidate = !data
        else if (Array.isArray(data)) statusValidate = data.length === 0
        else statusValidate = data.trim() === ''
        break
      }
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
