import { type Team, type Create } from '@speed-tracker/common'
import {
  connectDBForTesting,
  disconnectDBForTesting,
  dropCollection,
} from '@/utils'

import { teamModel } from '.'

const teamMock: Create<Team> = {
  name: 'NisMo',
  users: [],
  description: 'nissan motors',
}

describe('db team', () => {
  beforeAll(async () => {
    await connectDBForTesting()
  })

  afterAll(async () => {
    await disconnectDBForTesting()
  })

  afterEach(async () => {
    await dropCollection(teamModel.dbModelName)
  })

  it('should create and read team', async () => {
    const returnedData = await teamModel.create(teamMock)
    const readData = await teamModel.read(returnedData?.id)

    expect(readData).not.toBe(null)
    expect(readData).toEqual(returnedData)
  })

  it('should read all team', async () => {
    const newMock: Create<Team> = {
      ...teamMock,
      description: 'www',
    }
    const returnedData1 = await teamModel.create(teamMock)
    const returnedData2 = await teamModel.create(newMock)
    const readData = await teamModel.readAll()

    expect(readData).not.toBe(null)
    expect(readData).toEqual([returnedData1, returnedData2])
  })

  it('should delete team', async () => {
    const returnedData = await teamModel.create(teamMock)
    const readData = await teamModel.read(returnedData?.id)

    expect(readData).not.toBe(null)
    expect(returnedData?.id).toEqual(readData?.id)
    await teamModel.delete(readData?.id)

    const readAgainData = await teamModel.read(returnedData?.id)
    expect(readAgainData).toBeNull()
  })

  it('should update team', async () => {
    const returnedData = await teamModel.create(teamMock)
    const id = returnedData?.id
    const readData = await teamModel.read(id)
    const newDescription = 'top1'

    expect(readData).not.toBe(null)
    expect(readData?.description).toEqual(teamMock.description)

    await teamModel.update(id, { description: newDescription })
    const newReadData = await teamModel.read(id)
    expect(newReadData?.description).toEqual(newDescription)
  })
})
