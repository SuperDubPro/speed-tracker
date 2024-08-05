import { type Create, type TrackConfig } from '@speed-tracker/common'
import {
  connectDBForTesting,
  disconnectDBForTesting,
  dropCollection,
} from '@utils'
import { DbModelName } from '@types'

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
    await dropCollection(DbModelName.TrackConfig)
  })

  it('should create and read trackConfig', async () => {
    const returnedData = await trackConfigModel.create(trackMock)
    const readData = await trackConfigModel.read(returnedData?.id)

    expect(readData).not.toBe(null)
    expect(readData).toEqual(returnedData)
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
