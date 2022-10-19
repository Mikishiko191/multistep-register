import * as Yup from 'yup'
import valid from 'card-validator'

export const bankDetailsSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  cardNumber: Yup.string()
    .required('Credit card number field required')
    .test(
      'test-number', // this is used internally by yup
      'Credit Card number is invalid', //validation message
      (value) => valid.number(value).isValid
    ),
  expirationDate: Yup.string()
    .required('Expiration date field required')
    .test(
      'test-credit-card-expiration-date',
      `Invalid Expiration Date: Please make sure you add "/" sign after month and valid year`,
      (expirationDate) => {
        if (!expirationDate) {
          return false
        }

        if (!expirationDate.includes('/')) {
          return false
        }

        const today = new Date()
        const monthToday = today.getMonth() + 1
        const yearToday = today.getFullYear().toString().substr(-2)

        const [expMonth, expYear] = expirationDate.split('/')

        if (Number(expYear) < Number(yearToday)) {
          return false
        } else if (Number(expMonth) < monthToday && Number(expYear) <= Number(yearToday)) {
          return false
        }

        return true
      }
    ),
  cvc: Yup.string()
    .required('CVC field required')
    .test('test-number', 'Credit Card Verification number is invalid', (value) => valid.cvv(value).isValid),
})
