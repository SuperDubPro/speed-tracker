import { UserRole, type Create, type User } from '@speed-tracker/common'
import {
  connectDBForTesting,
  disconnectDBForTesting,
  dropCollection,
} from '@utils'

import { userModel } from '.'

const userMock: Create<User> = {
  role: UserRole.User,
  nickName: 'nagibator2010',
}

describe('db user', () => {
  beforeAll(async () => {
    await connectDBForTesting()
  })

  afterAll(async () => {
    await disconnectDBForTesting()
  })

  afterEach(async () => {
    await dropCollection(userModel.dbModelName)
  })

  it('should create and read user', async () => {
    const returnedData = await userModel.create(userMock)
    const readData = await userModel.read(returnedData?.id)

    expect(readData).not.toBe(null)
    expect(readData).toEqual(returnedData)
  })

  it('should read all user', async () => {
    const newMock: Create<User> = {
      ...userMock,
      nickName: 'trololo',
    }
    const returnedData1 = await userModel.create(userMock)
    const returnedData2 = await userModel.create(newMock)
    const readData = await userModel.readAll()

    expect(readData).not.toBe(null)
    expect(readData).toEqual([returnedData1, returnedData2])
  })

  it('should delete user', async () => {
    const returnedData = await userModel.create(userMock)
    const readData = await userModel.read(returnedData?.id)

    expect(readData).not.toBe(null)
    expect(returnedData?.id).toEqual(readData?.id)
    await userModel.delete(readData?.id)

    const readAgainData = await userModel.read(returnedData?.id)
    expect(readAgainData).toBeNull()
  })

  it('should update user', async () => {
    const returnedData = await userModel.create(userMock)
    const id = returnedData?.id
    const readData = await userModel.read(id)
    const newNickname = 'top1'

    expect(readData).not.toBe(null)
    expect(readData?.nickName).toEqual(userMock.nickName)

    await userModel.update(id, { nickName: newNickname })
    const newReadData = await userModel.read(id)
    expect(newReadData?.nickName).toEqual(newNickname)
  })
})
