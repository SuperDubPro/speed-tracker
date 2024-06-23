import request from 'supertest'
import { app } from '../server'
import {
  TrackType,
  type Track,
  type User,
  UserRole,
} from '@speed-tracker/common'

describe('api', () => {
  it('should create track', async () => {
    // Given
    const track: Track = {
      id: 'ewe3245324234234',
      name: 'MIKS',
      type: TrackType.kart,
      configs: [{ img: 'rgdjhgf-hjkg-wqF-WASFDGX-EFDSG' }],
      rating: {
        value: 0,
        grades: [],
      },
    }
    // When
    const response = request(app)
      .post('/tracks')
      .send(track)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    // Then
    await response.expect(200).then((response) => {
      expect(response.body).toEqual(track)
    })
  })

  it('should create user', async () => {
    // Given
    const user: User = {
      id: '232322',
      nickName: 'Stasyao San',
      role: UserRole.user,
    }
    // When
    const response = request(app)
      .post('/users')
      .send(user)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    // Then
    await response.expect(200).then((response) => {
      expect(response.body).toEqual(user)
    })
  })
})
