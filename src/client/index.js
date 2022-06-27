import { performAction } from './js/app'
import { setDateLimits } from './js/initDateSelector'
import { postData } from './js/postData'
import {newData} from './js/postData'


import './styles/style.scss'

setDateLimits()

export { performAction };
export { postData }
export {newData}
