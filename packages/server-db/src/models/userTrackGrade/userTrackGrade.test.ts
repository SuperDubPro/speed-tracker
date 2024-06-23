import { type UserTrackGrade } from '@speed-tracker/common'
import {
  connectDBForTesting,
  disconnectDBForTesting,
  dropCollection,
} from '@utils'
import { DbModel } from '@types'

import { userTrackGradeModel } from '.'

const userTrackGradeMock: Omit<UserTrackGrade, 'gradeId'> = {
  userId: '232113',
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
    await dropCollection(DbModel.UserTrackGrade)
  })

  it('should create and read userTrackGrade', async () => {
    const returnedData = await userTrackGradeModel.create(userTrackGradeMock)
    const readData = await userTrackGradeModel.read(returnedData.gradeId)

    expect(readData).not.toBe(null)
    expect(readData?.equals(returnedData)).toBeTruthy()
  })

  it('should delete userTrackGrade', async () => {
    const returnedData = await userTrackGradeModel.create(userTrackGradeMock)
    const readData = await userTrackGradeModel.read(returnedData.gradeId)

    expect(readData).not.toBe(null)
    expect(returnedData.gradeId).toEqual(readData?.gradeId)
    await userTrackGradeModel.delete(readData?.gradeId)

    const readAgainData = await userTrackGradeModel.read(returnedData.gradeId)
    expect(readAgainData).toBeNull()
  })

  it('should update userTrackGrade', async () => {
    const returnedData = await userTrackGradeModel.create(userTrackGradeMock)
    const gradeId = returnedData.gradeId
    const readData = await userTrackGradeModel.read(gradeId)
    const newGrade = 3

    expect(readData).not.toBe(null)
    expect(readData?.grade).toEqual(userTrackGradeMock.grade)

    await userTrackGradeModel.update(gradeId, { grade: newGrade })
    const newReadData = await userTrackGradeModel.read(gradeId)
    expect(newReadData?.grade).toEqual(newGrade)
  })
})
