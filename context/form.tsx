import { useState, createContext, useContext, useRef, useCallback, useEffect } from 'react'

type Store = typeof initialState

const initialState = {
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
  get: () => Store
  set: (value: Partial<Store>) => void
  subscribe: (callback: () => void) => () => void
} {
  const store = useRef(initialState)

  const get = useCallback(() => store.current, [])

  const subscribers = useRef(new Set<() => void>())

  const set = useCallback((value: Partial<Store>) => {
    store.current = { ...store.current, ...value }
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
  }
}

type StoreDataReturnType = ReturnType<typeof useStoreData>

const StoreContext = createContext<StoreDataReturnType | null>(null)

function FormProvider({ children }: { children: React.ReactNode }) {
  return <StoreContext.Provider value={useStoreData()}>{children}</StoreContext.Provider>
}

function useStore() {
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
  }
}

export { FormProvider, useStore }
