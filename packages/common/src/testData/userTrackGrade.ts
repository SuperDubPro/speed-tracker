import { type Mocks, type UserTrackGrade } from '@/types'

export const userTrackGrade: Mocks<UserTrackGrade> = {
  read: {},
  readAll: {},
  create: {
    data: {
      userId: '232113',
      trackId: '1',
      grade: 5,
    },
    data2: {
      userId: '232113',
      trackId: '2',
      grade: 5,
    },
    dataGrade4: {
      userId: '232113',
      trackId: '1',
      grade: 4,
    },
  },
}
