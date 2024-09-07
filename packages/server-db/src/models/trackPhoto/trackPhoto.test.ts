import { type TrackPhoto, type Create } from '@speed-tracker/common'
import {
  connectDBForTesting,
  disconnectDBForTesting,
  dropCollection,
} from '@/utils'

import { trackPhotoModel } from '.'

const trackMock: Create<TrackPhoto> = {
  description: 'fff',
}

describe('db trackPhoto', () => {
  beforeAll(async () => {
    await connectDBForTesting()
  })

  afterAll(async () => {
    await disconnectDBForTesting()
  })

  afterEach(async () => {
    await dropCollection(trackPhotoModel.dbModelName)
  })

  it('should create and read trackPhoto', async () => {
    const returnedData = await trackPhotoModel.create(trackMock)
    const readData = await trackPhotoModel.read(returnedData?.id)

    expect(readData).not.toBe(null)
    expect(readData).toEqual(returnedData)
  })

  it('should read all trackPhoto', async () => {
    const newMock: Create<TrackPhoto> = {
      ...trackMock,
      description: 'www',
    }
    const returnedData1 = await trackPhotoModel.create(trackMock)
    const returnedData2 = await trackPhotoModel.create(newMock)
    const readData = await trackPhotoModel.readAll()

    expect(readData).not.toBe(null)
    expect(readData).toEqual([returnedData1, returnedData2])
  })

  it('should delete trackPhoto', async () => {
    const returnedData = await trackPhotoModel.create(trackMock)
    const readData = await trackPhotoModel.read(returnedData?.id)

    expect(readData).not.toBe(null)
    expect(returnedData?.id).toEqual(readData?.id)
    await trackPhotoModel.delete(readData?.id)

    const readAgainData = await trackPhotoModel.read(returnedData?.id)
    expect(readAgainData).toBeNull()
  })

  it('should update trackPhoto', async () => {
    const returnedData = await trackPhotoModel.create(trackMock)
    const id = returnedData?.id
    const readData = await trackPhotoModel.read(id)
    const newDescription = 'yyy'

    expect(readData).not.toBe(null)
    expect(readData?.description).toEqual(trackMock.description)

    await trackPhotoModel.update(id, { description: newDescription })
    const newReadData = await trackPhotoModel.read(id)
    expect(newReadData?.description).toEqual(newDescription)
  })
})
