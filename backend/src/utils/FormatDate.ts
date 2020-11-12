import { format } from 'date-fns'

function FormatDate(date: string) {
  const newDate = new Date(date)

  const formated = format(newDate, "dd'/'MM'/'yyyy")

  return formated
}

export default FormatDate