import { type Track, TrackType, type Create } from '@speed-tracker/common'
import {
  connectDBForTesting,
  disconnectDBForTesting,
  dropCollection,
} from '@utils'

import { trackModel } from '.'

const trackMock: Create<Track> = {
  name: 'MIKS',
  rating: {
    value: 5,
    grades: [],
  },
  type: TrackType.Kart,
}

describe('db track', () => {
  beforeAll(async () => {
    await connectDBForTesting()
  })

  afterAll(async () => {
    await disconnectDBForTesting()
  })

  afterEach(async () => {
    await dropCollection(trackModel.dbModelName)
  })

  it('should create and read track', async () => {
    const returnedData = await trackModel.create(trackMock)
    const readData = await trackModel.read(returnedData?.id)

    expect(readData).not.toBe(null)
    expect(readData).toEqual(returnedData)
  })

  it('should read all track', async () => {
    const newMock: Create<Track> = {
      ...trackMock,
      description: 'www',
    }
    const returnedData1 = await trackModel.create(trackMock)
    const returnedData2 = await trackModel.create(newMock)
    const readData = await trackModel.readAll()

    expect(readData).not.toBe(null)
    expect(readData).toEqual([returnedData1, returnedData2])
  })

  it('should delete track', async () => {
    const returnedData = await trackModel.create(trackMock)
    const readData = await trackModel.read(returnedData?.id)

    expect(readData).not.toBe(null)
    expect(returnedData?.id).toEqual(readData?.id)
    await trackModel.delete(readData?.id)

    const readAgainData = await trackModel.read(returnedData?.id)
    expect(readAgainData).toBeNull()
  })

  it('should update track', async () => {
    const returnedData = await trackModel.create(trackMock)
    const id = returnedData?.id
    const readData = await trackModel.read(id)
    const newName = 'f1'

    expect(readData).not.toBe(null)
    expect(readData?.name).toEqual(trackMock.name)

    await trackModel.update(id, { name: newName })
    const newReadData = await trackModel.read(id)
    expect(newReadData?.name).toEqual(newName)
  })
})
