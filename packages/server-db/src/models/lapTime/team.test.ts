import {
  SimpleEstimation,
  type Create,
  type LapTime,
} from '@speed-tracker/common'
import {
  connectDBForTesting,
  disconnectDBForTesting,
  dropCollection,
} from '@utils'

import { lapTimeModel } from '.'

const lapTimeMock: Create<LapTime> = {
  userId: '111',
  trackId: '111',
  trackConfigId: '111',
  time: '1:42:222',
  conditions: {},
}

describe('db lapTime', () => {
  beforeAll(async () => {
    await connectDBForTesting()
  })

  afterAll(async () => {
    await disconnectDBForTesting()
  })

  afterEach(async () => {
    await dropCollection(lapTimeModel.dbModelName)
  })

  it('should create and read lapTime', async () => {
    const returnedData = await lapTimeModel.create(lapTimeMock)
    const readData = await lapTimeModel.read(returnedData?.id)

    expect(readData).not.toBe(null)
    expect(readData).toEqual(returnedData)
  })

  it('should read all lapTime', async () => {
    const newMock: Create<LapTime> = {
      ...lapTimeMock,
      time: '1:42:444',
    }
    const returnedData1 = await lapTimeModel.create(lapTimeMock)
    const returnedData2 = await lapTimeModel.create(newMock)
    const readData = await lapTimeModel.readAll()

    expect(readData).not.toBe(null)
    expect(readData).toEqual([returnedData1, returnedData2])
  })

  it('should delete lapTime', async () => {
    const returnedData = await lapTimeModel.create(lapTimeMock)
    const readData = await lapTimeModel.read(returnedData?.id)

    expect(readData).not.toBe(null)
    expect(returnedData?.id).toEqual(readData?.id)
    await lapTimeModel.delete(readData?.id)

    const readAgainData = await lapTimeModel.read(returnedData?.id)
    expect(readAgainData).toBeNull()
  })

  it('should update lapTime', async () => {
    const returnedData = await lapTimeModel.create(lapTimeMock)
    const id = returnedData?.id
    const readData = await lapTimeModel.read(id)
    const newTime = '1:40:101'

    expect(readData).not.toBe(null)
    expect(readData?.time).toEqual(lapTimeMock.time)

    await lapTimeModel.update(id, { time: newTime })
    const newReadData = await lapTimeModel.read(id)
    expect(newReadData?.time).toEqual(newTime)
  })

  it('should update lapTime conditions', async () => {
    const returnedData = await lapTimeModel.create(lapTimeMock)
    const id = returnedData?.id
    const readData = await lapTimeModel.read(id)
    const conditions: LapTime['conditions'] = {
      trackHumidity: SimpleEstimation.Medium,
    }

    expect(readData).not.toBe(null)
    expect(readData?.conditions).toEqual(lapTimeMock.conditions)

    await lapTimeModel.update(id, { conditions })
    const newReadData = await lapTimeModel.read(id)
    expect(newReadData?.conditions).toEqual(conditions)
  })
})
