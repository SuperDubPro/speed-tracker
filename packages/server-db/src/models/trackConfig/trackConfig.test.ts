import { type Create, type TrackConfig } from '@speed-tracker/common'
import {
  connectDBForTesting,
  disconnectDBForTesting,
  dropCollection,
} from '@utils'

import { trackConfigModel } from '.'

const trackMock: Create<TrackConfig> = {
  imgs: [],
  dateStart: 'dddd',
}

describe('db trackConfig', () => {
  beforeAll(async () => {
    await connectDBForTesting()
  })

  afterAll(async () => {
    await disconnectDBForTesting()
  })

  afterEach(async () => {
    await dropCollection(trackConfigModel.dbModelName)
  })

  it('should create and read trackConfig', async () => {
    const returnedData = await trackConfigModel.create(trackMock)
    const readData = await trackConfigModel.read(returnedData?.id)

    expect(readData).not.toBe(null)
    expect(readData).toEqual(returnedData)
  })

  it('should read all trackConfig', async () => {
    const newMock: Create<TrackConfig> = {
      ...trackMock,
      description: 'www',
    }
    const returnedData1 = await trackConfigModel.create(trackMock)
    const returnedData2 = await trackConfigModel.create(newMock)
    const readData = await trackConfigModel.readAll()

    expect(readData).not.toBe(null)
    expect(readData).toEqual([returnedData1, returnedData2])
  })

  it('should delete trackConfig', async () => {
    const returnedData = await trackConfigModel.create(trackMock)
    const readData = await trackConfigModel.read(returnedData?.id)

    expect(readData).not.toBe(null)
    expect(returnedData?.id).toEqual(readData?.id)
    await trackConfigModel.delete(readData?.id)

    const readAgainData = await trackConfigModel.read(returnedData?.id)
    expect(readAgainData).toBeNull()
  })

  it('should update trackConfig', async () => {
    const returnedData = await trackConfigModel.create(trackMock)
    const id = returnedData?.id
    const readData = await trackConfigModel.read(id)
    const newDateStart = 'yyy'

    expect(readData).not.toBe(null)
    expect(readData?.dateStart).toEqual(trackMock.dateStart)

    await trackConfigModel.update(id, { dateStart: newDateStart })
    const newReadData = await trackConfigModel.read(id)
    expect(newReadData?.dateStart).toEqual(newDateStart)
  })
})
