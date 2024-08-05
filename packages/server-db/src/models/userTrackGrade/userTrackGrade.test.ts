import { type Create, type UserTrackGrade } from '@speed-tracker/common'
import {
  connectDBForTesting,
  disconnectDBForTesting,
  dropCollection,
} from '@utils'
import { DbModelName } from '@types'

import { userTrackGradeModel } from '.'

const userTrackGradeMock: Create<UserTrackGrade> = {
  userId: '232113',
  trackId: '1',
  grade: 5,
}

describe('db userTrackGrade', () => {
  beforeAll(async () => {
    await connectDBForTesting()
  })

  afterAll(async () => {
    await disconnectDBForTesting()
  })

  afterEach(async () => {
    await dropCollection(DbModelName.UserTrackGrade)
  })

  it('should create and read userTrackGrade', async () => {
    const returnedData = await userTrackGradeModel.create(userTrackGradeMock)
    const readData = await userTrackGradeModel.read(returnedData?.id)

    expect(readData).not.toBe(null)
    expect(readData).toEqual(returnedData)
  })

  it('should delete userTrackGrade', async () => {
    const returnedData = await userTrackGradeModel.create(userTrackGradeMock)
    const readData = await userTrackGradeModel.read(returnedData?.id)

    expect(readData).not.toBe(null)
    expect(returnedData?.id).toEqual(readData?.id)
    await userTrackGradeModel.delete(readData?.id)

    const readAgainData = await userTrackGradeModel.read(returnedData?.id)
    expect(readAgainData).toBeNull()
  })

  it('should update userTrackGrade', async () => {
    const returnedData = await userTrackGradeModel.create(userTrackGradeMock)
    const id = returnedData?.id
    const readData = await userTrackGradeModel.read(id)
    const newGrade = 3

    expect(readData).not.toBe(null)
    expect(readData?.grade).toEqual(userTrackGradeMock.grade)

    await userTrackGradeModel.update(id, { grade: newGrade })
    const newReadData = await userTrackGradeModel.read(id)
    expect(newReadData?.grade).toEqual(newGrade)
  })

  it('should calculate average track rating', async () => {
    await userTrackGradeModel.create({
      ...userTrackGradeMock,
      trackId: '1',
      grade: 5,
    })
    await userTrackGradeModel.create({
      ...userTrackGradeMock,
      trackId: '1',
      grade: 4,
    })
    await userTrackGradeModel.create({
      ...userTrackGradeMock,
      trackId: '2',
      grade: 5,
    })

    const avg = await userTrackGradeModel.getAverageRating('1')
    expect(avg).toBe(4.5)
  })
})
