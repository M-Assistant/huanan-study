import request from '@/utils/request'

export function getTopic(education, subject) {
  return request({
    url: `/${education}/${subject}.json`,
    method: 'get'
  })
}