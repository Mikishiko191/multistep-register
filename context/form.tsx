import { useState, createContext, useContext } from 'react'

interface EmailFormProps {
  email: string
}

interface PasswordsFormProps {
  password: string
  passwordConfirm: string
}

interface FormProps {
  data: any
  setFormValues: (values: any) => void
}

const FormContext = createContext({} as FormProps)

const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<FormProps | null>(null)

  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }))
  }

  return <FormContext.Provider value={{ data, setFormValues }}>{children}</FormContext.Provider>
}

const useFormData = () => {
  const context = useContext(FormContext)

  if (!context) throw new Error('useContext must be used inside useFormData')

  return context
}

export { useFormData, FormProvider, FormContext }
