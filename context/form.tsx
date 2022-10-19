import { useState, createContext, useContext, useRef, useCallback, useEffect } from 'react'

// Hooks
import { useLocalStorage } from '../hooks/useLocalStorage'

export type StoreProps = typeof initialState

export const initialState = {
  email: '',

  password: '',
  passwordConfirm: '',

  firstName: '',
  lastName: '',
  cardNumber: '',
  expirationDate: '',
  cvc: '',

  carModel: '',

  carRegistrationImage: '',
}

function useStoreData(): {
  get: () => StoreProps
  set: (value: Partial<StoreProps>) => void
  subscribe: (callback: () => void) => () => void
  storageValues: StoreProps
} {
  const store = useRef(initialState)
  const [formValues, setFormValues] = useLocalStorage<StoreProps>('form', initialState)

  const get = useCallback(() => store.current, [])

  const subscribers = useRef(new Set<() => void>())

  const set = useCallback((value: Partial<StoreProps>) => {
    store.current = { ...store.current, ...value }
    setFormValues({ ...store.current, ...value })
    subscribers.current.forEach((callback) => callback())
  }, [])

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback)
    return () => subscribers.current.delete(callback)
  }, [])

  return {
    get,
    set,
    subscribe,
    storageValues: formValues,
  }
}

type StoreDataReturnType = ReturnType<typeof useStoreData>

const StoreContext = createContext<StoreDataReturnType | null>(null)

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  return <StoreContext.Provider value={useStoreData()}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('Store not found. Wrap app with FormProvider and then you can use useStore')
  }

  const [state, setState] = useState(store.get())

  useEffect(() => {
    return store.subscribe(() => setState(store.get()))
  }, [])

  return {
    state,
    setStore: store.set,
    storageValues: store.storageValues,
  }
}
